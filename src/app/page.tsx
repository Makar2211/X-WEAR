import {
  PreviewSlider,
  ValueCalculate,
  About,
} from "@/shared/components/elements";
import { SwiperSection } from "@/shared/components/modules";
import { blog } from "@/shared/constants";
import { getSwiperSneakersCategory } from "@/shared/services";

export default async function Home() {
  const sneakers = await getSwiperSneakersCategory();
  return (
    <main>
      <PreviewSlider />
      <SwiperSection
        title="Обувь"
        url="sneakers"
        more="Больше товаров"
        items={sneakers}
      />
      <ValueCalculate />
      <About />

      <SwiperSection
        items={blog}
        title="Наш блог"
        url="blog"
        more="Больше статей"
      />
    </main>
  );
}
