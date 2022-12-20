import type { Cart } from "~/providers/cart/cart";
import type { Product, Variant, VariantInfo } from "~/types";

export const getCartSize = (cart: Cart) =>
  cart.reduce((quantity, item) => quantity + item.quantity, 0);

export const getCartInfo = (cart: Cart, products: Product[]) => {
  const cartSize = getCartSize(cart);
  const cartItems = products.reduce((result, product) => {
    const productInCart = product.variants.edges.some((variant) => {
      return cart.some((item) => item.variantId === variant.node.id);
    });

    if (productInCart) {
      const variants: Variant[] = product.variants.edges
        .filter(({ node: variant }) => {
          return cart.some((item) => item.variantId === variant.id);
        })
        .map((variant) => {
          return variant.node;
        });

      let variantsWithInfo = [];
      for (const variant of variants) {
        variantsWithInfo.push({
          ...variant,
          productID: product.id,
          productTitle: product.title,
          handle: product.handle,
          thumbnail: product.thumbnail,
          quantity:
            cart.find((item) => item.variantId === variant.id)?.quantity || 0,
        });
      }
      return [...result, ...variantsWithInfo];
    }
    return result;
  }, [] as VariantInfo[]);

  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseInt(item.price.amount) * item.quantity;
  }, 0);

  return {
    cartTotal,
    cartSize,
    cartItems,
  };
};
