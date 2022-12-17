import type { LoaderArgs } from "@remix-run/cloudflare";
import type { DocumentNode } from "graphql";
import { print } from "graphql";
import invariant from "tiny-invariant";
import { getSdk } from "~/generated/graphql";

export const createSdk = (context: LoaderArgs["context"]) => {
  invariant(
    typeof context.SHOPIFY_STOREFRONT_URL === "string" &&
      typeof context.SHOPIFY_STOREFRONT_TOKEN === "string",
    "Missing required env vars"
  );

  const { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } = context;

  async function sendQuery<Response, Variables = {}>(options: {
    query: string;
    variables?: Variables;
    headers?: Headers;
    request?: Request;
  }): Promise<GraphqlResponse<Response> & { headers: Headers }> {
    const headers = new Headers(options.headers);
    headers.append("Content-Type", "application/json");
    headers.append(
      "X-Shopify-Storefront-Access-Token",
      SHOPIFY_STOREFRONT_TOKEN
    );

    return fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      body: JSON.stringify(options),
      headers,
    }).then(async (res) => {
      return { ...(await res.json()), headers: res.headers };
    });
  }

  function requester<R, V>(
    doc: DocumentNode,
    vars?: V,
    options?: { headers?: Headers; request?: Request }
  ) {
    return sendQuery<R, V>({
      query: print(doc),
      variables: vars,
      ...options,
    }).then(async (response) => {
      if (response.errors) {
        console.log(response.errors[0]);
        throw new Error(response.errors[0].message);
      }

      return { ...response.data };
    });
  }

  return getSdk<QueryOptions, unknown>(requester);
};
export interface GraphqlResponse<Response> {
  errors: any[];
  data: Response;
}

export interface QueryOptions {
  request: Request;
}

export type SDK = ReturnType<typeof createSdk>;
