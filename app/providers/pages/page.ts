import gql from "graphql-tag";
import type { PageHandle } from "~/config";
import type { SDK } from "~/graphqlWrapper";

export const getPage = async (sdk: SDK, { handle }: { handle: PageHandle }) => {
  return sdk.getPage({ handle });
};

gql`
  query getPage($handle: String) {
    page(handle: $handle) {
      id
      body
      bodySummary
      handle
      seo {
        title
        description
      }
    }
  }
`;
