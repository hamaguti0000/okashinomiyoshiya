import HeroSection       from "@/components/HeroSection";
import AboutSection      from "@/components/AboutSection";
import BusinessCalendarSection from "@/components/BusinessCalendarSection";
import PhotoLightbox    from "@/components/PhotoLightbox";
import ProductsSection   from "@/components/ProductsSection";
import ProductStoriesSection from "@/components/ProductStoriesSection";
import WaterSection      from "@/components/WaterSection";
import CommunitySection  from "@/components/CommunitySection";
import NewsSection       from "@/components/NewsSection";
import AccessSection     from "@/components/AccessSection";
import { getActiveSitePhotos, getHeroPhotos, getPublishedNews, getPublishedProducts, getSpecialDays } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, newsItems, sitePhotos, heroPhotos, specialDays] = await Promise.all([
    getPublishedProducts(),
    getPublishedNews(),
    getActiveSitePhotos(),
    getHeroPhotos(),
    getSpecialDays(),
  ]);

  return (
    <main>
      <HeroSection photos={heroPhotos} />
      <BusinessCalendarSection specialDays={specialDays} />
      <AboutSection />
      <PhotoLightbox sitePhotos={sitePhotos} />
      <ProductsSection products={products} />
      <ProductStoriesSection />
      <WaterSection />
      <CommunitySection />
      <NewsSection newsItems={newsItems} />
      <AccessSection exteriorPhoto={sitePhotos[0]} />
    </main>
  );
}
