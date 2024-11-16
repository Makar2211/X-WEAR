import { CategoryProduct } from "@prisma/client";
import { IPropsCategory } from "../types";

interface IRerurnProps {
  category: CategoryProduct[];
}
export const dynamic = 'force-dynamic'
export const getCategory = async ({
  categoryItem,
}: IPropsCategory): Promise<IRerurnProps> => {
  const category = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/filter/${categoryItem}/category`,

  ).then((res) => res.json());

  return {
    category,
  };
};
