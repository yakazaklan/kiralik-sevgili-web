import ProfileClient from "./ProfileClient";

// Statik dışa aktarma için gerekli: Build sırasında hata almamak için örnek bir rota döndürüyoruz.
export function generateStaticParams() {
  return [{ id: 'ilan-detay' }];
}

export default function Page() {
  return <ProfileClient />;
}
