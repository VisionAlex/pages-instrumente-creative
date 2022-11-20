import { useReducer } from "react";
import type { Product } from "~/types";

type ProductModalState = {
  isOpen: boolean;
  product: Product | null;
};

type ProductModalAction =
  | {
      type: "OPEN_MODAL";
      payload: Product;
    }
  | {
      type: "CLOSE_MODAL";
    };

const productModalReducer = (
  state: ProductModalState,
  action: ProductModalAction
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        isOpen: true,
        product: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export const useProductModal = (products: Product[]) => {
  const [{ isOpen, product }, dispatch] = useReducer(productModalReducer, {
    isOpen: false,
    product: products ? products[0] : null,
  });
  return {
    isOpen,
    product,
    openModal: (product: Product) =>
      dispatch({ type: "OPEN_MODAL", payload: product }),
    closeModal: () => dispatch({ type: "CLOSE_MODAL" }),
  };
};
