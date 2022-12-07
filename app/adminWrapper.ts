import type { DocumentNode } from "graphql";
import { print } from "graphql";
import { getSdk } from "~/generated/admin/graphql";

let API_URL = "";
let SHOPIFY_ACCESS_TOKEN = "";

export const setAdminEnvs = (url: string, token: string) => {
  API_URL = url;
  SHOPIFY_ACCESS_TOKEN = token;
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
  headers.append("X-Shopify-Access-Token", SHOPIFY_ACCESS_TOKEN);

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

export const adminSdk = getSdk<QueryOptions, unknown>(requester);
