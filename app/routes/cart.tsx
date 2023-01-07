import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import type {
  ActionFunction,
  HeadersFunction,
  LoaderFunction,
} from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import {
  Form,
  Link,
  useLoaderData,
  useLocation,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import { useMemo } from "react";
import { SImage } from "~/components/shared/image/SImage";
import { Spinner } from "~/components/shared/Spinner";
import { getCartInfo } from "~/components/ShoppingCart/utils";
import { config } from "~/config";
import type { Cart, CartItem } from "~/providers/cart/cart";
import { storage } from "~/session.server";
import { classNames } from "~/shared/utils/classNames";
import type { RootContext } from "~/types";

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
        newCart = [...cart, { variantId: variantID, quantity }];
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

export const loader: LoaderFunction = async ({ request }) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const cart = JSON.parse(session.get("cart") || "[]") as Cart;

  return json({
    cart,
  });
};

type LoaderData = ReturnType<typeof loader>;

const CartPage: React.FC = () => {
  const location = useLocation();
  const { cart } = useLoaderData<LoaderData>();
  const { products } = useOutletContext<RootContext>();
  const { cartItems, cartTotal } = useMemo(() => {
    return getCartInfo(cart, products);
  }, [cart, products]);
  const minimumOrder = config.cart.minimumValueForFreeTransport;
  const transport = config.cart.transport;
  const transition = useTransition();
  const isSubmitting =
    transition.submission?.formData.get("formName") === "checkout" &&
    transition.state === "submitting";

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 xl:px-20">
      <h1 className="mb-12 mt-8 text-center text-3xl">Coșul tău</h1>
      <ul className="divide-y divide-secondaryBackground border-t border-b border-secondaryBackground">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id} className="flex py-6 sm:py-10">
              <div className="flex-shrink-0">
                <SImage
                  image={item.thumbnail}
                  width={256}
                  className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                />
              </div>
              <div className="relative ml-5 flex flex-1 flex-col justify-between sm:ml-8">
                <div>
                  <div className="flex justify-between sm:grid sm:grid-cols-2">
                    <div className="pr-5">
                      <h3>
                        <Link
                          to={`/produse/${item.handle}`}
                          className="font-medium text-primary hover:text-gray-700"
                        >
                          {item.productTitle}
                        </Link>
                      </h3>
                      {item.title !== "Default Title" ? (
                        <p className="mt-1 text-sm text-subtitle">
                          {item.title}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-right text-lg  font-medium">
                      {parseInt(item.price.amount) * item.quantity} lei
                    </p>
                  </div>
                  <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
                    <div className="flex items-center justify-between gap-4 border border-secondaryBackground p-2">
                      <Form method="post" action="/cart">
                        <input type="hidden" name="variantID" value={item.id} />
                        <input type="hidden" name="_action" value="remove" />
                        <input
                          type="hidden"
                          name="redirectTo"
                          value={location.pathname}
                        />
                        <button
                          disabled={!item.availableForSale}
                          className="flex items-center justify-center"
                        >
                          <MinusSmIcon
                            strokeWidth={1.5}
                            className="h-5 w-5 text-subtitle"
                          />
                        </button>
                      </Form>
                      <div>{item.quantity}</div>
                      <Form method="post" action="/cart">
                        <input type="hidden" name="variantID" value={item.id} />
                        <input type="hidden" name="_action" value="add" />
                        <input
                          type="hidden"
                          name="redirectTo"
                          value={location.pathname}
                        />
                        <button
                          disabled={!item.availableForSale}
                          className="flex items-center justify-center"
                        >
                          <PlusSmIcon
                            strokeWidth={1.5}
                            className="h-5 w-5 text-subtitle"
                          />
                        </button>
                      </Form>
                    </div>
                    <Form method="post" action="/cart">
                      <input type="hidden" name="variantID" value={item.id} />
                      <input type="hidden" name="_action" value="removeAll" />
                      <input
                        type="hidden"
                        name="redirectTo"
                        value={location.pathname}
                      />
                      <button className="ml-4 text-sm text-subtitle hover:text-primary sm:ml-0 sm:mt-3">
                        Șterge
                      </button>
                    </Form>
                  </div>
                </div>
                <p className="mt-4 flex space-x-2 text-sm text-primary">
                  {item.availableForSale ? "În stoc" : "Indisponibil"}
                </p>
              </div>
            </li>
          ))
        ) : (
          <div className="p-4 text-center">Coșul este gol</div>
        )}
      </ul>
      <section
        aria-labelledby="summary-heading"
        className="mt-10 ml-auto flex flex-col border border-secondaryBackground md:w-1/2"
      >
        <h3 className="border-b border-secondaryBackground p-2 text-center text-lg">
          Total
        </h3>
        <div className="flex justify-between p-4">
          <p className="text-subtitle">Subtotal</p>
          <p className="text-subtitle">{cartTotal} lei</p>
        </div>
        <div className="flex justify-between p-4">
          <p className="text-subtitle">Transport estimat</p>
          <p className="text-subtitle">
            {cartTotal < minimumOrder ? `${transport} lei` : "GRATUIT"}{" "}
          </p>
        </div>
        <div className="flex justify-between border-t border-secondaryBackground p-4">
          <p className="">Total</p>
          <p>
            {cartTotal > minimumOrder ? cartTotal : cartTotal + transport} lei
          </p>
        </div>
        <Form method="post" action="/checkout">
          <input type="hidden" name="formName" value="checkout" />
          <input type="hidden" name="redirectTo" value={location.pathname} />
          <button
            disabled={cartItems.length < 1}
            type="submit"
            className={classNames(
              "relative z-0 flex w-full cursor-pointer select-none items-center justify-center overflow-visible border border-primary bg-primary py-4 uppercase text-white transition-colors duration-150 before:absolute before:inset-0 before:-z-10 before:w-0 before:origin-[0%_50%] before:transition-all before:duration-400 enabled:hover:bg-transparent enabled:hover:text-primary enabled:hover:before:w-full enabled:hover:before:bg-white disabled:pointer-events-none lg:text-lg",
              cartItems.length < 1 ? "bg-subtitle" : "",
              isSubmitting ? "pointer-events-none cursor-wait" : ""
            )}
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
      </section>
    </div>
  );
};

export default CartPage;
