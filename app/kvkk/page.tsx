import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Kiralık Sevgili",
  description:
    "Kiralık Sevgili Kişisel Verilerin Korunması Kanunu (KVKK) aydınlatma metni. Verilerinizin nasıl işlendiği ve haklarınız hakkında detaylı bilgi.",
  alternates: {
    canonical: "https://kiraliksevgili.net/kvkk",
  },
};

export default function KVKK() {
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
          KVKK <span className="premium-gradient-text">Aydınlatma Metni</span>
        </h1>

        <p className="mt-5 leading-8 text-gray-400 font-medium">
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Kiralık Sevgili platformu olarak veri sorumlusu sıfatıyla kişisel verilerinizin işlenmesi süreçleri hakkında sizi bilgilendirmek istiyoruz.
        </p>

        <section className="mt-10 space-y-12">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">1. Kişisel Verilerin İşlenme Amacı</h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kişisel verileriniz; platform üyeliğinin oluşturulması, sosyal arkadaşlık hizmetlerinin sunulması, kullanıcı güvenliğinin sağlanması, şikayet ve önerilerin değerlendirilmesi ve yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">2. İşlenen Kişisel Veriler</h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platform kullanımı kapsamında paylaştığınız ad-soyad, iletişim bilgileri, konum bilgileri, profil fotoğrafları ve sosyal tercihleriniz gibi veriler işlenmektedir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">3. Verilerin Aktarılması</h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kişisel verileriniz, yasal zorunluluklar çerçevesinde yetkili kamu kurum ve kuruluşları ile paylaşılabileceği gibi, hizmetlerimizin sunulması için gerekli olan iş ortaklarımız ve servis sağlayıcılarımızla da (teknik altyapı vb.) paylaşılabilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">4. Veri Sahibinin Hakları</h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme ve silinmesini talep etme haklarına sahipsiniz.
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
