import { LinkButton } from "./shared/LinkButton";
import { Drawer } from "./shared/Drawer";

const products: any = [];

interface Props {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShoppingCart: React.FC<Props> = ({ showCart, setShowCart }) => {
  return (
    <Drawer
      title="Coșul Tău"
      open={showCart}
      onClose={() => setShowCart(false)}
    >
      <div className="mt-10 px-6">
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            <div>Coșul tău este momentan gol.</div>
          </ul>
        </div>
      </div>
      <div>
        {products.length > 0 && (
          <div className="py-6 px-6">
            <div className="flex justify-between text-base  text-primary">
              <p>Subtotal</p>
              <p className="text-lg text-subtitle">262 lei</p>
            </div>
            <div className="mt-6">
              <LinkButton
                to="#"
                text="Finalizează Comanda"
                variant="dark"
                className="mb-3 lg:text-lg"
              />
              <LinkButton
                to="#"
                text="Vezi Coșul de cumpărături"
                variant="light"
                className="lg:text-lg"
              />
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
