import { motion } from "framer-motion";
import React from "react";
import type { IconBaseProps } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { links } from "~/config";
import { classNames } from "~/shared/utils/classNames";

export type SocialLinkName = keyof typeof links;

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3 text-input">
      {Object.entries(links).map(([key, value]) => {
        return (
          <SocialLink href={value} key={key}>
            <SocialIcon name={key as SocialLinkName} />
          </SocialLink>
        );
      })}
    </div>
  );
};

interface SocialLinkProp {
  href: string;
  className?: string;
}
export const SocialLink: React.FC<SocialLinkProp> = ({
  children,
  href,
  className,
}) => {
  return (
    <motion.a
      whileHover={{ color: "#2c2c2c" }}
      whileTap={{ scale: 0.9 }}
      className={classNames(
        "flex h-[44px] w-[44px] items-center justify-center bg-white text-lg",
        className
      )}
      href={href}
      target="_self"
    >
      {children}
    </motion.a>
  );
};

interface IconProps extends IconBaseProps {
  name: SocialLinkName;
}

export const SocialIcon: React.FC<IconProps> = ({ name, ...props }) => {
  if (name === "facebook") {
    return <FaFacebook {...props} />;
  }
  if (name === "instagram") {
    return <FaInstagram {...props} />;
  }
  if (name === "youtube") {
    return <FaYoutube {...props} />;
  }
  if (name === "tiktok") {
    return <FaTiktok {...props} />;
  }
  if (name === "twitter") {
    return <FaTwitter {...props} />;
  }
  if (name === "pinterest") {
    return <FaPinterest {...props} />;
  }
  return null;
};
