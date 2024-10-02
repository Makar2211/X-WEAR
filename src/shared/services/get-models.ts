import React from "react";
import { Product } from "@prisma/client";
import { IPropsCategory } from "../types";

interface IRerurnProps {
  models: Product[];
}

export const getModels = async ({
  categoryItem,
}: IPropsCategory): Promise<IRerurnProps> => {
  const models = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/filter/${categoryItem}/models`
  ).then((res) => res.json());

  return {
    models,
  };
};
