import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { Drawer } from "./shared/Drawer";

interface Props {
  showWishlist: boolean;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Wishlist: React.FC<Props> = ({
  showWishlist,
  setShowWishlist,
}) => {
  return (
    <Drawer
      title="Produse Favorite"
      open={showWishlist}
      onClose={() => setShowWishlist(false)}
    >
      <div className="px-6 pt-6">
        <div className="text-subtitle">Gol</div>
      </div>
    </Drawer>
  );
};
