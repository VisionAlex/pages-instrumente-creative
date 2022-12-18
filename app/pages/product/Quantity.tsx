import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const Quantity: React.FC<Props> = ({ quantity, setQuantity }) => {
  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const reduceQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };
  return (
    <div className="mr-3 flex">
      <button
        className="border border-background p-2 hover:bg-primary hover:text-white"
        onClick={reduceQuantity}
      >
        <MinusSmIcon strokeWidth={1.5} className="h-6 w-6" />
      </button>
      <input
        value={quantity}
        type="number"
        step="1"
        min="1"
        className="w-11 border-y text-center align-middle text-subtitle outline-none"
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      />
      <button
        className="border border-background p-2 hover:bg-primary hover:text-white"
        onClick={addQuantity}
      >
        <PlusSmIcon strokeWidth={1.5} className="h-6 w-6" />
      </button>
    </div>
  );
};
