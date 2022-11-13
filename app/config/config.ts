export const PAGE_HANDLE = {
  PRODUCTS: "produse",
  CONTACT: "contact",
  REVIEWS: "recenzii",
  BLOG_CHILD_DEVELOPMENT: "dezvoltare-armonioasa-copii",
  BLOG_RESOURCES: "resurse-gratuite-copii",
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
  email: string;
};

export const config: Config = {
  pages: {
    produse: {
      name: "Produse",
      path: "/produse",
      type: "menu",
    },
    "dezvoltare-armonioasa-copii": {
      name: "Dezvoltarea copilului",
      path: "/produse/dezvoltare-armonioasa-copii",
      type: "menu",
    },
    "resurse-gratuite-copii": {
      name: "Resurse Gratuite",
      path: "/resurse-gratuite-copii",
      type: "menu",
    },
    recenzii: {
      name: "Recenzii",
      path: "/recenzii",
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
  email: "instrumentecreative@gmail.com",
};
