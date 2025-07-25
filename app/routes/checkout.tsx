import type { ActionFunction, HeadersFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { createSdk } from "~/graphqlWrapper";
import { getCart } from "~/providers/cart/cart";
import { createCartWithCheckout } from "~/providers/checkout/cart-checkout";

export const headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};

export const action: ActionFunction = async ({ request, context }) => {
  const sdk = createSdk(context);

  const formData = await request.formData();
  const variantId = formData.get("variantId") as string;
  const quantity = formData.get("quantity") as string;

  const redirectTo = (formData.get("redirectTo") || "/") as string;
  const lineItems = variantId
    ? [{ merchandiseId: variantId, quantity: parseInt(quantity) ?? 1 }]
    : (await getCart(request)).map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }));

  const { errors, checkoutUrl } = await createCartWithCheckout(sdk, {
    request,
    lineItems,
  });
  console.log({ errors, checkoutUrl });
  if (checkoutUrl) {
    const realCheckoutUrl = checkoutUrl.replace(
      "instrumentecreative.myshopify.com",
      "shop.instrumente-creative.ro"
    );
    return redirect(realCheckoutUrl);
  }
  return redirect(redirectTo);
};
