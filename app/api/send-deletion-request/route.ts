import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { adminDb } from '@/lib/firebase-admin';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, username, reason } = await request.json();

    if (!email || !username) {
      return NextResponse.json({ error: 'Email and username are required' }, { status: 400 });
    }

    // 1. Kullanıcıyı bul (E-posta ile)
    const usersRef = adminDb.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();

    if (snapshot.empty) {
      // Güvenlik için e-postanın olmadığını söylemiyoruz, "İşlem başlatıldı" diyoruz.
      return NextResponse.json({ success: true, message: 'Verification email sent if account exists.' });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;

    // Kullanıcı adı doğrulaması (Küçük/büyük harf duyarsız)
    if (userData.username?.toLowerCase() !== username.toLowerCase() &&
        userData.displayName?.toLowerCase() !== username.toLowerCase()) {
      return NextResponse.json({ error: 'Kullanıcı adı ve e-posta eşleşmedi.' }, { status: 400 });
    }

    // 2. Güvenli Token Oluştur
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2); // 2 saat geçerli

    // 3. Firestore'a Talebi Kaydet
    await adminDb.collection('account_deletion_requests').doc(token).set({
      userId,
      email,
      username,
      reason: reason || 'Belirtilmedi',
      createdAt: new Date(),
      expiresAt,
      status: 'pending'
    });

    // 4. E-posta Gönder
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE !== 'false',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kiraliksevgili.net';
    const verifyUrl = `${baseUrl}/hesap-silme/verify?token=${token}`;

    const mailOptions = {
      from: `"Kiralık Sevgili" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Hesap Silme İşlemini Onayla',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #d4af37; text-align: center;">Hesap Silme Onayı</h2>
          <p>Merhaba <strong>${username}</strong>,</p>
          <p>Hesabınızı silmek için bir talep aldık. Bu işlemi tamamlamak için aşağıdaki butona tıklayarak onay vermeniz gerekmektedir.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" style="background-color: #d4af37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Hesabımı Kalıcı Olarak Sil</a>
          </div>
          <p style="color: #666; font-size: 14px;">Bu bağlantı 2 saat boyunca geçerlidir. Eğer bu talebi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın. Hesabınız güvende kalacaktır.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">Kiralık Sevgili Güvenlik Ekibi</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Deletion Request Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
