import { XIcon } from "@heroicons/react/outline";
import { Form, useLocation, useNavigate } from "@remix-run/react";
import type { WishlistItem } from "~/providers/products/products";
import { Button } from "./shared/Button";
import { Drawer } from "./shared/Drawer";

interface Props {
  wishlist: WishlistItem[];
  showWishlist: boolean;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Wishlist: React.FC<Props> = ({
  wishlist,
  showWishlist,
  setShowWishlist,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Drawer
      title="Produse Favorite"
      open={showWishlist}
      onClose={() => setShowWishlist(false)}
    >
      <div className="px-6 pt-6">
        {wishlist.length === 0 ? (
          <div className="text-subtitle">Gol</div>
        ) : (
          <ul>
            {wishlist.map((item) => {
              const hasVariants = item.variants.edges.length > 1;
              const isAvailable = item.variants.edges[0].node.availableForSale;
              return (
                <li
                  className="relative flex gap-4 border-t border-t-secondaryBackground py-5 first:border-none"
                  key={item.id}
                >
                  <img
                    src={item.featuredImage.url}
                    width={100}
                    height={67}
                    className="h-[67px] w-[100px]"
                    alt={item.featuredImage.altText ?? ""}
                  />
                  <div className="pr-4">
                    <p className="mb-2">{item.title}</p>
                    <p className="mb-2">
                      {item.variants.edges[0].node.priceV2.amount} lei
                    </p>
                    <Button
                      slim
                      variant="dark"
                      className="h-[38px] text-sm"
                      onClick={() => {
                        if (!isAvailable) {
                          navigate(`/products/${item.handle}`);
                          setShowWishlist(false);
                        }
                      }}
                    >
                      {hasVariants
                        ? "Selecteaza optiunea"
                        : isAvailable
                        ? "Adauga in cos"
                        : "Stoc epuizat"}
                    </Button>
                  </div>
                  <Form method="post" action="/wishlist">
                    <input type="hidden" name="productId" value={item.id} />
                    <input type="hidden" name="_action" value="remove" />
                    <input
                      type="hidden"
                      name="redirectTo"
                      value={location.pathname}
                    />
                    <button>
                      <XIcon className="absolute top-6 right-0 h-4 w-4" />
                    </button>
                  </Form>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Drawer>
  );
};
