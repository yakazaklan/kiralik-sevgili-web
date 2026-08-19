import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topluluk Kuralları | Kiralık Sevgili",
  description:
    "Kiralık Sevgili topluluk kuralları. Güvenli sosyal arkadaşlık rehberi ve platform etik kuralları.",
  alternates: {
    canonical: "https://kiraliksevgili.net/topluluk-kurallari",
  },
};

export default function ToplulukKurallari() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <a
          href="/"
          className="text-sm font-black uppercase tracking-widest text-[#ff2d55] hover:text-white transition-colors"
        >
          ← GERİ DÖN
        </a>

        <h1 className="mt-8 text-4xl font-black tracking-tighter uppercase">
          Topluluk <span className="premium-gradient-text">Kuralları</span>
        </h1>

        <p className="mt-5 leading-8 text-gray-400 font-medium">
          Kiralık Sevgili, insanların sosyal arkadaşlık kurması,
          birlikte zaman geçirmesi ve yasal sosyal aktivitelerde
          birbirlerine eşlik etmesi amacıyla oluşturulmuştur.
        </p>

        <section className="mt-10 space-y-12">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              1. Cinsel hizmet ve eskort hizmeti yasaktır
            </h2>

            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kiralık Sevgili bir eskort sitesi değildir. Platform
              üzerinden eskort hizmeti, fuhuş, cinsel hizmet veya
              benzeri hizmetlerin teklif edilmesi, aranması,
              pazarlanması ya da organize edilmesi yasaktır.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              2. Sosyal arkadaşlık amacı
            </h2>

            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platform; kahve içmek, yemek yemek, gezmek, etkinliğe
              katılmak, sohbet etmek ve birlikte sosyal zaman geçirmek
              gibi yasal faaliyetler için kullanılabilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              3. Reşit olmayan kullanıcılar
            </h2>

            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Reşit olmayan kişilerin platformu kullanmasına izin
              verilmez.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              4. Taciz ve tehdit
            </h2>

            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kullanıcılara yönelik tehdit, taciz, şantaj, ısrarlı
              rahatsız etme veya başka kişilerin güvenliğini tehlikeye
              atan davranışlar yasaktır.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              5. Dolandırıcılık ve yanıltıcı içerik
            </h2>

            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Sahte profil oluşturmak, başka bir kişinin kimliğine
              bürünmek, kullanıcıları maddi olarak kandırmak veya
              yanıltıcı bilgiler paylaşmak yasaktır.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              6. Kural ihlalleri
            </h2>

            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Topluluk kurallarını ihlal eden içerikler kaldırılabilir
              ve ihlalin niteliğine göre ilgili kullanıcı hesabı
              sınırlandırılabilir veya kapatılabilir.
            </p>
          </div>
        </section>

        <div className="mt-12 rounded-[2rem] bg-[#0a0a0a] border border-[#ff2d55]/20 p-8">
          <h2 className="text-xl font-black uppercase tracking-tight text-[#ff2d55]">
            Güvenli bir topluluk için
          </h2>

          <p className="mt-3 leading-7 text-gray-400 font-medium">
            Şüpheli veya kurallara aykırı bir durumla karşılaşan
            kullanıcılar platform yönetimine bildirimde bulunabilir.
          </p>
        </div>

        <div className="mt-16 border-t border-[#1a1a1a] pt-12">
          <a
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-[#ff2d55] transition-colors"
          >
            © 2025 KİRALIK SEVGİLİ
          </a>
        </div>
      </div>
    </main>
  );
}