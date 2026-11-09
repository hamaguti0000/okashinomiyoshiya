import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PublicChrome from "@/components/PublicChrome";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://okashinomiyoshiya.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  title: {
    default: "お菓子のみよしや｜諫早市高来町の和洋菓子・ケーキ予約｜昭和10年創業",
    template: "%s｜お菓子のみよしや【諫早市高来町】",
  },
  description:
    "長崎県諫早市高来町で昭和10年（1935年）創業の手作り和洋菓子店。地下80mの天然水で作る水まんじゅう1,000円・蜂蜜丸ぼうろ70円・栗どら200円。バースデーケーキ・法事・お宮参りのご注文は0957-32-2372へ。湯江駅徒歩3分・駐車場5台。",
  keywords: [
    "お菓子のみよしや",
    "諫早市 お菓子屋",
    "高来町 ケーキ屋",
    "諫早市 和菓子",
    "諫早市 洋菓子",
    "諫早市 ケーキ 予約",
    "高来町 和菓子",
    "長崎 丸ぼうろ",
    "蜂蜜 丸ぼうろ",
    "水まんじゅう 諫早",
    "轟渓流 お土産",
    "高来町 手作り菓子",
    "桃カステラ 長崎",
    "諫早市 誕生日ケーキ",
    "諫早市 法事 お菓子",
    "高来町 お土産",
    "諫早市 お菓子 予約",
    "長崎 水まんじゅう",
    "諫早市 和洋菓子",
    "創業90年 お菓子",
    "湯江駅 お菓子",
    "国道207号 お菓子屋",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/`,
    locale: "ja_JP",
    siteName: "お菓子のみよしや",
    title: "お菓子のみよしや | 諫早市高来町の和洋菓子店",
    description:
      "昭和10年創業。水まんじゅう、蜂蜜丸ぼうろ、栗どら、桃カステラ、ケーキ予約などを承る高来町の和洋菓子店です。",
    images: [
      {
        url: "/photos/shop.webp",
        width: 810,
        height: 1080,
        alt: "お菓子のみよしや — 長崎県諫早市高来町の手作り和洋菓子店",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "お菓子のみよしや | 諫早市高来町の和洋菓子店",
    description: "昭和10年創業。水まんじゅう、蜂蜜丸ぼうろ、栗どら、ケーキ予約など。",
    images: ["/photos/shop.webp"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "お菓子のみよしや",
  alternateName: "みよしや",
  description:
    "長崎県諫早市高来町で昭和10年から営業している和洋菓子店です。水まんじゅう、蜂蜜丸ぼうろ、栗どら、桃カステラ、バースデーケーキ、祝事・法事のお菓子の予約を承ります。",
  url: BASE_URL,
  image: [
    `${BASE_URL}/photos/tv-exterior.webp`,
    `${BASE_URL}/photos/water-manju.webp`,
    `${BASE_URL}/photos/marubolo.webp`,
  ],
  telephone: "+81-957-32-2372",
  faxNumber: "+81-957-32-2572",
  foundingDate: "1935",
  address: {
    "@type": "PostalAddress",
    streetAddress: "高来町三部壱288-8",
    addressLocality: "諫早市",
    addressRegion: "長崎県",
    postalCode: "859-0132",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.8404,
    longitude: 130.2055,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "PublicHolidays"],
      opens: "09:00",
      closes: "16:30",
    },
  ],
  priceRange: "¥",
  servesCuisine: ["和菓子", "洋菓子", "ケーキ"],
  paymentAccepted: ["Cash", "Electronic money"],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "駐車場",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "バリアフリー対応",
      value: true,
    },
  ],
  hasMap: "https://maps.google.com/?q=お菓子のみよしや+長崎県諫早市高来町三部壱288-8",
  sameAs: ["https://ameblo.jp/okashinomiyoshiya/"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PublicChrome />
        {children}
        <Footer />
        <BackToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
