import {
    PreviewSlider,
    ValueCalculate,
    About,
} from "../shared/components/elements";
import {SwiperSection} from "../shared/components/modules";
import {blog} from "../shared/constants";
import {
    getSneakersProducts, getSwiperClothesCategory,
    getSwiperSneakersCategory,
} from "../shared/services";

export const dynamic = "force-dynamic";
export default async function Home() {
    const sneakers = await getSwiperSneakersCategory();
    const clothes = await getSwiperClothesCategory()
    return (
        <main>
            <PreviewSlider/>
            <SwiperSection
                title="Обувь"
                url="sneakers"
                more="Больше товаров"
                items={sneakers}
            />
            <SwiperSection
                title="Одежда"
                url="clothes"
                more="Больше товаров"
                items={clothes}
                className='pb-10'
            />
            <ValueCalculate/>
            <About/>

            <SwiperSection
                items={blog}
                title="Наш блог"
                url="blog"
                more="Больше статей"
            />
        </main>
    );
}
