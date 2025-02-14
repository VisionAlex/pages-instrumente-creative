import { config } from "~/config";
import type { GetUserQuery } from "~/generated/graphql";
import { FooterSubscribeToNewsletter } from "./FooterSubscribeToNewsletter";
import { Logo } from "./Logo";
import { Link } from "./shared/Link";
import { SocialLinks } from "./shared/SocialLinks";
import { TruckIcon } from "./shared/icons";

interface Props {
  user: GetUserQuery | null;
}

export const Footer: React.FC<Props> = ({ user }) => {
  return (
    <footer className="mt-20  w-full bg-background py-20 px-5">
      <div className="container mx-auto mb-4 grid max-w-screen-md grid-cols-2 place-items-center gap-5 px-4 text-center text-primary xs2:flex xs2:flex-wrap xs2:justify-center">
        <Link
          to={config.pages["intrebari-frecvente"].path}
          className="place-self-start text-left xs2:place-self-auto"
        >
          Serviciu clienți
        </Link>
        <Link
          to={config.pages["politica-de-confidențialitate"].path}
          className="place-self-start text-left xs2:place-self-auto"
        >
          Politica de confidențialitate
        </Link>
        <Link
          to={config.pages.recenzii.path}
          className="place-self-start text-left xs2:place-self-auto"
        >
          Recenzii
        </Link>
        <Link
          to={config.pages.contact.path}
          className="place-self-start text-left xs2:place-self-auto"
        >
          Contact
        </Link>
      </div>
      <div className="flex  items-center justify-center gap-2 text-center text-subtitle xs2:flex-row">
        <TruckIcon width={20} fill="#707070" />
        <p>Livrare gratuită pentru toate comenzile</p>
      </div>
      <div className="my-4 flex justify-center">
        <Logo />
      </div>
      <FooterSubscribeToNewsletter user={user} />
      <div className="flex items-center justify-center pt-4">
        <SocialLinks />
      </div>
      <div className="pt-6 text-center leading-7 text-subtitle">
        <span>
          © {new Date().getFullYear()} Instrumente Creative. Toate drepturile
          rezervate |
        </span>{" "}
        <a
          href={`mailto:${config.email}`}
          aria-describedby="email"
          className="hover:text-primary"
        >
          {config.email}
        </a>
      </div>
    </footer>
  );
};
