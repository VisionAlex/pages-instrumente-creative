import dotenv from "dotenv";
import type { CodegenConfig } from "@graphql-codegen/cli";

dotenv.config();

if (!process.env.SHOPIFY_STOREFRONT_URL)
  throw new Error("SHOPIFY_STOREFRONT_URL is not set");
if (!process.env.SHOPIFY_STOREFRONT_TOKEN)
  throw new Error("SHOPIFY_STOREFRONT_TOKEN is not set");

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.SHOPIFY_STOREFRONT_URL]: {
        headers: {
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_TOKEN,
        },
      },
    },
  ],
  documents: ["app/**/*.{ts,tsx}", "!app/generated/*"],
  generates: {
    "app/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
    },
    "app/generated/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
