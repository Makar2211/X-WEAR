import {useEffect, useState} from "react";
import {CategoryProduct} from "@prisma/client";
import {getAllFilters} from "@/shared/services";

interface IReturnUseHeaderCategory {
    sneakers: CategoryProduct[] | null
    clothes: CategoryProduct[] | null
}

export const useHeaderCategory = (): IReturnUseHeaderCategory => {
    const [sneakers, setSneakers] = useState<CategoryProduct[] | null>(null)
    const [clothes, setClothes] = useState<CategoryProduct[] | null>(null)
    useEffect(() => {
        (async() => {
            const { category: categorySneakers,  } = await getAllFilters({
                categoryItem: "sneakers",
            });
            const { category: categoryClothes,  } = await getAllFilters({
                categoryItem: "clothes",
            });
            setSneakers(categorySneakers)
            setClothes(categoryClothes)
        })()

    }, [])

    return {
        sneakers, clothes
    }
}