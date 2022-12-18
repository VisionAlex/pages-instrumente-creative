import type { ActionFunction, HeadersFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import type { Cart, CartItem } from "~/providers/cart/cart";
import { storage } from "~/session.server";

export const headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const action = formData.get("_action");
  const redirectTo = (formData.get("redirectTo") || "/") as string;
  const variantID = formData.get("variantID") as string;
  const formQuantity = formData.get("quantity") as string | null;
  const cart = JSON.parse(session.get("cart") || "[]") as Cart;
  const quantity = formQuantity ? parseInt(formQuantity) : 1;

  let newCart = cart;
  switch (action) {
    case "add": {
      const foundItem = cart.find((item) => item.variantId === variantID);
      if (foundItem) {
        newCart = cart.map((item) => {
          if (item.variantId === variantID) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      } else {
        newCart = [...cart, { variantId: variantID, quantity: 1 }];
      }
      break;
    }
    case "remove": {
      newCart = cart.reduce((result: CartItem[], item) => {
        if (item.variantId === variantID) {
          if (item.quantity > 1) {
            return [...result, { ...item, quantity: item.quantity - 1 }];
          }
          return result;
        }
        return [...result, item];
      }, []);
      break;
    }
    case "removeAll": {
      newCart = cart.filter((item) => item.variantId !== variantID);
      break;
    }
    default: {
      newCart = cart;
    }
  }
  session.set("cart", JSON.stringify(newCart));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};
