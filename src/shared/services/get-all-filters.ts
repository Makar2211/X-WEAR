import { Brand, CategoryProduct, Color, Product, Size } from "@prisma/client";
import { getCategory } from "./get-category";
import { getSize } from "./get-size";
import { getBrands } from "./get-brands";
import { getModels } from "./get-models";
import { getColors } from "./get-colors";
import { IPropsCategory } from "../types";

export type IPropsFilterItems = {
  category: CategoryProduct[];
  size: Size[];
  brands: Brand[];
  models: Product[];
  colors: Color[];
  className?: string;
};

export const getAllFilters = async ({
  ...props
}: IPropsCategory): Promise<IPropsFilterItems> => {
  const { category } = await getCategory({
    categoryItem: props.categoryItem,
  });
  const { size } = await getSize({
    categoryItem: props.categoryItem,
  });
  const { brands } = await getBrands({
    categoryItem: props.categoryItem,
  });
  const { models } = await getModels({
    categoryItem: props.categoryItem,
  });

  const { colors } = await getColors({
    categoryItem: props.categoryItem,
  });
  return {
    category,
    size,
    colors,
    brands,
    models,
  };
};
