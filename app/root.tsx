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
import type { GetUserQuery } from "./generated/graphql";
import { getUser } from "./providers/customers/customers";
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

type LoaderData = {
  user: GetUserQuery | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const loaderData: LoaderData = { user };
  return loaderData;
};

export default function App() {
  const { user } = useLoaderData<LoaderData>();

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  return (
    <html lang="ro">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="text-primary">
        <ShoppingCart showCart={showCart} setShowCart={setShowCart} />
        <Wishlist
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
            setShowCart={setShowCart}
            setShowWishlist={setShowWishlist}
            setShowAccountModal={setShowAccountModal}
          />
        </Navbar>
        <ScrollToTop />
        <div className={`pt-[123px] pb-[50px] lg:pb-0`}>
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        <FooterMenu
          setShowCart={setShowCart}
          setShowWishlist={setShowWishlist}
          setShowAccountModal={setShowAccountModal}
        />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
