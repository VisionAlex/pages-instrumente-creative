import type { ActionFunction, HeadersFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { getCart } from "~/providers/cart/cart";
import { checkoutWithWebUrl } from "~/providers/checkout/checkout";

export const headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const variantId = formData.get("variantId") as string;
  const quantity = formData.get("quantity") as string;

  const redirectTo = (formData.get("redirectTo") || "/") as string;
  const lineItems = variantId
    ? [{ variantId, quantity: parseInt(quantity) ?? 1 }]
    : await getCart(request);

  const { errors, webUrl } = await checkoutWithWebUrl(request, lineItems);
  console.log({ errors, webUrl });
  if (webUrl) {
    const realWebUrl = webUrl.replace(
      "instrumentecreative.myshopify.com",
      "www.instrumente-creative.ro"
    );
    return redirect(realWebUrl);
  }
  return redirect(redirectTo);
};
