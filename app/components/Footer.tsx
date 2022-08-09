import { Logo } from "./Logo";
import { TruckIcon } from "./shared/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20  w-full bg-background py-20 px-1">
      <div className=" mb-4 flex justify-center gap-4 text-primary">
        <a href="#">Serviciu clienți</a>
        <a href="#">Politica de confidențialitate</a>
        <a href="#">Contact</a>
      </div>
      <div className="flex items-center justify-center gap-5 text-subtitle">
        <TruckIcon width={20} fill="#707070" />
        <p>Livrare gratuită pentru comenzi mai mari de 200 de lei</p>
      </div>
      <div className="my-4 flex justify-center">
        <Logo />
      </div>
      <form className="flex h-8 items-center px-5">
        <input
          className="grow-1 mr-5 grow border-b border-line bg-background leading-loose text-primary outline-none"
          placeholder="Adresă de e-mail"
        />
        <button
          className="h-8 border-b border-primary leading-relaxed text-subtitle transition duration-500 hover:text-primary"
          type="submit"
        >
          Abonează-te
        </button>
      </form>
    </footer>
  );
};
