import { Metadata } from "next";
import { CatalogHeader, Container } from "../../shared/components/elements";
import { CatalogItems, Filter } from "../../shared/components/modules";
import { getAllFilters, getSneakersProducts } from "../../shared/services";

export const metadata: Metadata = {
  title: "X-WEAR | Обувь",
  description: "Современная обувь с наилучшими ценами",
};
export const dynamic = "force-dynamic";
export default async function Sneakers({
  searchParams,
}: {
  searchParams: any;
}) {
  const products = await getSneakersProducts(searchParams);

  if (!products) {
    return <div>Products not found</div>;
  }

  const { category, brands, models, size, colors } = await getAllFilters({
    categoryItem: "sneakers",
  });

  return (
    <Container className="mt-10 mb-6 ">
      <div className="flex gap-5 max-[1450px]:mx-10 max-sm:mx-2 max-md:flex-col">
        {/* часть фильтрации */}
        <CatalogHeader
          title="обувь"
          className="hidden max-md:flex"
          products={products}
        />
          <Filter
            className="w-[320px]"
            category={category}
            brands={brands}
            models={models}
            size={size}
            colors={colors}
          />
        {/* часть товаров */}
        <CatalogItems products={products} title="обувь" />
      </div>
    </Container>
  );
}
