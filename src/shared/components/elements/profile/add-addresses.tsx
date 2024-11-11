"use client"
import React from 'react';
import {CustomForm} from "@/shared/components/modules";
import {useAddress} from "@/shared/hooks";

export const AddAddresses = () => {
    const {onSubmitAddress, handleSubmitAddress, registerAddress, setValueAddress, errorsAddress} = useAddress()
    return (
        <div>
            <h3 className="text-[22px] font-semibold mb-3">Добавить адресс</h3>
            <CustomForm isCheckoutPage={false} onSubmit={onSubmitAddress} handleSubmit={handleSubmitAddress}
                        register={registerAddress} setValue={setValueAddress} error={errorsAddress} className='w-full'/>
        </div>
    );
};
