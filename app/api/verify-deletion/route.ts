import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // 1. Talebi kontrol et
    const requestRef = adminDb.collection('account_deletion_requests').doc(token);
    const doc = await requestRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Geçersiz veya süresi dolmuş bağlantı.' }, { status: 404 });
    }

    const data = doc.data()!;
    if (data.status !== 'pending') {
      return NextResponse.json({ error: 'Bu talep daha önce işleme alınmış.' }, { status: 400 });
    }

    const now = new Date();
    if (data.expiresAt.toDate() < now) {
      return NextResponse.json({ error: 'Bu bağlantının süresi dolmuş.' }, { status: 400 });
    }

    const userId = data.userId;

    // 2. KULLANICIYI SİL (Kritik İşlem)
    // Önce Firestore'da deletedAt set et (kurallar için)
    await adminDb.collection('users').doc(userId).update({
      deletedAt: new Date(),
      isActive: false,
      hasProfile: false,
    });

    // Firebase Auth'dan sil
    try {
      await adminAuth.deleteUser(userId);
    } catch (e: any) {
      console.error('Auth deletion failed:', e);
      // Auth'da yoksa bile devam et, belki daha önce silindi
    }

    // 3. Talep durumunu güncelle
    await requestRef.update({
      status: 'completed',
      completedAt: new Date()
    });

    // 4. Diğer verileri temizle (Opsiyonel: Mesajlar, fotoğraflar vb.)
    // Bunlar genellikle background worker veya cloud functions ile yapılır
    // ama burada kritik olanları tetikleyebiliriz.

    return NextResponse.json({ success: true, message: 'Hesabınız başarıyla silindi.' });
  } catch (error: any) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'İşlem sırasında bir hata oluştu.' }, { status: 500 });
  }
}
