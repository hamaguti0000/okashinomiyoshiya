import type { Product } from "./data";

export type ProductCategorySlug = "wagashi" | "yogashi" | "cake";

export type ProductCategory = {
  slug: ProductCategorySlug;
  label: Product["category"];
  en: string;
  lead: string;
  description: string;
  image: string;
};

export const productCategories: ProductCategory[] = [
  {
    slug: "wagashi",
    label: "和菓子",
    en: "Wagashi",
    lead: "高来町で親しまれてきた、みよしやの定番。",
    description: "水まんじゅう、蜂蜜丸ぼうろ、栗どらなど、普段のおやつにも手みやげにも選びやすい和菓子です。",
    image: "/photos/water-manju.webp",
  },
  {
    slug: "yogashi",
    label: "洋菓子",
    en: "Western Sweets",
    lead: "長崎らしい縁起菓子や、季節の洋菓子。",
    description: "桃カステラをはじめ、お祝いごとや季節行事に合わせた洋菓子をご相談いただけます。",
    image: "/photos/shop.webp",
  },
  {
    slug: "cake",
    label: "ケーキ",
    en: "Cakes",
    lead: "誕生日、クリスマス、地域行事のケーキ予約。",
    description: "バースデーケーキや昔懐かしいバタークリームのケーキなど、大切な日のご注文をお電話で承ります。",
    image: "/photos/cake.webp",
  },
];

export function getCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getCategoryByLabel(label: string) {
  return productCategories.find((category) => category.label === label);
}
