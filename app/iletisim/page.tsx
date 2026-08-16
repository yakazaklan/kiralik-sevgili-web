import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Kiralık Sevgili Alanya Destek",
  description:
    "Kiralık Sevgili platformu ile iletişim kurun. Alanya sosyal arkadaşlık ve refakat hizmetleri için destek merkezi.",
};

export default function Iletisim() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <a
          href="/"
          className="text-sm font-black uppercase tracking-widest text-[#ff2d55] hover:text-white transition-colors"
        >
          ← GERİ DÖN
        </a>

        <h1 className="mt-8 text-5xl font-black tracking-tighter uppercase leading-none">
          Bize <br /><span className="text-[#ff2d55]">Ulaşın & Şikayet Bildir</span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg font-medium leading-relaxed max-w-2xl">
          Hesap sorunları, VIP üyelik talepleri, reklam işbirlikleri veya topluluk kuralları ihlalleriyle ilgili bildirimlerinizi bu kanaldan iletebilirsiniz.
        </p>

        <section className="mt-16 rounded-[3rem] border border-[#1a1a1a] bg-[#0a0a0a] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff2d55]/5 blur-[100px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Resmi İletişim Hattı</h2>

            <p className="text-gray-400 font-medium mb-12 leading-relaxed">
              Tüm talepleriniz için tek bir merkezden hizmet veriyoruz. Lütfen mesajınızın başına
              <strong> [DESTEK]</strong>, <strong> [ŞİKAYET]</strong> veya <strong> [ELITE BAŞVURU]</strong>
              etiketlerinden birini ekleyiniz.
            </p>

            <div className="rounded-[2rem] bg-black border border-[#1a1a1a] p-10 flex flex-col items-center justify-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">Resmi E-Posta</span>
              <a
                href="mailto:yakazago@gmail.com"
                className="text-3xl md:text-5xl font-black text-[#ff2d55] hover:scale-105 transition-transform tracking-tighter break-all"
              >
                yakazago@gmail.com
              </a>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Ortalama Yanıt Süresi: 12 Saat</span>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-[#1a1a1a] p-8 bg-[#050505] hover:border-[#ff2d55]/20 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#ff2d55]/10 flex items-center justify-center text-[#ff2d55] mb-6 font-black text-xl">!</div>
            <h3 className="font-black uppercase tracking-widest text-sm mb-4 text-white">Güvenlik ve Şikayet</h3>
            <p className="text-sm leading-relaxed text-gray-500 font-medium">
              Sizi rahatsız eden profilleri, sahte ilanları veya topluluk kurallarına aykırı davranışları (eskortluk teklifleri vb.) kanıtlarıyla birlikte bildirin.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#1a1a1a] p-8 bg-[#050505] hover:border-[#ff2d55]/20 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 font-black text-xl">★</div>
            <h3 className="font-black uppercase tracking-widest text-sm mb-4 text-white">Elite & Onaylı Üyelik</h3>
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
