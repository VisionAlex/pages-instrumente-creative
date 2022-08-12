import { Logo } from "./Logo";
import { TruckIcon } from "./shared/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20  w-full bg-background py-20 px-3 sm:px-5">
      <div className=" mb-4 flex justify-center gap-4 text-primary">
        <a href="#">Serviciu clienți</a>
        <a href="#">Politica de confidențialitate</a>
        <a href="#">Contact</a>
      </div>
      <div className="flex items-center justify-center gap-3 text-subtitle">
        <TruckIcon width={20} fill="#707070" />
        <p>Livrare gratuită pentru comenzi mai mari de 200 de lei</p>
      </div>
      <div className="my-4 flex justify-center">
        <Logo />
      </div>
      <form className="my-4 flex h-8 items-center justify-center">
        <input
          className="grow-1 mr-5 max-w-md grow border-b border-line bg-background leading-loose text-primary outline-none"
          placeholder="Adresă de e-mail"
        />
        <button
          className="h-8 border-b border-primary leading-relaxed text-subtitle transition duration-500 hover:text-primary"
          type="submit"
        >
          Abonează-te
        </button>
      </form>
      <div className="pt-6 text-center leading-7 text-subtitle">
        <span>
          © {new Date().getFullYear()} Instrumente Creative. Toate drepturile
          rezervate |
        </span>{" "}
        <a
          href="mailto:gmail@instrumentecreative.com"
          aria-describedby="email"
          className="hover:text-primary"
        >
          contact@instrumentecreative.com
        </a>
      </div>
    </footer>
  );
};
