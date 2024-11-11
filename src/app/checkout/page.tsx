"use client"
import { Metadata } from "next";
import { Container } from "@/shared/components/elements";
import { CustomForm } from "@/shared/components/modules";
import {useCheckout} from "@/shared/hooks";

// export const metadata: Metadata = {
//   title: "X-WEAR | Оформление заказа",
// };

export default  function Checkout() {
    const {
        handleSubmitCheckout,
        onSubmitCheckout,
        registerCheckout,
        setValueCheckout,
        errorsCheckout,
        handleCheckbox,
        checkbox,
        items,
        totalAmount,
    } = useCheckout();
  return (
    <Container className="mt-10 mb-10 px-5 max-sm:px-2">
      <h2 className="text-3xl font-black text-[#121214] uppercase max-sm:text-2xl">
        Оформление заказа
      </h2>

      <CustomForm isCheckoutPage={true} handleSubmit={handleSubmitCheckout} onSubmit={onSubmitCheckout} register={registerCheckout} setValue={setValueCheckout} error={errorsCheckout} handleCheckbox={handleCheckbox} checkbox={checkbox} items={items} totalAmount={totalAmount}/>
    </Container>
  );
}
