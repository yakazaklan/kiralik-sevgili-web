import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://kiraliksevgili.net"),
  title: {
    default: "Kiralık Sevgili | Sosyal Refakat ve Arkadaşlık Platformu",
    template: "%s | Kiralık Sevgili",
  },
  description:
    "Türkiye genelinde sosyal etkinlikler, geziler, yemek, kahve ve günlük aktiviteler için güvenilir sosyal refakat ve arkadaşlık platformu. Alanya ve diğer şehirlerde ilanları keşfedin.",
  keywords: [
    "Kiralık Sevgili",
    "sosyal arkadaşlık",
    "sosyal refakat",
    "etkinlik arkadaşı",
    "Alanya sosyal arkadaşlık",
    "Türkiye arkadaşlık platformu",
    "VIP refakat",
    "birlikte zaman geçirme",
  ],
  authors: [{ name: "Kiralık Sevgili" }],
  creator: "Kiralık Sevgili",
  publisher: "Kiralık Sevgili",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Kiralık Sevgili | Sosyal Refakat ve Arkadaşlık Platformu",
    description:
      "Türkiye'nin güvenilir sosyal refakat ve arkadaşlık platformu. Alanya ve tüm illerdeki sosyal etkinlik arkadaşı ilanlarını keşfedin.",
    url: "https://kiraliksevgili.net",
    siteName: "Kiralık Sevgili",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiralık Sevgili | Sosyal Refakat ve Arkadaşlık Platformu",
    description: "Türkiye genelinde sosyal etkinlikler ve günlük aktiviteler için güvenilir sosyal refakat platformu.",
  },
  alternates: {
    canonical: "https://kiraliksevgili.net",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "OLthKMQd2oYXhR2I2YCpEUN5v40IeKl348K1R5PQfHk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased bg-black text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}
