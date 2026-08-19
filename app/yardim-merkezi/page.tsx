import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yardım Merkezi | Kiralık Sevgili",
  description: "Kiralık Sevgili platformu hakkında sıkça sorulan sorular, sosyal refakat rehberi ve üyelik süreçleri.",
  alternates: {
    canonical: "https://kiraliksevgili.net/yardim-merkezi",
  },
};

export default function YardimMerkezi() {
  const faqs = [
    {
      q: "Kiralık Sevgili nedir ve nasıl çalışır?",
      a: "Kiralık Sevgili, sosyal etkinliklere (iş yemekleri, sinema, konser, seyahat veya özel davetler) profesyonel eşlik hizmeti sunan refakatçilerle, bu hizmete ihtiyaç duyan elit üyeleri buluşturan bir platformdur. Kullanıcılar profilleri inceler, güvenlik rozetlerine bakar ve doğrudan iletişim kurarlar."
    },
    {
      q: "Eskort hizmeti yasak mı?",
      a: "EVET, KESİNLİKLE YASAKTIR. Kiralık Sevgili bir Alanya eskort sitesi değildir. Platformumuzda cinsel içerikli hizmet teklif etmek, talep etmek veya bu yönde imalarda bulunmak kalıcı uzaklaştırma sebebidir. Sadece yasal ve sosyal refakat odaklı paylaşımlara izin verilir."
    },
    {
      q: "Güvenlik ve Doğrulama (Elite/Onaylı) ne anlama gelir?",
      a: "Platformumuzda üç seviye doğrulama vardır. 'Elite' (Mavi Tik) üyeler en üst düzey kimlik ve güvenilirlik testinden geçmiş, referanslı üyelerdir. 'Onaylı' (Yeşil Tik) üyeler kimlik belgesi doğrulanmış kullanıcılardır. 'Onaysız' etiketi taşıyan üyelerle etkileşim kurarken dikkatli olunması önerilir."
    },
    {
      q: "Alanya ve diğer illerde hizmet veriliyor mu?",
      a: "Evet, platformumuz Türkiye genelinde hizmet vermektedir. Alanya, Antalya, İstanbul, Ankara ve İzmir gibi popüler lokasyonlarda çok sayıda aktif refakatçi ilanı bulunmaktadır. Konum filtrelerini kullanarak size en yakın profilleri görebilirsiniz."
    },
    {
      q: "Ücret iadesi veya ödeme güvenliği nasıldır?",
      a: "Kiralık Sevgili, üyeler arasındaki finansal anlaşmalara aracılık etmez. Ödemeler ve hizmet şartları üyelerin kendi aralarında belirlenir. Güvenliğiniz için ödemeleri hizmet anında veya yüz yüze görüşme başladıktan sonra yapmanızı öneririz."
    },
    {
      q: "Profilim nasıl 'Elite' olur?",
      a: "Elite statüsü için düzenli olumlu geri bildirim, yüksek randevu sayısı ve tam kimlik doğrulaması gerekmektedir. Destek ekibimize başvurarak profilinizi incelemeye aldırabilirsiniz."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <a href="/" className="text-sm font-black uppercase tracking-widest text-[#ff2d55] hover:text-white transition-colors">
          ← ANA SAYFAYA DÖN
        </a>

        <h1 className="mt-8 text-5xl font-black tracking-tighter uppercase leading-none">
          YARDIM <br /><span className="text-[#ff2d55]">MERKEZİ</span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg font-medium max-w-2xl leading-relaxed">
          Kiralık Sevgili topluluğuna dair tüm sorularınızın cevapları burada. Sosyal refakat ve VIP eşlik süreçleri hakkında bilgi edinin.
        </p>

        <div className="mt-16 grid gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="group p-8 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ff2d55]/30 transition-all">
              <h3 className="text-xl font-black text-white group-hover:text-[#ff2d55] transition-colors uppercase tracking-tight">{faq.q}</h3>
              <p className="mt-4 text-gray-500 leading-relaxed font-medium">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* SEO Alt Bilgi */}
        <div className="mt-16 p-8 border-t border-[#1a1a1a]">
          <p className="text-[10px] text-gray-700 uppercase tracking-widest font-black leading-loose">
            Alanya eskort rehberi değildir | Sosyal Arkadaşlık Platformu | VIP Refakat Hizmetleri | Güvenli Sosyalleşme
          </p>
        </div>

        <div className="mt-12 p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-[#ff2d55]/20 text-center">
          <h2 className="text-2xl font-black uppercase mb-4">Hâlâ Yardıma mı İhtiyacınız Var?</h2>
          <p className="text-gray-400 mb-8 font-medium">Ekibimiz 7/24 yanınızda.</p>
          <a href="/iletisim" className="inline-block bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-[#ff2d55] hover:text-white transition-all">
            DESTEK TALEBİ OLUŞTUR
          </a>
        </div>
      </div>
    </main>
  );
}
