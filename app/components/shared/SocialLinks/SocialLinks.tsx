import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { links } from "~/config";

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3 text-input">
      <SocialLink href={links.facebook}>
        <FaFacebook />
      </SocialLink>
      <SocialLink href={links.instagram}>
        <FaInstagram />
      </SocialLink>
      <SocialLink href={links.youtube}>
        <FaYoutube />
      </SocialLink>
      <SocialLink href={links.tiktok}>
        <FaTiktok />
      </SocialLink>
      <SocialLink href={links.twitter}>
        <FaTwitter />
      </SocialLink>
      <SocialLink href={links.pinterest}>
        <FaPinterest />
      </SocialLink>
    </div>
  );
};

interface SocialLinkProp {
  href: string;
}

const SocialLink: React.FC<SocialLinkProp> = ({ children, href }) => {
  return (
    <a
      className="flex h-[44px] w-[44px] items-center justify-center bg-white text-lg hover:text-primary"
      href={href}
      target="_self"
    >
      {children}
    </a>
  );
};
