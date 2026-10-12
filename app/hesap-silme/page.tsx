"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function HesapSilme() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Call Cloud Function via hosting rewrite for reliability and CORS
      // Added trailing slash to match trailingSlash: true in firebase.json
      const response = await fetch("/api/send-deletion-request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, reason }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `Sunucu hatası: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.error || "Talebiniz iletilemedi.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Bir hata oluştu. Lütfen yakazago@gmail.com adresine manuel olarak e-posta gönderin.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6 bg-[#080808] border border-[#d4af37]/20 p-10 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Onay E-postası Gönderildi</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Hesap silme işlemini tamamlamak için e-posta adresinize bir doğrulama bağlantısı gönderdik. Lütfen gelen kutunuzu (ve gereksiz kutusunu) kontrol ederek bağlantıya tıklayın.
          </p>
          <p className="text-white/40 text-[10px] uppercase tracking-widest">
            Doğrulama yapılmadığı sürece hesabınız silinmeyecektir.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] border border-[#d4af37]/20 rounded-xl hover:bg-[#d4af37]/5 transition-colors"
          >
            YENİ TALEP OLUŞTUR
          </button>
          <a
            href="/"
            className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white"
          >
            ANA SAYFAYA DÖN
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#d4af37]/30">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <a
          href="/"
          className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] hover:text-white transition-colors"
        >
          ← GERİ DÖN
        </a>

        <div className="mt-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-4 py-1.5 text-[8px] font-black text-[#d4af37] uppercase tracking-[0.4em] border border-[#d4af37]/20 mb-6">
            GÜVENLİK & GİZLİLİK
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">
            Hesabımı <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37]">Sil</span>
          </h1>
          <p className="mt-6 text-sm md:text-base leading-relaxed text-white/50 font-medium max-w-2xl">
            Kiralık Sevgili hesabınızı ve ilişkili tüm verilerinizi dilediğiniz zaman silebilirsiniz.
            <span className="text-[#d4af37] block mt-2">Bu işlem için sisteme giriş yapmanız gerekmemektedir.</span>
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Form Bölümü */}
          <div className="bg-[#080808] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-lg font-black uppercase tracking-wider text-white mb-6">Silme Talebi</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Kayıtlı E-posta Adresiniz</label>
                <input
                  type="email"
                  required
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors disabled:opacity-50"
                  placeholder="Hesabınıza bağlı e-posta"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Kullanıcı Adınız</label>
                <input
                  type="text"
                  required
                  value={username}
                  disabled={isLoading}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors disabled:opacity-50"
                  placeholder="Uygulama içi kullanıcı adınız"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Ayrılma Sebebi (Opsiyonel)</label>
                <textarea
                  value={reason}
                  disabled={isLoading}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors h-32 resize-none disabled:opacity-50"
                  placeholder="Deneyiminizi nasıl iyileştirebiliriz?"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    GÖNDERİLİYOR...
                  </>
                ) : (
                  "SİLME TALEBİNİ İLET"
                )}
              </button>
              <p className="text-[9px] text-center text-white/30 font-medium">
                Giriş yapmadan e-posta yoluyla kimlik doğrulaması yaparak hesabınızı silebilirsiniz.
              </p>
            </form>
          </div>

          {/* Bilgilendirme Bölümü */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Süreç ve Şeffaflık</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Talebiniz bize ulaştığında, güvenlik amacıyla belirttiğiniz e-posta adresine bir onay iletisi gönderilir. Onayınızın ardından <strong>48 saat</strong> içinde tüm verileriniz kalıcı olarak silinir.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Hangi Veriler Silinir?</h3>
              <ul className="grid grid-cols-1 gap-2">
                {[
                  "Kimlik ve iletişim bilgileriniz",
                  "Profil fotoğrafları ve biyografi",
                  "Özel mesajlaşma ve etkileşim geçmişi",
                  "Konum ve uygulama kullanım verileri"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-white/50">
                    <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Uygulama İçi Silme</h3>
              <p className="text-[11px] leading-relaxed text-white/50">
                Dilerseniz uygulama içindeki <strong>Profil {">"} Ayarlar {">"} Hesabı Sil</strong> adımlarını takip ederek, 30 günlük bekleme süresi olmaksızın anında silme talebi başlatabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/5 pt-12 text-center">
          <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
            © 2025 KİRALIK SEVGİLİ. VERİ GİZLİLİĞİ VE KULLANICI HAKLARI.
          </p>
        </div>
      </div>
    </main>
  );
}
