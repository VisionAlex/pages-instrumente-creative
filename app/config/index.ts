export const PAGE_HANDLE = {
  PRODUCTS: "produse",
  BLOG: "blog",
  CONTACT: "contact",
  ABOUT: "despre-noi",
  PRIVACY_POLICY: "politica-de-confidențialitate",
  CUSTOMER_SERVICE: "intrebari-frecvente",
} as const;
export type PageHandle = typeof PAGE_HANDLE[keyof typeof PAGE_HANDLE];

type Config = {
  pages: {
    [key in PageHandle]: {
      name: string;
      path: string;
      type: "menu" | "other";
    };
  };
};

export const config: Config = {
  pages: {
    produse: {
      name: "Produse",
      path: "/produse",
      type: "menu",
    },
    blog: {
      name: "Blog",
      path: "/blog",
      type: "menu",
    },
    contact: {
      name: "Contact",
      path: "/contact",
      type: "menu",
    },
    "despre-noi": {
      name: "Despre noi",
      path: "/despre-noi",
      type: "menu",
    },
    "politica-de-confidențialitate": {
      name: "Politica de confidențialitate",
      path: "/politica-de-confidentialitate",
      type: "other",
    },
    "intrebari-frecvente": {
      name: "Serviciu clienți",
      path: "/serviciu-clienti",
      type: "other",
    },
  },
};
