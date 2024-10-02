import { Color } from "@prisma/client";
import { IPropsCategory } from "../types";

interface IRerurnProps {
  colors: Color[];
}

export const getColors = async ({
  categoryItem,
}: IPropsCategory): Promise<IRerurnProps> => {
  const colors = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/filter/${categoryItem}/colors`
  ).then((res) => res.json());

  return {
    colors,
  };
};
