"use client";
import { useFilter } from "../../hooks";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import qs from "qs";
import {
  Brands,
  CategoryFilter,
  Colors,
  FilterPrice,
  Models,
  Sizes,
  ResetButton,
} from "../elements/filterItems";
import { IPropsFilterItems } from "../../services/get-all-filters";
import { createSoryByStore } from "../../store";
import { cn } from "../../lib/utils";
import { useMedia } from "react-use";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronDown, X } from "lucide-react";

export const Filter: React.FC<IPropsFilterItems> = ({
  category,
  brands,
  size,
  models,
  colors,
  className,
}) => {
  const router = useRouter();
  const isMedia768 = useMedia("(max-width: 768px)");

  const [isMounted, setIsMounted] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const {
    price,
    filterSizes,
    filterColors,
    filterBrands,
    filterModels,
    filterCategory,
    toggleColors,
    setPrice,
    onChangePrice,
    toggleSizes,
    toggleBrands,
    toggleModels,
    toggleCategody,
    resetAllFilters,
  } = useFilter();

  const { filterSortBy } = createSoryByStore((state) => state);

  useEffect(() => {
    if (isMounted) {
      const filter = {
        ...price,
        sortBy: filterSortBy,
        category: Array.from(filterCategory),
        brands: Array.from(filterBrands),
        models: Array.from(filterModels),
        sizes: Array.from(filterSizes),
        colors: Array.from(filterColors),
      };

      const queryString = qs.stringify(filter, {
        arrayFormat: "comma",
      });

      router.push(`?${queryString}`, {
        scroll: false,
      });
    }
    setIsMounted(true);
  }, [
    price,
    filterSizes,
    filterColors,
    filterBrands,
    filterModels,
    filterCategory,
    filterSortBy,
    isMounted,
    router,
  ]);

  return (
    <>
      {isClient ? (
        <div className={cn("relative", !isMedia768 && className)}>
          {isMedia768 ? (
            <div className="flex items-start justify-between gap-2">
              <CategoryFilter
                className="w-[50%]"
                values={filterCategory}
                category={category}
                onClickCategory={toggleCategody}
              />

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    className="flex items-center justify-between relative w-[50%] border border-[#E6E7EB] rounded-[6px]  py-4 text-[14px] text-black font-black h-[70px] "
                    variant="outline"
                  >
                    <span>ФИЛЬТРЫ</span>
                    <ChevronDown className="" size={16} />
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0 border-0 bg-white overflow-scroll">
                  <SheetClose asChild>
                    <X className="cursor-pointer h-6 w-6 absolute right-[4px] top-2 color-red" />
                  </SheetClose>

                  <div className="flex flex-col  px-3 mt-5">
                    <FilterPrice
                      values={price}
                      onChangePrice={onChangePrice}
                      setPrice={setPrice}
                    />
                    <Sizes
                      values={filterSizes}
                      size={size}
                      onClickCheckbox={toggleSizes}
                    />
                    <Brands
                      values={filterBrands}
                      brands={brands}
                      onClickCheckbox={toggleBrands}
                    />
                    <Models
                      values={filterModels}
                      models={models}
                      onClickCheckbox={toggleModels}
                    />
                    <Colors
                      values={filterColors}
                      colors={colors}
                      onClickCheckbox={toggleColors}
                    />
                    <ResetButton resetAllFilters={resetAllFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <>
              <CategoryFilter
                values={filterCategory}
                category={category}
                onClickCategory={toggleCategody}
              />
              <FilterPrice
                values={price}
                onChangePrice={onChangePrice}
                setPrice={setPrice}
              />
              <Sizes
                values={filterSizes}
                size={size}
                onClickCheckbox={toggleSizes}
              />
              <Brands
                values={filterBrands}
                brands={brands}
                onClickCheckbox={toggleBrands}
              />
              <Models
                values={filterModels}
                models={models}
                onClickCheckbox={toggleModels}
              />
              <Colors
                values={filterColors}
                colors={colors}
                onClickCheckbox={toggleColors}
              />
              <ResetButton resetAllFilters={resetAllFilters} />
            </>
          )}
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};
