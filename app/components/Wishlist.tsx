import { XIcon } from "@heroicons/react/outline";
import { Form, Link, useLocation, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import { config } from "~/config";
import type { Products } from "~/types";
import { Button } from "./shared/Button";
import { Drawer } from "./shared/Drawer";

interface Props {
  wishlist: string[];
  products: Products;
  showWishlist: boolean;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Wishlist: React.FC<Props> = ({
  wishlist,
  products,
  showWishlist,
  setShowWishlist,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const wishlistInfo = useMemo(() => {
    return products.filter((product) => wishlist.includes(product.node.id));
  }, [products, wishlist]);

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
            {wishlistInfo.map(({ node: item }) => {
              const hasVariants = item.variants.edges.length > 1;
              const isAvailable = item.variants.edges[0].node.availableForSale;
              return (
                <li
                  className="relative flex gap-4 border-t border-t-secondaryBackground py-5 first:border-none"
                  key={item.id}
                >
                  <Link
                    to={`${config.pages.produse.path}/${item.handle}`}
                    prefetch="intent"
                    onClick={() => setShowWishlist(false)}
                  >
                    <img
                      src={item.thumbnail?.url ?? ""}
                      width={100}
                      height={67}
                      className="h-[67px] w-[100px]"
                      alt={item.thumbnail?.altText ?? ""}
                    />
                  </Link>
                  <div className="pr-4">
                    <Link
                      prefetch="intent"
                      to={`${config.pages.produse.path}/${item.handle}`}
                      onClick={() => setShowWishlist(true)}
                    >
                      <p className="mb-2">{item.title}</p>
                    </Link>
                    <p className="mb-2">
                      {item.variants.edges[0].node.price.amount} lei
                    </p>
                    <Button
                      slim
                      variant="dark"
                      className="h-[38px] text-sm"
                      onClick={() => {
                        if (!isAvailable) {
                          navigate(
                            `${config.pages.produse.path}/${item.handle}`
                          );
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
                    <input type="hidden" name="productID" value={item.id} />
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
