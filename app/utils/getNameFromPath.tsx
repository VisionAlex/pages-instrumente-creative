export const getNameFromPath = (path: string) => {
  switch (path) {
    case "/contact":
      return "Contact";
    case "/produse":
      return "Produse";
    case "/blog":
      return "Blog";
    case "/despre-noi":
      return "Despre Noi";
  }
};
