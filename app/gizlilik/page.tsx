import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Kiralık Sevgili",
  description:
    "Kiralık Sevgili platformu gizlilik politikası. Kişisel verilerinizin korunması ve güvenliği hakkında bilgiler.",
  alternates: {
    canonical: "https://kiraliksevgili.net/gizlilik",
  },
};

export default function Gizlilik() {
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
          Gizlilik <span className="premium-gradient-text">Politikası</span>
        </h1>

        <p className="mt-5 leading-8 text-gray-400 font-medium">
          Kiralık Sevgili olarak kullanıcılarımızın gizliliğine önem
          veriyoruz. Bu politika, platformu kullanırken hangi bilgilerin
          toplanabileceğini, nasıl kullanılabileceğini ve korunabileceğini
          açıklar.
        </p>

        <section className="mt-10 space-y-12">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              1. Toplanan bilgiler
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Hesap oluşturma ve platformu kullanma sırasında ad, yaş,
              şehir, profil bilgileri, fotoğraflar ve iletişim bilgileri
              gibi kullanıcı tarafından sağlanan bilgiler işlenebilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              2. Bilgilerin kullanım amacı
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Toplanan bilgiler; hesap oluşturma, profil gösterimi,
              kullanıcılar arasında sosyal bağlantı kurulması, güvenliğin
              sağlanması ve platform hizmetlerinin sunulması amacıyla
              kullanılabilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              3. Profil bilgileri
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kullanıcıların platform üzerinde yayınlamayı tercih ettiği
              profil bilgileri diğer kullanıcılar tarafından görülebilir.
              Kullanıcılar paylaşmak istemedikleri özel bilgileri
              profillerine eklememelidir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              4. Mesajlaşma ve iletişim
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platform üzerindeki mesajlaşma ve iletişim özellikleri,
              kullanıcıların birbirleriyle bağlantı kurabilmesi amacıyla
              kullanılabilir. Güvenlik ve kural ihlallerinin incelenmesi
              gerektiğinde ilgili veriler yetkili süreçler kapsamında
              değerlendirilebilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              5. Güvenlik
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kullanıcı bilgilerinin yetkisiz erişime, kayba veya kötüye
              kullanıma karşı korunması için makul teknik ve idari
              güvenlik önlemleri uygulanır. Bununla birlikte internet
              üzerinden gerçekleştirilen hiçbir veri aktarımının tamamen
              risksiz olduğu garanti edilemez.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              6. Üçüncü taraf hizmetler
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platformun çalışması için barındırma, kimlik doğrulama,
              veri depolama, analiz veya benzeri teknik hizmetler sağlayan
              üçüncü taraf servislerden yararlanılabilir. Bu servisler
              yalnızca gerekli olduğu ölçüde veri işleyebilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              7. Kullanıcı hakları
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kullanıcılar kişisel verileriyle ilgili yürürlükteki
              mevzuattan doğan haklarını kullanabilir. Talepler için
              platformun iletişim kanallarından bizimle iletişime
              geçilebilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              8. Politika değişiklikleri
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Hizmetlerimizin veya yasal yükümlülüklerimizin değişmesi
              halinde bu Gizlilik Politikası güncellenebilir. Güncel
              politika bu sayfada yayınlanır.
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