import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { ShouldReloadFunction } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import { useMemo, useState } from "react";
import AccountModal from "./components/AccountModal";
import { Footer } from "./components/Footer";
import { FooterMenu } from "./components/FooterMenu";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { Notifications } from "./components/shared/Notification/Notifications";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";
import { getCartSize } from "./components/ShoppingCart/utils";
import { Toolbar } from "./components/Toolbar";
import { Wishlist } from "./components/Wishlist";
import type { GetUserQuery } from "./generated/graphql";
import { createSdk } from "./graphqlWrapper";
import type { Cart } from "./providers/cart/cart";
import { getCart } from "./providers/cart/cart";
import { getUser } from "./providers/customers/customers";
import { getProducts, getWishlist } from "./providers/products/products";
import styles from "./styles/app.css";
import type { Product } from "./types";

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
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap",
    },
  ];
};

type LoaderData = {
  user: GetUserQuery | null;
  wishlist: string[];
  cart: Cart;
  products: Product[];
};

export const loader: LoaderFunction = async ({ request, context }) => {
  const sdk = createSdk(context);
  const user = await getUser(request, sdk);
  const productsQuery = await getProducts(sdk, { first: 20 });
  const products = productsQuery.products.edges.map((edge) => edge.node);
  const wishlist = await getWishlist(request);
  const cart = await getCart(request);

  const loaderData: LoaderData = {
    user,
    cart,
    wishlist: wishlist,
    products: products,
  };
  return json(loaderData);
};

export default function App() {
  const { user, wishlist, products, cart } = useLoaderData<LoaderData>();

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const cartSize = useMemo(() => getCartSize(cart), [cart]);
  return (
    <html lang="ro">
      <head>
        <Meta />
        <Links />
      </head>
      <body className=" text-primary">
        <ShoppingCart
          cart={cart}
          products={products}
          showCart={showCart}
          setShowCart={setShowCart}
        />
        <Wishlist
          products={products}
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
            <Outlet
              context={{
                products,
                user,
                showNotification: () => setShowNotification(true),
              }}
            />
          </main>
          <Notifications
            show={showNotification}
            setShow={setShowNotification}
          />
          <Footer user={user} />
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
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "77bcf41a90f346a78f402cd5a9cda9e7"}'
        ></script>
      </body>
    </html>
  );
}

export const unstable_ShouldReload: ShouldReloadFunction = ({ prevUrl }) => {
  if (prevUrl.pathname === "/wishlist") return true;
  if (prevUrl.pathname.includes("account")) return true;
  if (prevUrl.pathname.includes("cart")) return true;
  return false;
};

export function CatchBoundary() {
  const caught = useCatch();
  console.error("CatchBoundary", caught);
  if (caught.status === 404) {
    return (
      <html lang="ro">
        <head>
          <title>Oh nu...</title>
          <Links />
        </head>
        <body className="flex h-screen w-screen flex-col items-center justify-center gap-4">
          <Logo />
          <h1>Oops!</h1>
          <p>Pagina nu exista pe Instrumente Creative</p>
          <Scripts />
        </body>
      </html>
    );
  }
  throw new Error("Unhandled error");
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log(error);
  return (
    <html lang="ro">
      <head>
        <Meta />
        <title>Uh-Oh!</title>
        <Links />
      </head>

      <body className="flex h-screen w-screen flex-col items-center justify-center gap-4 rounded-md">
        <div className=" bg-red-100 p-4">
          <h1 className="mb-4 text-center text-xl text-red-700">
            Eroare de aplicatie!
          </h1>
          <pre>{error}</pre>
        </div>
      </body>
    </html>
  );
}
