"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSet } from "react-use";
import { createSoryByStore } from "../store";

export interface IPriceProps {
  priceFrom?: string;
  priceTo?: string;
}

export const useFilter = () => {
  const searchParams = useSearchParams();
  const { resetSortBy } = createSoryByStore((state) => state);
  const [price, setPrice] = useState<IPriceProps>({
    priceFrom: searchParams.get("priceFrom") || undefined,
    priceTo: searchParams.get("priceTo") || undefined,
  });

  const [filterCategory, { toggle: toggleCategody, reset: resetCategory }] =
    useSet(
      new Set(
        searchParams.get("category")
          ? searchParams.get("category")?.split(",")
          : []
      )
    );

  const [filterSizes, { toggle: toggleSizes, reset: resetSizes }] = useSet(
    new Set(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );
  const [filterModels, { toggle: toggleModels, reset: resetModels }] = useSet(
    new Set(
      searchParams.get("models") ? searchParams.get("models")?.split(",") : []
    )
  );
  const [filterBrands, { toggle: toggleBrands, reset: resetBrands }] = useSet(
    new Set(
      searchParams.get("brans") ? searchParams.get("brans")?.split(",") : []
    )
  );

  const [filterColors, { toggle: toggleColors, reset: resetColors }] = useSet(
    new Set(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );
  const onChangePrice = (name: keyof IPriceProps, value: number) => {
    setPrice({
      ...price,
      [name]: value,
    });
  };

  const resetAllFilters = () => {
    setPrice({ priceFrom: undefined, priceTo: undefined });
    resetCategory();
    resetBrands();
    resetModels();
    resetSizes();
    resetColors();
    resetSortBy();
  };
  return {
    price,
    filterSizes,
    filterColors,
    filterBrands,
    filterModels,
    filterCategory,
    resetSortBy,
    toggleColors,
    setPrice,
    toggleSizes,
    onChangePrice,
    toggleBrands,
    toggleModels,
    toggleCategody,
    resetAllFilters,
  };
};
