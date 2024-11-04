import React from 'react';
import {CartDTO, IProductsCart} from "@/shared/types";
import Image from "next/image";


interface IPropCheckoutEmail {
    cart: CartDTO
}
export const CheckoutTeamplate: React.FC<IPropCheckoutEmail> = ({cart}) => {
    return (
        <div>
            <p>Ваши товары:</p>
            <ul>
                {
                    cart.items.map((item: IProductsCart) => (
                        <li className='flex justify-between items-center' key={item.product.id}>
                            <span className='w-[100px] h-[100px]'><Image width={100} height={100} src={item.product.imageUrl[0]} alt={item.product.name}/></span>

                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
