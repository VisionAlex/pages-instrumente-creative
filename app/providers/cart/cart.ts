import { storage } from "~/session.server";

export interface CartItem {
  id: string;
  quantity: number;
}

export type Cart = CartItem[];

export async function getCart(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const cart = JSON.parse(session.get("cart") || "[]") as Cart;
  return cart;
}
