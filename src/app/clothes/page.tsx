import {Metadata} from "next";
import {getAllFilters, getClothesProducts, getSneakersProducts} from "@/shared/services";
import {CatalogHeader, Container} from "@/shared/components/elements";
import {Suspense} from "react";
import {CatalogItems, Filter} from "@/shared/components/modules";

export const metadata: Metadata = {
    title: "X-WEAR | Обежда",
    description: "Современная одежда с наилучшими ценами",
};
export const dynamic = "force-dynamic";
export default async function Clothes({
                                           searchParams,
                                       }: {
    searchParams: any;
}) {
    const products = await getClothesProducts(searchParams);

    if (!products) {
        return <div>Products not found</div>;
    }

    const { category, brands, models, size, colors } = await getAllFilters({
        categoryItem: "clothes",
    });

    return (
        <Container className="mt-10 mb-6">
            <div className="flex gap-5 max-[1450px]:mx-10 max-sm:mx-2 max-md:flex-col">
                {/* часть фильтрации */}
                <CatalogHeader
                    title="Одежда"
                    className="hidden max-md:flex"
                    products={products}
                />
                <Suspense fallback={<>Loading...</>}>
                    <Filter
                        className="w-[320px]"
                        category={category}
                        brands={brands}
                        models={models}
                        size={size}
                        colors={colors}
                    />
                </Suspense>
                {/* часть товаров */}
                <CatalogItems products={products} title="Одежда" />
            </div>
        </Container>
    );
}