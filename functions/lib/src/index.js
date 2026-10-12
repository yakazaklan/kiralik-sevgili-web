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
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const nodemailer = __importStar(require("nodemailer"));
const crypto = __importStar(require("crypto"));
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
async function cleanupUserData(userId) {
    const batch = db.batch();
    const userRef = db.collection('users').doc(userId);
    batch.update(userRef, {
        deletedAt: admin.firestore.FieldValue.serverTimestamp(),
        isActive: false,
        hasProfile: false,
        email: `deleted_${userId}@kiraliksevgili.net`,
        phoneNumber: null,
        fcmToken: null
    });
    const collectionsToClean = ['notifications', 'push_notifications', 'message_requests'];
    for (const col of collectionsToClean) {
        const snapshots = await db.collection(col)
            .where('recipientId', '==', userId)
            .get();
        snapshots.docs.forEach(doc => batch.delete(doc.ref));
        const senderSnapshots = await db.collection(col)
            .where('senderId', '==', userId)
            .get();
        senderSnapshots.docs.forEach(doc => batch.delete(doc.ref));
    }
    const postsSnap = await db.collection('community_posts').where('userId', '==', userId).get();
    postsSnap.docs.forEach(doc => batch.delete(doc.ref));
    const chatsSnap = await db.collection('chats').where('participants', 'array-contains', userId).get();
    for (const chatDoc of chatsSnap.docs) {
        const messagesSnap = await chatDoc.ref.collection('messages').get();
        messagesSnap.docs.forEach(m => batch.delete(m.ref));
        batch.delete(chatDoc.ref);
    }
    await batch.commit();
    const bucket = storage.bucket();
    const folders = [`user_photos/${userId}`, `user_voices/${userId}`, `verifications/${userId}`];
    for (const folder of folders) {
        try {
            await bucket.deleteFiles({ prefix: folder });
        }
        catch (e) {
            console.error(`Storage cleanup failed for ${folder}:`, e);
        }
    }
    try {
        await auth.deleteUser(userId);
    }
    catch (e) {
        console.warn(`Auth user already deleted or not found: ${userId}`);
    }
}
exports.sendDeletionRequest = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
        return;
    }
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    try {
        const { email, username } = req.body;
        if (!email || !username) {
            res.status(400).json({ error: 'Email ve kullanıcı adı gereklidir.' });
            return;
        }
        const userSnap = await db.collection('users').where('email', '==', email).limit(1).get();
        if (userSnap.empty) {
            res.json({ success: true, message: 'Hesap varsa doğrulama e-postası gönderildi.' });
            return;
        }
        const userData = userSnap.docs[0].data();
        const userId = userSnap.docs[0].id;
        if (userData.username?.toLowerCase() !== username.toLowerCase() &&
            userData.displayName?.toLowerCase() !== username.toLowerCase()) {
            res.status(400).json({ error: 'Bilgiler eşleşmedi.' });
            return;
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = admin.firestore.Timestamp.fromDate(new Date(Date.now() + 2 * 60 * 60 * 1000));
        await db.collection('account_deletion_requests').doc(token).set({
            userId,
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            expiresAt,
            status: 'pending'
        });
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        const verifyUrl = `https://kiraliksevgili.net/hesap-silme/verify?token=${token}`;
        await transporter.sendMail({
            from: `"Kiralık Sevgili" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Hesap Silme Onayı',
            html: `<div style="font-family:sans-serif;padding:20px;">
        <h2>Hesap Silme Onayı</h2>
        <p>Hesabınızı silmek için talep aldık. Onaylamak için aşağıdaki butona tıklayın:</p>
        <a href="${verifyUrl}" style="background:#d4af37;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Hesabımı Sil</a>
        <p>Bu bağlantı 2 saat geçerlidir.</p>
      </div>`
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sunucu hatası.' });
    }
});
exports.verifyDeletion = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
        return;
    }
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).json({ error: 'Token gereklidir.' });
            return;
        }
        const requestRef = db.collection('account_deletion_requests').doc(token);
        const requestDoc = await requestRef.get();
        if (!requestDoc.exists) {
            res.status(404).json({ error: 'Geçersiz bağlantı.' });
            return;
        }
        const data = requestDoc.data();
        if (data.status !== 'pending' || data.expiresAt.toDate() < new Date()) {
            res.status(400).json({ error: 'Bağlantı geçersiz veya süresi dolmuş.' });
            return;
        }
        await cleanupUserData(data.userId);
        await requestRef.update({
            status: 'completed',
            completedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.json({ success: true, message: 'Hesabınız başarıyla silindi.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'İşlem sırasında hata oluştu.' });
    }
});
//# sourceMappingURL=index.js.map