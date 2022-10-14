import { LinkButton } from "../shared/LinkButton";
import { Drawer } from "../shared/Drawer";
import type { Cart } from "~/providers/cart/cart";
import type { Products, VariantInfo, Variants } from "~/types";
import { useMemo } from "react";
import { getCartSize } from "./utils";
import { CartItem } from "./CartItem";
import { Form, useLocation } from "@remix-run/react";
import { ButtonBase } from "../shared/ButtonBase";

interface Props {
  cart: Cart;
  products: Products;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShoppingCart: React.FC<Props> = ({
  cart,
  products,
  showCart,
  setShowCart,
}) => {
  const location = useLocation();
  const cartSize = useMemo(() => getCartSize(cart), [cart]);
  const cartInfo = useMemo(() => {
    return getCartInfo(cart, products);
  }, [cart, products]);

  return (
    <Drawer
      title={`Coșul Tău (${cartSize})`}
      open={showCart}
      onClose={() => setShowCart(false)}
    >
      <div className="mt-10 px-6">
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cartSize === 0 ? (
              <div>Coșul tău este momentan gol.</div>
            ) : (
              cartInfo.cartItems.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    cartItem={item}
                    setShowCart={setShowCart}
                  />
                );
              })
            )}
          </ul>
        </div>
      </div>
      <div>
        {cartSize > 0 && (
          <div className="py-6 px-6">
            <div className="flex justify-between text-base  text-primary">
              <p>Transport</p>
              <p className="text-lg text-subtitle">
                {cartInfo.cartTotal > 193 ? "GRATUIT" : "19 lei"}
              </p>
            </div>
            <div className="flex justify-between text-base  text-primary">
              <p>Total</p>
              <p className="text-lg text-subtitle">
                {cartInfo.cartTotal > 193
                  ? cartInfo.cartTotal
                  : cartInfo.cartTotal + 19}{" "}
                lei
              </p>
            </div>
            <div className="mt-6">
              <Form method="post" action="/checkout">
                <input
                  type="hidden"
                  name="redirectTo"
                  value={location.pathname}
                />
                <button type="submit" className="w-full">
                  <ButtonBase
                    text="Finalizează Comanda"
                    variant="dark"
                    className="mb-3 cursor-pointer select-none lg:text-lg"
                  />
                </button>
              </Form>
              <LinkButton
                to="#"
                text="Vezi Coșul de cumpărături"
                variant="light"
                className="lg:text-lg"
              />
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export const getCartInfo = (cart: Cart, products: Products) => {
  const cartSize = getCartSize(cart);
  const cartItems = products.reduce((result: VariantInfo[], product) => {
    const productInCart = product.node.variants.edges.some((variant) => {
      return cart.some((item) => item.variantId === variant.node.id);
    });

    if (productInCart) {
      const variants: Variants = product.node.variants.edges.filter(
        (variant) => {
          return cart.some((item) => item.variantId === variant.node.id);
        }
      );
      let variantsWithInfo = [];
      for (const variant of variants) {
        variantsWithInfo.push({
          productID: product.node.id,
          title: product.node.title,
          handle: product.node.handle,
          thumbnail: product.node.thumbnail,
          quantity:
            cart.find((item) => item.variantId === variant.node.id)?.quantity ||
            0,
          ...variant.node,
        });
      }
      return [...result, ...variantsWithInfo];
    }
    return result;
  }, []);

  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseInt(item.priceV2.amount) * item.quantity;
  }, 0);

  return {
    cartTotal,
    cartSize,
    cartItems,
  };
};
