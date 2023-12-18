import React from "react";
import { images } from "~/config";

const hero = `${images.baseUrl}${images.images.hero2.src}`;
const hero_mobile = `${images.baseUrl}${images.images.hero_mobile2.src}`;

export const Hero: React.FC = () => {
  return (
    <div className="aspect-w-2 aspect-h-3 w-full overflow-hidden md:aspect-w-3 md:aspect-h-2">
      <picture className="object-cover object-center transition">
        <source srcSet={`${hero}/w=1980`} media="(min-width: 1536px)" />
        <source srcSet={`${hero}/w=1536`} media="(min-width: 1280px)" />
        <source srcSet={`${hero}/w=1280`} media="(min-width: 1024px)" />
        <source srcSet={`${hero}/w=1024`} media="(min-width: 768px)" />
        <source srcSet={`${hero_mobile}/w=768`} media="(min-width:640px)" />
        <img src={`${hero_mobile}/w=500`} alt="Instrumente Creative" />
      </picture>
    </div>
  );
};
