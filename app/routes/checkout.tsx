import type { ActionFunction, HeadersFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { checkoutWithWebUrl } from "~/providers/checkout/checkout";

export const headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};

export const action: ActionFunction = async ({ request }) => {
  const { errors, webUrl } = await checkoutWithWebUrl(request);
  console.log({ errors, webUrl });
  const formData = await request.formData();
  const redirectTo = (formData.get("redirectTo") || "/") as string;
  if (webUrl) {
    const realWebUrl = webUrl.replace(
      "instrumentecreative.myshopify.com",
      "instrumente-creative.ro"
    );
    return redirect(realWebUrl);
  }
  return redirect(redirectTo);
};
