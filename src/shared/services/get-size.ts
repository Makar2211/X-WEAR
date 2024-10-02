import { Size } from "@prisma/client";
import { IPropsCategory } from "../types";

interface IRerurnProps {
  size: Size[];
}

export const getSize = async ({
  categoryItem,
}: IPropsCategory): Promise<IRerurnProps> => {
  const size = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/filter/${categoryItem}/size`
  ).then((res) => res.json());

  return {
    size,
  };
};
