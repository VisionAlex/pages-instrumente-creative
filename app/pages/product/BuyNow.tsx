import { Form, useLocation, useTransition } from "@remix-run/react";
import React from "react";
import { Spinner } from "~/components/shared/Spinner";

interface Props {
  productId: string;
  quantity: number;
}

export const BuyNow: React.FC<Props> = ({ productId, quantity }) => {
  const transition = useTransition();
  const location = useLocation();

  const isCheckoutSubmitting =
    transition.submission?.formData.get("formName") === "checkout" &&
    transition.state === "submitting";

  return (
    <Form method="post" action="/checkout">
      <input type="hidden" name="redirectTo" value={location.pathname} />
      <input type="hidden" name="variantId" value={productId} />
      <input type="hidden" name="quantity" value={quantity} />
      <input type="hidden" name="formName" value="checkout" />
      <button
        disabled={isCheckoutSubmitting}
        className="flex h-[46px] w-full items-center justify-center border border-primary bg-primary py-3 text-sm uppercase tracking-widest text-white transition-all duration-300 enabled:hover:bg-white enabled:hover:text-primary disabled:pointer-events-none "
      >
        Cumpără acum{" "}
        {isCheckoutSubmitting && <Spinner className="ml-2 h-4 w-4" />}
      </button>
    </Form>
  );
};
