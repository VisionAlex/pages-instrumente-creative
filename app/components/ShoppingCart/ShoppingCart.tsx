import { Form, useLocation, useTransition } from "@remix-run/react";
import { useMemo } from "react";
import { config } from "~/config";
import type { Cart } from "~/providers/cart/cart";
import type { Product } from "~/types";
import { Drawer } from "../shared/Drawer";
import { LinkButton } from "../shared/LinkButton";
import { Spinner } from "../shared/Spinner";
import { CartItem } from "./CartItem";
import { getCartInfo, getCartSize } from "./utils";

interface Props {
  cart: Cart;
  products: Product[];
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

  const minimumOrder = config.cart.minimumValueForFreeTransport;
  const transport = config.cart.transport;

  const transition = useTransition();
  const isSubmitting =
    transition.submission?.formData.get("formName") === "checkout" &&
    transition.state === "submitting";

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
              <p>
                Transport
                {cartInfo.cartTotal < minimumOrder && " estimat"}
              </p>
              <p className="text-lg text-subtitle">
                {cartInfo.cartTotal > minimumOrder
                  ? "GRATUIT"
                  : `${transport} lei`}
              </p>
            </div>
            <div className="flex justify-between text-base  text-primary">
              <p>Total</p>
              <p className="text-lg text-subtitle">
                {cartInfo.cartTotal > minimumOrder
                  ? cartInfo.cartTotal
                  : cartInfo.cartTotal + transport}{" "}
                lei
              </p>
            </div>
            <div className="mt-8">
              <Form method="post" action="/checkout">
                <input type="hidden" name="formName" value="checkout" />
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
                to="/cart"
                onClick={() => setShowCart(false)}
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
