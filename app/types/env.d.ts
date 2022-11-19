declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SHOPIFY_STOREFRONT_TOKEN: string;
      SHOPIFY_STOREFRONT_URL: string;
      SHOPIFY_ADMIN_URL: string;
      SHOPIFY_ADMIN_TOKEN: string;
    }
  }
}

export {}
