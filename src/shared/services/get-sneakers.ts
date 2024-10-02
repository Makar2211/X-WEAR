import qs from "qs";
export const getSneakersProducts = async (searchParams?: any) => {
  const queryString = qs.stringify(searchParams, {
    arrayFormat: "comma",
  });
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/sneakers?${queryString}`
  ).then((res) => res.json());
  return data;
};
