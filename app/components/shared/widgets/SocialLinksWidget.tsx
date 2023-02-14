import { motion } from "framer-motion";
import React from "react";
import { FaFacebook, FaPinterest, FaTiktok, FaYoutube } from "react-icons/fa";
import { links } from "~/config";
import { InstagramIcon } from "../icons/InstagramIcon";
import { WidgetTitle } from "./WidgetTitle";

const size = 24;

interface Props {
  className?: string;
}

export const SocialLinksWidget: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <WidgetTitle title="Urmărește-ne" />
      <div className="mt-4 flex items-center justify-center gap-4">
        <SocialLink href={links.facebook}>
          <FaFacebook size={size} className="text-[#4267B2]" />
        </SocialLink>
        <SocialLink href={links.instagram}>
          <InstagramIcon width={size} />
        </SocialLink>
        <SocialLink href={links.youtube}>
          <FaYoutube size={size} className="text-[#FF0000]" />
        </SocialLink>
        <SocialLink href={links.tiktok}>
          <FaTiktok size={size} className="text-black" />
        </SocialLink>
        <SocialLink href={links.pinterest}>
          <FaPinterest size={size} className="text-[#E60023]" />
        </SocialLink>
      </div>
    </div>
  );
};

interface SocialLinkProp {
  href: string;
  children: React.ReactNode;
}
const SocialLink: React.FC<SocialLinkProp> = ({ children, href }) => {
  return (
    <motion.a
      href={href}
      target="_self"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.a>
  );
};
