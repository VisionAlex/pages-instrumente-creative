import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { motion } from "framer-motion";
import { Hero } from "~/components/Hero";
import { ProductsHighlights } from "~/components/ProductHighlights";
import { FadeIn } from "~/components/shared/FadeIn";
import { PAGE_HANDLE } from "~/config";
import type { GetArticlesQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { ArticlesSection } from "~/pages/index/ArticlesSection";
import { ResourcesSection } from "~/pages/index/ResourcesSection";
import { getArticles } from "~/providers/pages/articles";
import { getWishlist } from "~/providers/products/products";
import type { Product, RootContext } from "~/types";

type Articles = GetArticlesQuery["articles"]["edges"][number]["node"][];

type LoaderData = {
  wishlist: string[];
  resources: Articles;
  articles: Articles;
};

export const loader: LoaderFunction = async ({ request, context }) => {
  const wishlist = await getWishlist(request);
  const sdk = createSdk(context);
  const articleResponse = await getArticles(sdk, {
    first: 20,
  });
  let articles: Articles = [];
  let resources: Articles = [];
  articleResponse.articles.edges.forEach(({ node: article }) => {
    if (article.blog.handle === PAGE_HANDLE.BLOG_RESOURCES) {
      resources.push(article);
    } else {
      articles.push(article);
    }
  });
  return json({ wishlist, resources, articles: articles.slice(0, 3) });
};

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, resources, articles } = useLoaderData<LoaderData>();
  const { showNotification } = useOutletContext<RootContext>();
  const { products } = useOutletContext<{ products: Product[] }>();
  return (
    <FadeIn>
      <Hero />
      <ProductsHighlights
        wishlist={wishlist}
        products={products
          .filter((product) => product.availableForSale)
          .slice(0, 3)}
        showNotification={showNotification}
      />
      <Outlet />
      <ResourcesSection resources={resources} />
      <ArticlesSection articles={articles} />
      <section className="mx-auto mt-10 max-w-7xl px-5 lg:px-8 xl:px-20">
        <div className="flex h-96 w-full flex-col items-center justify-center bg-banner uppercase">
          <h5 className="mb-5 flex flex-col items-center gap-2 uppercase">
            <span className="text-sm font-light">Descoperă</span>
            <span className="text-[40px] font-bold">părerea</span>
            <span>clienților noștri</span>
          </h5>
          <motion.button
            className="flex h-11 items-center justify-center border border-primary px-4 transition-colors duration-500 hover:bg-primary hover:text-white"
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              navigate("/recenzii");
            }}
          >
            RECENZII
          </motion.button>
        </div>
      </section>
    </FadeIn>
  );
};

export default Index;
