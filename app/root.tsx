import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import AccountModal from "./components/AccountModal";
import { Footer } from "./components/Footer";
import { FooterMenu } from "./components/FooterMenu";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { ShoppingCart } from "./components/ShoppingCart";
import { Toolbar } from "./components/Toolbar";
import { Wishlist } from "./components/Wishlist";
import type { GetProductsQuery, GetUserQuery } from "./generated/graphql";
import type { Cart } from "./providers/cart/cart";
import { getCart } from "./providers/cart/cart";
import { getUser } from "./providers/customers/customers";
import { getProducts } from "./providers/products/products";
import { getWishlist } from "./providers/products/products";
import styles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Editura Instrumente Creative",
  viewport: "width=device-width,initial-scale=1",
  description:
    "”Instrumente creative” este o editură care oferă părinților și specialiștilor diferite instrumente, jocuri, materiale și cărți pentru dezvoltarea vorbirii, imaginației, empatiei, stimei de sine, creativității și inteligenței copilului. Venim cu o gama de produse care stimulează cognitiv și emoțional fiecare copil.",
  keywords: "Instrumente Creative, www.instrumente-creative.ro",
});

export const links = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "//cdn.shopify.com/", crossOrigin: "true" },
  ];
};

export type Products = GetProductsQuery["products"]["edges"];

type LoaderData = {
  user: GetUserQuery | null;
  wishlist: string[];
  cart: Cart;
  products: Products;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const products = await getProducts(20);
  const wishlist = await getWishlist(request);
  const cart = await getCart(request);
  const loaderData: LoaderData = {
    user,
    cart,
    wishlist: wishlist,
    products: products.products.edges,
  };
  return loaderData;
};

export default function App() {
  const { user, wishlist, products, cart } = useLoaderData<LoaderData>();

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const cartSize = getCartSize(cart);
  return (
    <html lang="ro">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="text-primary">
        <ShoppingCart showCart={showCart} setShowCart={setShowCart} />
        <Wishlist
          products={products as Products}
          wishlist={wishlist}
          showWishlist={showWishlist}
          setShowWishlist={setShowWishlist}
        />
        <AccountModal
          open={showAccountModal}
          onClose={() => setShowAccountModal(false)}
        />
        <Navbar>
          <Logo />
          <Menu />
          <Toolbar
            user={user}
            cartSize={cartSize}
            wishlistSize={wishlist.length}
            setShowCart={setShowCart}
            setShowWishlist={setShowWishlist}
            setShowAccountModal={setShowAccountModal}
          />
        </Navbar>
        <ScrollToTop />
        <div className={`pt-[123px] pb-[50px] lg:pb-0`}>
          <main>
            <Outlet context={{ wishlist, products }} />
          </main>
          <Footer />
        </div>
        <FooterMenu
          cartSize={cartSize}
          wishlistSize={wishlist.length}
          setShowCart={setShowCart}
          setShowWishlist={setShowWishlist}
          setShowAccountModal={setShowAccountModal}
          user={user}
        />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const getCartSize = (cart: Cart) =>
  cart.reduce((quantity, item) => quantity + item.quantity, 0);
