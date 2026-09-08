import CityClient from "./CityClient";
import { cities } from "../utils/cityData";
import { Metadata } from "next";
import { getCityBySlug } from "../utils/cityData";
import { absoluteUrl } from "@/lib/site";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const city = resolvedParams.city;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: "Sayfa Bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  const cityName = cityData.name;
  const title = cityData.seoTitle || `${cityName} Kiralık Sevgili | Sosyal Arkadaşlık`;
  const description = cityData.seoDescription || `${cityName}'da sosyal arkadaşlık ve etkinlik eşliği.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: absoluteUrl(`/${city}`),
    },
  };
}

// Statik derleme için tüm şehir listesini bildiriyoruz
export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <CityClient citySlug={resolvedParams.city} />;
}
