import { config } from "~/config";
import type { GetUserQuery } from "~/generated/graphql";
import { FooterSubscribeToNewsletter } from "./FooterSubscribeToNewsletter";
import { Logo } from "./Logo";
import { TruckIcon } from "./shared/icons";
import { Link } from "./shared/Link";
import { SocialLinks } from "./shared/SocialLinks";

interface Props {
  user: GetUserQuery | null;
}

export const Footer: React.FC<Props> = ({ user }) => {
  return (
    <footer className="mt-20  w-full bg-background py-20 px-3 sm:px-5">
      <div className=" mb-4 flex justify-center gap-4 text-primary ">
        <Link to={config.pages["intrebari-frecvente"].path}>
          Serviciu clienți
        </Link>
        <Link to={config.pages["politica-de-confidențialitate"].path}>
          Politica de confidențialitate
        </Link>
        <Link to={config.pages.contact.path}>Contact</Link>
      </div>
      <div className="flex items-center justify-center gap-3 text-subtitle">
        <TruckIcon width={20} fill="#707070" />
        <p>Livrare gratuită pentru comenzi mai mari de 200 de lei</p>
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
