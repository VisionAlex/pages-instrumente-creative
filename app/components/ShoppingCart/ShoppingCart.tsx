import { LinkButton } from "../shared/LinkButton";
import { Drawer } from "../shared/Drawer";
import type { Cart } from "~/providers/cart/cart";
import type { Products, VariantInfo, Variants } from "~/types";
import { useMemo } from "react";
import { getCartSize } from "./utils";
import { CartItem } from "./CartItem";
import { Form, useLocation, useTransition } from "@remix-run/react";
import { Spinner } from "../shared/Spinner";

const TRANSPORT = 10;
const MINIMUM_ORDER_FOR_FREE_TRANSPORT = 193;
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

  const transition = useTransition();
  console.log("transition state", transition.state);
  const isSubmitting = transition.state === "submitting";

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
                {cartInfo.cartTotal > MINIMUM_ORDER_FOR_FREE_TRANSPORT
                  ? "GRATUIT"
                  : `${TRANSPORT} lei`}
              </p>
            </div>
            <div className="flex justify-between text-base  text-primary">
              <p>Total</p>
              <p className="text-lg text-subtitle">
                {cartInfo.cartTotal > MINIMUM_ORDER_FOR_FREE_TRANSPORT
                  ? cartInfo.cartTotal
                  : cartInfo.cartTotal + TRANSPORT}{" "}
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
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="relative z-0 mb-3 flex w-full cursor-pointer select-none items-center justify-center overflow-visible border border-primary bg-primary py-4 text-white transition-colors duration-150 before:absolute before:inset-0 before:-z-10 before:w-0 before:origin-[0%_50%] before:transition-all before:duration-400 enabled:hover:bg-transparent enabled:hover:text-primary enabled:hover:before:w-full enabled:hover:before:bg-white disabled:pointer-events-none lg:text-lg"
                >
                  {isSubmitting ? (
                    <>
                      In curs de finalizare...
                      <Spinner className="ml-2" />
                    </>
                  ) : (
                    "Finalizează Comanda"
                  )}
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
    return total + parseInt(item.price.amount) * item.quantity;
  }, 0);

  return {
    cartTotal,
    cartSize,
    cartItems,
  };
};
