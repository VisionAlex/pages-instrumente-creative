import type { Cart } from "~/providers/cart/cart";

export const getCartSize = (cart: Cart) =>
  cart.reduce((quantity, item) => quantity + item.quantity, 0);
