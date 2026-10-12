"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDeletion = exports.sendDeletionRequest = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const auth_1 = require("firebase-admin/auth");
const storage_1 = require("firebase-admin/storage");
const nodemailer = __importStar(require("nodemailer"));
const crypto = __importStar(require("crypto"));
try {
    (0, app_1.initializeApp)();
}
catch (e) {
}
const db = (0, firestore_1.getFirestore)();
const auth = (0, auth_1.getAuth)();
const storage = (0, storage_1.getStorage)();
async function cleanupUserData(userId) {
    const batch = db.batch();
    const userRef = db.collection('users').doc(userId);
    batch.update(userRef, {
        deletedAt: firestore_1.FieldValue.serverTimestamp(),
        isActive: false,
        hasProfile: false,
        email: `deleted_${userId}@kiraliksevgili.net`,
        phoneNumber: null,
        fcmToken: null
    });
    const collectionsToClean = ['notifications', 'push_notifications', 'message_requests'];
    for (const col of collectionsToClean) {
        const snapshots = await db.collection(col).where('recipientId', '==', userId).get();
        snapshots.docs.forEach(doc => batch.delete(doc.ref));
        const senderSnapshots = await db.collection(col).where('senderId', '==', userId).get();
        senderSnapshots.docs.forEach(doc => batch.delete(doc.ref));
    }
    const postsSnap = await db.collection('community_posts').where('userId', '==', userId).get();
    postsSnap.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    const bucket = storage.bucket();
    const folders = [`user_photos/${userId}`, `user_voices/${userId}`, `verifications/${userId}`];
    for (const folder of folders) {
        try {
            await bucket.deleteFiles({ prefix: folder });
        }
        catch (e) {
            logger.error(`Storage cleanup failed for ${folder}:`, e);
        }
    }
    try {
        await auth.deleteUser(userId);
    }
    catch (e) {
        logger.warn(`Auth user not found: ${userId}`);
    }
}
exports.sendDeletionRequest = (0, https_1.onRequest)({
    secrets: ['SMTP_USER', 'SMTP_PASS'],
    cors: true,
    region: 'us-central1',
    maxInstances: 10
}, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    try {
        const { email, username } = req.body;
        logger.info(`V6: Received deletion request for email: ${email}, username: ${username}`);
        if (!email || !username) {
            res.status(400).json({ error: 'E-posta ve kullanıcı adı gereklidir.' });
            return;
        }
        const userSnap = await db.collection('users').where('email', '==', email).limit(1).get();
        if (userSnap.empty) {
            logger.info(`V6: User not found with email: ${email}. Returning generic success.`);
            res.json({ success: true, message: 'İşlem başlatıldı. E-posta adresinizi kontrol edin.' });
            return;
        }
        const userId = userSnap.docs[0].id;
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = firestore_1.Timestamp.fromDate(new Date(Date.now() + 2 * 60 * 60 * 1000));
        await db.collection('account_deletion_requests').doc(token).set({
            userId,
            email,
            createdAt: firestore_1.FieldValue.serverTimestamp(),
            expiresAt,
            status: 'pending'
        });
        const smtpUser = process.env.SMTP_USER?.trim();
        const smtpPass = process.env.SMTP_PASS?.trim();
        if (!smtpUser || !smtpPass) {
            logger.error('V6: SMTP credentials are missing in environment/secrets.');
            res.status(500).json({ error: 'E-posta servisi yapılandırılmamış.' });
            return;
        }
        logger.info(`V6: Attempting SMTP send to: ${email}`);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const verifyUrl = `https://kiraliksevgili.net/hesap-silme/verify/?token=${token}`;
        const mailOptions = {
            from: `"Kiralık Sevgili" <${smtpUser}>`,
            to: email,
            subject: 'Hesap Silme Onayı',
            html: `
          <div style="font-family:sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #eee;border-radius:10px;">
            <h2 style="color:#d4af37;text-align:center;">Hesap Silme Onayı</h2>
            <p>Merhaba <strong>${username}</strong>,</p>
            <p>Hesabınızı silmek için bir talep aldık. Bu işlemi onaylıyorsanız aşağıdaki butona tıklayın:</p>
            <div style="text-align:center;margin:30px 0;">
              <a href="${verifyUrl}" style="background:#d4af37;color:white;padding:12px 25px;text-decoration:none;border-radius:5px;font-weight:bold;display:inline-block;">Hesabımı Kalıcı Olarak Sil</a>
            </div>
            <p style="color:#666;font-size:12px;">Bu bağlantı 2 saat boyunca geçerlidir. Eğer bu talebi siz yapmadıysanız bu e-postayı dikkate almayın.</p>
            <hr style="border:0;border-top:1px solid #eee;margin:20px 0;">
            <p style="text-align:center;color:#999;font-size:10px;">Kiralık Sevgili Güvenlik Ekibi</p>
          </div>
        `
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            logger.info('V6: SMTP Send Result:', {
                messageId: info.messageId,
                response: info.response
            });
            res.json({
                success: true,
                message: 'E-posta gönderildi. Lütfen gelen kutunuzu kontrol edin.',
            });
        }
        catch (mailError) {
            logger.error('V6: SMTP Transport Error:', mailError);
            res.status(500).json({ error: 'E-posta gönderilirken teknik bir hata oluştu.' });
        }
    }
    catch (error) {
        logger.error('V6: Global error in sendDeletionRequest:', error);
        res.status(500).json({ error: 'Sunucu hatası oluştu.' });
    }
});
exports.verifyDeletion = (0, https_1.onRequest)({
    cors: true,
    region: 'us-central1',
    maxInstances: 10
}, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    try {
        const { token } = req.body;
        logger.info(`V6: Verifying deletion for token: ${token}`);
        if (!token) {
            res.status(400).json({ error: 'Token gereklidir.' });
            return;
        }
        const requestRef = db.collection('account_deletion_requests').doc(token);
        const requestDoc = await requestRef.get();
        if (!requestDoc.exists) {
            logger.warn(`V6: Deletion request not found for token: ${token}`);
            res.status(404).json({ error: 'Geçersiz veya kullanılmış bağlantı.' });
            return;
        }
        const data = requestDoc.data();
        if (data.status !== 'pending') {
            res.status(400).json({ error: 'Bu bağlantı zaten kullanılmış.' });
            return;
        }
        if (data.expiresAt.toDate() < new Date()) {
            res.status(400).json({ error: 'Bağlantı süresi dolmuş. Lütfen yeni bir talep oluşturun.' });
            return;
        }
        logger.info(`V6: Starting cleanup for user: ${data.userId}`);
        await cleanupUserData(data.userId);
        await requestRef.update({
            status: 'completed',
            completedAt: firestore_1.FieldValue.serverTimestamp()
        });
        logger.info(`V6: Successfully deleted user: ${data.userId}`);
        res.json({ success: true, message: 'Hesabınız ve tüm verileriniz kalıcı olarak silindi.' });
    }
    catch (error) {
        logger.error('V6: Verification error:', error);
        res.status(500).json({ error: 'İşlem sırasında bir hata oluştu.' });
    }
});
//# sourceMappingURL=index.js.map