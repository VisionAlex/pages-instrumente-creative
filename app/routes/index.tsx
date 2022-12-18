import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { Hero } from "~/components/Hero";
import { ProductsHighlights } from "~/components/ProductHighlights";
import { FadeIn } from "~/components/shared/FadeIn";
import { PAGE_HANDLE } from "~/config";
import type { GetArticlesQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { ArticlesSection } from "~/pages/index/ArticlesSection";
import { ResourcesSection } from "~/pages/index/ResourcesSection";
import { ReviewsSection } from "~/pages/index/ReviewsSection";
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
      <ReviewsSection />
    </FadeIn>
  );
};

export default Index;
