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

        <h1 className="mt-8 text-4xl font-black tracking-tighter uppercase">
          İletişim
        </h1>

        <p className="mt-5 leading-8 text-gray-400 font-medium">
          Kiralık Sevgili hakkında sorularınız, hesap sorunları, güvenlik
          bildirimleri veya platform kurallarıyla ilgili talepleriniz için
          bizimle iletişime geçebilirsiniz.
        </p>

        <section className="mt-10 rounded-[2rem] border border-[#1a1a1a] bg-[#0a0a0a] p-8 md:p-12">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Destek ve İletişim
          </h2>

          <p className="mt-4 leading-7 text-gray-400 font-medium">
            Genel sorular, hesap sorunları, güvenlik bildirimleri,
            topluluk kurallarıyla ilgili bildirimler ve gizlilik
            talepleriniz için bize e-posta gönderebilirsiniz.
          </p>

          <div className="mt-10 rounded-2xl bg-black border border-[#1a1a1a] p-8 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
              E-posta Adresimiz
            </p>

            <a
              href="mailto:yakazago@gmail.com"
              className="text-2xl md:text-3xl font-black text-[#ff2d55] hover:text-white transition-colors tracking-tighter"
            >
              yakazago@gmail.com
            </a>
          </div>

          <p className="mt-8 leading-7 text-gray-500 text-sm font-medium italic">
            Mesajınızda sorununuzu mümkün olduğunca açık şekilde belirtin.
            Güvenlik veya kural ihlali bildiriyorsanız ilgili kullanıcı
            adı, profil bağlantısı veya olayla ilgili gerekli bilgileri
            ekleyebilirsiniz.
          </p>
        </section>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#1a1a1a] p-6 bg-[#050505]">
            <h3 className="font-black uppercase tracking-wider text-xs mb-3 text-gray-300">Genel Destek</h3>
            <p className="text-xs leading-6 text-gray-500 font-medium">
              Platform ve kullanım hakkında sorularınız için bize
              ulaşabilirsiniz.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1a1a1a] p-6 bg-[#050505]">
            <h3 className="font-black uppercase tracking-wider text-xs mb-3 text-gray-300">Güvenlik</h3>
            <p className="text-xs leading-6 text-gray-500 font-medium">
              Şüpheli davranışları veya topluluk kurallarına aykırı
              içerikleri bildirebilirsiniz.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1a1a1a] p-6 bg-[#050505]">
            <h3 className="font-black uppercase tracking-wider text-xs mb-3 text-gray-300">Gizlilik</h3>
            <p className="text-xs leading-6 text-gray-500 font-medium">
              Gizlilik ve kişisel verilerle ilgili taleplerinizi
              iletebilirsiniz.
            </p>
          </div>
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