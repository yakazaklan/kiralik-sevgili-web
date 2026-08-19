import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları | Kiralık Sevgili",
  description:
    "Kiralık Sevgili platformu kullanım şartları. Sosyal refakat kuralları, güvenlik politikaları ve yasal uyarılar.",
  alternates: {
    canonical: "https://kiraliksevgili.net/kullanim-sartlari",
  },
};

export default function KullanimSartlari() {
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
          Kullanım <span className="premium-gradient-text">Şartları</span>
        </h1>

        <p className="mt-5 leading-8 text-gray-400 font-medium">
          Kiralık Sevgili, insanların sosyal arkadaşlık kurmasına,
          birlikte zaman geçirmesine ve yasal sosyal aktivitelere
          katılmasına yardımcı olan bir platformdur.
        </p>

        <section className="mt-10 space-y-12">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">1. Platformun amacı</h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platform; kahve içmek, yemek yemek, gezmek, sohbet etmek,
              etkinliklere katılmak ve benzeri yasal sosyal faaliyetler
              için insanların birbirleriyle tanışmasını amaçlar.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              2. Eskort ve cinsel hizmet yasağı
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kiralık Sevgili bir eskort sitesi değildir. Platform
              üzerinden cinsel hizmet, fuhuş, eskort hizmeti veya benzeri
              hizmetlerin sunulması, aranması, pazarlanması ya da organize
              edilmesi yasaktır.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">3. Kullanıcı sorumluluğu</h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kullanıcılar platforma verdikleri bilgilerin doğru olduğunu
              kabul eder. Sahte profil oluşturmak, başka bir kişinin
              kimliğine bürünmek veya yanıltıcı bilgi paylaşmak yasaktır.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">4. Yaş sınırı</h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platform yalnızca reşit kişiler tarafından kullanılabilir.
              Reşit olmayan kişilerin hesap oluşturmasına veya platformu
              kullanmasına izin verilmez.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              5. Yasaklanan davranışlar
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Taciz, tehdit, şantaj, dolandırıcılık, kimliğe bürünme,
              kişisel bilgileri izinsiz paylaşma, spam ve diğer
              kullanıcıların güvenliğini tehlikeye sokabilecek davranışlar
              yasaktır.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              6. Hesabın askıya alınması
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platform kurallarını veya yürürlükteki mevzuatı ihlal eden
              hesaplar incelenebilir, geçici olarak askıya alınabilir veya
              tamamen kapatılabilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              7. Kullanıcılar arasındaki ilişkiler
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kullanıcılar arasındaki görüşmeler, buluşmalar ve diğer
              etkileşimlerden kullanıcıların kendileri sorumludur.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              8. Şartların güncellenmesi
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platformun özellikleri veya yasal yükümlülükleri değiştiğinde
              bu Kullanım Şartları güncellenebilir.
            </p>
          </div>
        </section>

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