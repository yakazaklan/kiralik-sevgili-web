import { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim | Kiralık Sevgili Destek Merkezi",
  description:
    "Kiralık Sevgili platformu ile iletişim kurun. Sosyal refakat ve VIP eşlik hizmetleri için resmi destek hattı ve iş birliği kanalları.",
  alternates: {
    canonical: absoluteUrl("/iletisim"),
  },
};

export default function Iletisim() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <a
          href="/"
          className="text-sm font-black uppercase tracking-widest text-[#d4af37] hover:text-white transition-colors"
        >
          ← GERİ DÖN
        </a>

        <h1 className="mt-8 text-5xl font-black tracking-tighter uppercase leading-none">
          Bize <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37]">Ulaşın & Şikayet Bildir</span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg font-medium leading-relaxed max-w-2xl">
          Hesap sorunları, VIP üyelik talepleri, reklam işbirlikleri veya topluluk kuralları ihlalleriyle ilgili bildirimlerinizi bu kanaldan iletebilirsiniz.
        </p>

        <section className="mt-16 rounded-[3rem] border border-[#d4af37]/20 bg-[#0a0a0a] p-10 md:p-16 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 blur-[100px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-white">Resmi İletişim Hattı</h2>

            <p className="text-gray-400 font-medium mb-12 leading-relaxed">
              Tüm talepleriniz için tek bir merkezden hizmet veriyoruz. Lütfen mesajınızın başına
              <strong> [DESTEK]</strong>, <strong> [ŞİKAYET]</strong> veya <strong> [ELİT BAŞVURU]</strong>
              etiketlerinden birini ekleyiniz.
            </p>

            <div className="rounded-[2rem] bg-black border border-[#d4af37]/10 p-10 flex flex-col items-center justify-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">Resmi E-Posta</span>
              <a
                href="mailto:yakazago@gmail.com"
                className="text-3xl md:text-5xl font-black text-[#d4af37] hover:scale-105 transition-transform tracking-tighter break-all"
              >
                yakazago@gmail.com
              </a>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Ortalama Yanıt Süresi: 12 Saat</span>
              <Link href="/cocuk-guvenligi" className="mt-4 text-[10px] font-black text-red-500/80 hover:text-red-500 uppercase tracking-widest underline transition-colors">Çocuk Güvenliği Politikası</Link>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-[#1a1a1a] p-8 bg-[#050505] hover:border-[#d4af37]/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-6 font-black text-xl">!</div>
            <h3 className="font-black uppercase tracking-widest text-sm mb-4 text-white group-hover:text-[#d4af37] transition-colors">Güvenlik ve Şikayet</h3>
            <p className="text-sm leading-relaxed text-gray-500 font-medium">
              Sizi rahatsız eden profilleri, sahte ilanları veya topluluk kurallarına aykırı davranışları (eskortluk teklifleri vb.) kanıtlarıyla birlikte bildirin.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#1a1a1a] p-8 bg-[#050505] hover:border-[#d4af37]/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-6 font-black text-xl">★</div>
            <h3 className="font-black uppercase tracking-widest text-sm mb-4 text-white group-hover:text-[#d4af37] transition-colors">Elit & Onaylı Üyelik</h3>
            <p className="text-sm leading-relaxed text-gray-500 font-medium">
              Profilinizi daha görünür kılmak ve güven rozeti almak için kimlik doğrulama taleplerinizi buradan iletebilirsiniz.
            </p>
          </div>
        </div>

        {/* SEO Metni */}
        <div className="mt-20 text-center">
            <p className="text-[9px] text-gray-800 uppercase font-black tracking-[0.3em]">
                Alanya eskort siteleri ile hiçbir bağımız bulunmamaktadır. Sadece elit refakat hizmetleri.
            </p>
        </div>
      </div>
    </main>
  );
}
