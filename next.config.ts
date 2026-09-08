import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel üzerinde Next.js'in tüm dinamik özelliklerini kullanmak için standart ayarlar
  images: {
    unoptimized: true,
  },
  // Yönlendirme ve sayfa bulma sorunlarını gidermek için
  trailingSlash: false,
};

export default nextConfig;
