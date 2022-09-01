import type { ActionFunction, HeadersFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { storage } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const action = formData.get("_action");
  const redirectTo = (formData.get("redirectTo") || "/") as string;
  const productId = formData.get("productId") as string;
  const wishlist = JSON.parse(session.get("wishlist") || "[]") as string[];

  let newWishlist = wishlist;
  switch (action) {
    case "add": {
      const product = wishlist.find((id) => id === productId);
      if (!product) {
        newWishlist = [...wishlist, productId];
      } else {
        newWishlist = wishlist.filter((id) => id !== productId);
      }
      break;
    }
    case "remove": {
      newWishlist = wishlist.filter((id) => id !== productId);
      break;
    }
    default: {
      newWishlist = wishlist;
    }
  }
  session.set("wishlist", JSON.stringify(newWishlist));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export const headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};
