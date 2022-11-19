import dotenv from "dotenv";
import type { CodegenConfig } from "@graphql-codegen/cli";

dotenv.config();

if (!process.env.SHOPIFY_STOREFRONT_URL)
  throw new Error("SHOPIFY_STOREFRONT_URL is not set");
if (!process.env.SHOPIFY_STOREFRONT_TOKEN)
  throw new Error("SHOPIFY_STOREFRONT_TOKEN is not set");
if (!process.env.SHOPIFY_ADMIN_URL)
  throw new Error("SHOPIFY_ADMIN_URL is not set");
if (!process.env.SHOPIFY_ADMIN_TOKEN)
  throw new Error("SHOPIFY_ADMIN_TOKEN is not set");

const storefrontSchema = {
  [process.env.SHOPIFY_STOREFRONT_URL]: {
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN,
      "content-type": "application/json",
    },
  },
};

const adminSchema = {
  [process.env.SHOPIFY_ADMIN_URL]: {
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN,
      "content-type": "application/json",
    },
  },
};

const scalars = {
  DateTime: "string",
  Decimal: "string",
  HTML: "string",
  URL: "string",
  Color: "string",
  JSON: "string",
  UnsignedInt64: "string",
};

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "app/generated/graphql.ts": {
      schema: storefrontSchema,
      documents: ["app/providers/**/*.{ts,tsx}", "!app/providers/admin/**/*"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
      config: {
        scalars,
      },
    },
    "app/generated/schema.graphql": {
      schema: storefrontSchema,
      plugins: ["schema-ast"],
    },
    "app/generated/admin/graphql.ts": {
      schema: adminSchema,
      documents: ["app/providers/admin/**/*.{ts,tsx}"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
      config: {
        scalars,
      },
    },
    "app/generated/admin/schema.graphql": {
      schema: adminSchema,
      plugins: ["schema-ast"],
    },
  },
};

export default config;
