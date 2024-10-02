import React from "react";
import { Brand } from "@prisma/client";
import { IPropsCategory } from "../types";

interface IRerurnProps {
  brands: Brand[];
}

export const getBrands = async ({
  categoryItem,
}: IPropsCategory): Promise<IRerurnProps> => {
  const brands = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/filter/${categoryItem}/brands`
  ).then((res) => res.json());

  return {
    brands,
  };
};
