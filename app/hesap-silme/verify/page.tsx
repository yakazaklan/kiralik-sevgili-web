'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Hesabınız siliniyor, lütfen bekleyin...');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Geçersiz doğrulama bağlantısı.');
      return;
    }

    const verifyDeletion = async () => {
      try {
        // Use the Cloud Function via hosting rewrite
        // Added trailing slash to match trailingSlash: true in firebase.json
        const response = await fetch('/api/verify-deletion/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          throw new Error(text || `Sunucu hatası: ${response.status}`);
        }

        if (response.ok) {
          setStatus('success');
          setMessage('Hesabınız silindi.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Bir hata oluştu.');
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'Sunucuya bağlanılamadı.');
      }
    };

    verifyDeletion();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="mb-6">
          <div className="text-3xl font-bold text-[#d4af37] mb-2">Kiralık Sevgili</div>
          <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full"></div>
        </div>

        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mb-4"></div>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">İşlem Başarılı</h2>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link
              href="/"
              className="inline-block w-full bg-[#d4af37] text-white font-bold py-3 rounded-xl hover:bg-[#b8962f] transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">İşlem Başarısız</h2>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link
              href="/hesap-silme"
              className="inline-block w-full bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors"
            >
              Tekrar Dene
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
