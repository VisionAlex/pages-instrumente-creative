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
  const cart = JSON.parse(session.get("cart") || "[]") as Cart;

  let newCart = cart;
  switch (action) {
    case "add": {
      const foundItem = cart.find((item) => item.id === variantID);
      if (foundItem) {
        newCart = cart.map((item) => {
          if (item.id === variantID) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        newCart = [...cart, { id: variantID, quantity: 1 }];
      }
      break;
    }
    case "remove": {
      newCart = cart.reduce((result: CartItem[], item) => {
        if (item.id === variantID) {
          if (item.quantity > 1) {
            return [...result, { ...item, quantity: item.quantity - 1 }];
          }
          return result;
        }
        return [...result, item];
      }, []);
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
