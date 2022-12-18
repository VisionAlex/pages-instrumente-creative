import gql from "graphql-tag";
import type { SDK } from "~/graphqlWrapper";

type GetArticlesOptions = {
  first: number;
  query?: string;
};

export const getArticles = (sdk: SDK, { first, query }: GetArticlesOptions) => {
  return sdk.getArticles({ first, query });
};

type GetBlogArticleOptions = {
  handle: string;
  articleHandle: string;
};

export const getBlogArticle = (
  sdk: SDK,
  { handle, articleHandle }: GetBlogArticleOptions
) => {
  if (!handle || !articleHandle) return undefined;
  return sdk.getBlogArticle({ handle, articleHandle });
};

gql`
  query getArticles(
    $first: Int
    $reverse: Boolean = true
    $sortKey: ArticleSortKeys = PUBLISHED_AT
    $query: String
  ) {
    articles(
      first: $first
      reverse: $reverse
      sortKey: $sortKey
      query: $query
    ) {
      edges {
        node {
          id
          publishedAt
          tags
          thumbnail: image {
            url(transform: { maxWidth: 210 })
          }
          small: image {
            url(transform: { maxWidth: 430 })
          }
          medium: image {
            url(transform: { maxWidth: 860 })
          }

          image {
            altText
            height
            width
            id
            url
          }
          blog {
            handle
          }
          handle
          title
          excerptHtml
        }
      }
    }
  }
`;

gql`
  query getBlogArticle($handle: String!, $articleHandle: String!) {
    blog(handle: $handle) {
      articleByHandle(handle: $articleHandle) {
        id
        publishedAt
        title
        seo {
          title
          description
        }
        authorV2 {
          name
        }
        image {
          url
          height
          width
          altText
        }
        contentHtml
        tags
      }
    }
  }
`;
