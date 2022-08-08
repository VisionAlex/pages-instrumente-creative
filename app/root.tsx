import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import { Navbar, NAVBAR_HEIGHT } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toolbar } from "./components/Toolbar";
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

export default function App() {
  return (
    <html lang="ro">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar>
          <Logo />
          <Menu />
          <Toolbar />
        </Navbar>
        <ScrollToTop />
        <main className={`pt-[${NAVBAR_HEIGHT}px]`}>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
