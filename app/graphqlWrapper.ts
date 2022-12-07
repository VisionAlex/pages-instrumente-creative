import type { DocumentNode } from "graphql";
import { print } from "graphql";
import { getSdk } from "~/generated/graphql";

// Necessary to get env variables from loader context in root
let API_URL = "";
let SHOPIFY_ACCESS_TOKEN = "";

export const setEnvs = (token: string, apiURL: string) => {
  SHOPIFY_ACCESS_TOKEN = token;
  API_URL = apiURL;
};

export interface GraphqlResponse<Response> {
  errors: any[];
  data: Response;
}

export interface QueryOptions {
  request: Request;
}
async function sendQuery<Response, Variables = {}>(options: {
  query: string;
  variables?: Variables;
  headers?: Headers;
  request?: Request;
}): Promise<GraphqlResponse<Response> & { headers: Headers }> {
  const headers = new Headers(options.headers);
  headers.append("Content-Type", "application/json");
  headers.append("X-Shopify-Storefront-Access-Token", SHOPIFY_ACCESS_TOKEN);

  return fetch(API_URL, {
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

export const sdk = getSdk<QueryOptions, unknown>(requester);
