import qs from "qs";
export const getClothesProducts = async (searchParams?: any) => {
    try {
        const queryString = qs.stringify(searchParams, {
            arrayFormat: "comma",
        });
        const data = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/clothes?${queryString}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => res.json());
        return data;
    } catch (error) {
        console.error(error, "При получении обуви произошла ошибка");
    }
};
