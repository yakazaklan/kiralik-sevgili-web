import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Kiralık Sevgili | Alanya & Türkiye Sosyal Arkadaşlık ve Refakat Platformu",
  description:
    "Türkiye'nin ve Alanya'nın en prestijli sosyal arkadaşlık platformu. Kiralık Sevgili, kesinlikle eskort sitesi değildir. Alanya sosyal refakat ve etkinlik arkadaşlığı için doğru yerdesiniz.",
  keywords: [
    "Kiralık Sevgili",
    "Alanya sosyal arkadaşlık",
    "Alanya refakat",
    "sosyal arkadaş bulma",
    "Türkiye sosyal arkadaşlık",
    "Alanya etkinlik arkadaşı",
    "Alanya kiralık sevgili",
    "Alanya eskort sayfası değildir",
  ],
  authors: [{ name: "Kiralık Sevgili" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Kiralık Sevgili | Alanya & Türkiye Sosyal Arkadaşlık",
    description:
      "Alanya ve Türkiye genelinde sosyal arkadaşlık kur. Kiralık Sevgili bir eskort platformu değildir, sosyal etkinlik arkadaşlığı sunar.",
    type: "website",
    locale: "tr_TR",
    siteName: "Kiralık Sevgili",
  },
  alternates: {
    canonical: "https://www.kiraliksevgili.com/",
  },
  verification: {
    google: "iDPWL_1NDoz-Bi54EP-8DqDpxKNl2n81F_nP9F7wIDc",
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
