import type { CartItem } from "~/routes/cart";
import { storage } from "~/session.server";

export async function getCart(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const cart = JSON.parse(session.get("cart") || "[]") as CartItem[];
  return cart;
}
