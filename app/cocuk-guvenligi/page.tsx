import { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Çocuk Güvenliği Politikası | Kiralık Sevgili",
  description:
    "Kiralık Sevgili platformu çocuk güvenliği ve çocukların cinsel istismarıyla mücadele (CSAM) politikası.",
  alternates: {
    canonical: absoluteUrl("/cocuk-guvenligi"),
  },
};

export default function CocukGuvenligi() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <a
          href="/"
          className="text-sm font-black uppercase tracking-widest text-[#d4af37] hover:text-white transition-colors"
        >
          ← GERİ DÖN
        </a>

        <h1 className="mt-8 text-4xl font-black tracking-tighter uppercase leading-tight">
          Kiralık Sevgili <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37]">Çocuk Güvenliği</span> ve İstismar İle Mücadele Standartları
        </h1>

        <p className="mt-5 leading-8 text-gray-400 font-medium">
          Kiralık Sevgili platformu (kiraliksevgili.net), çocukların güvenliğini en yüksek önceliği olarak kabul eder. Platformumuzda çocukların cinsel istismarına yönelik materyallere (CSAM) ve çocukların cinsel sömürüsüne (CSAE) karşı <strong>SIFIR TOLERANS</strong> politikası uygulanmaktadır.
        </p>

        <section className="mt-10 space-y-12">
          <div className="rounded-2xl bg-red-900/10 border border-red-900/20 p-6">
            <h2 className="text-xl font-black uppercase tracking-wider text-red-500">
              18 Yaş Sınırı ve Kesin Yasak
            </h2>
            <p className="mt-3 leading-7 text-gray-300 font-medium">
              Kiralık Sevgili, yalnızca 18 yaş ve üzeri yetişkinlerin kullanımı içindir. 18 yaş altı bireylerin uygulamada hesap açması, içerik paylaşması veya platformu herhangi bir şekilde kullanması kesinlikle yasaktır.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              1. Yasaklanan Eylemler (Sıfır Tolerans)
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Aşağıdaki eylemlerden herhangi birine karışan kullanıcıların hesapları derhal kapatılır ve gerekli yasal bildirimler yapılır:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-400 font-medium">
              <li><strong>CSAM (Çocuk Cinsel İstismarı Materyali):</strong> Her türlü çocuk cinsel istismarı materyalinin oluşturulması, yüklenmesi, saklanması, paylaşılması veya dağıtılması.</li>
              <li><strong>CSAE (Çocukların Cinsel Sömürüsü):</strong> Çocukların cinsel amaçlarla sömürülmesini teşvik eden veya kolaylaştıran her türlü içerik ve davranış.</li>
              <li><strong>Çocuk Kandırma (Online Grooming):</strong> Bir çocuğun cinsel istismarı amacıyla güvenini kazanmaya yönelik duygusal bağ kurma girişimleri.</li>
              <li><strong>Cinsel Şantaj (Sextortion):</strong> Reşit olmayanlara yönelik cinsel içerikli görüntü talebi veya bu görüntüleri kullanarak yapılan tehditler.</li>
              <li>Çocuk istismarına yönelik her türlü özendirici veya kolaylaştırıcı faaliyet.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              2. İhbar ve Raporlama Mekanizması
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Kiralık Sevgili, topluluk üyelerinin çocuk güvenliğini tehdit eden durumları bildirmesi için iki ana kanal sunar:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[2rem] bg-[#0a0a0a] border border-[#d4af37]/20 p-8">
                <p className="text-[#d4af37] font-black uppercase tracking-tighter text-lg mb-2">Uygulama İçi Raporlama</p>
                <p className="text-sm text-gray-400 leading-6">
                  Uygulama içinde herhangi bir profil veya mesaj üzerinden "Şikayet Et" butonunu kullanarak "Uygunsuz İçerik" veya "Güvenlik İhlali" seçeneği ile anlık bildirimde bulunabilirsiniz.
                </p>
              </div>
              <div className="rounded-[2rem] bg-[#0a0a0a] border border-[#d4af37]/20 p-8">
                <p className="text-[#d4af37] font-black uppercase tracking-tighter text-lg mb-2">E-Posta (7/24 İzlenir)</p>
                <a href="mailto:35serinkaratas@gmail.com" className="text-xl font-black text-white hover:text-[#d4af37] transition-colors break-all">
                  35serinkaratas@gmail.com
                </a>
                <p className="mt-4 text-xs text-gray-500">
                  Konu: [ACİL ÇOCUK GÜVENLİĞİ] - Çocuk güvenliği sorumlumuz bildirimleri 24 saat içinde incelemektedir.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              3. İnceleme, Müdahale ve Yasal Süreç
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Bildirilen her içerik ve profil aşağıdaki protokole göre işlenir:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-400 font-medium">
              <li><strong>Hızlı İnceleme:</strong> Çocuk güvenliğiyle ilgili bildirimler, moderasyon ekibimiz tarafından en yüksek öncelikle (genellikle 1 saat içinde) incelenir.</li>
              <li><strong>Kalıcı Engelleme:</strong> İhlal tespit edilen kullanıcının hesabı, cihaz kimliği ve ilişkili tüm verileri kalıcı olarak platformdan uzaklaştırılır.</li>
              <li><strong>Yasal Raporlama (NCMEC):</strong> CSAM tespiti durumunda, Kiralık Sevgili bu içeriği ve ilgili tüm kullanıcı verilerini ivedilikle Ulusal Kayıp ve İstismara Uğramış Çocuklar Merkezi (NCMEC) ve yetkili kolluk kuvvetlerine bildirir.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-200">
              4. Denetim ve Güvenlik Teknolojileri
            </h2>
            <p className="mt-3 leading-7 text-gray-400 font-medium">
              Platformumuzda çocukları korumak için aşağıdaki önlemler alınmaktadır:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-400 font-medium">
              <li><strong>Metin Filtreleme:</strong> Mesajlaşma sisteminde çocuk kandırma (grooming) ve uygunsuz teklifleri tespit eden otomatik anahtar kelime filtreleri kullanılmaktadır.</li>
              <li><strong>Görsel Denetim:</strong> Profil fotoğrafları ve paylaşılan medya içerikleri manuel ve otomatik araçlarla denetlenmektedir.</li>
              <li><strong>Topluluk Moderasyonu:</strong> Kullanıcılarımızdan gelen şikayetler, yapay zeka destekli önceliklendirme ile moderatörlerimizin önüne düşmektedir.</li>
            </ul>
          </div>
        </section>

        <div className="mt-16 border-t border-[#1a1a1a] pt-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            © 2025 KİRALIK SEVGİLİ - GOOGLE PLAY POLİTİKA UYUMU
          </p>
        </div>
      </div>
    </main>
  );
}

