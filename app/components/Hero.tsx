import React from "react";
import { config, images } from "~/config";
import { CFImage } from "./shared/image/CFImage";
import { LinkButton } from "./shared/LinkButton";

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[110vw] max-h-[600px] w-full bg-[#fcf8f5]">
      <div className="absolute bottom-0 z-0 h-[100.7px] w-full bg-[#e8e2db]" />
      <div className="absolute z-20 flex w-full flex-col items-center justify-center gap-4 p-5 text-center">
        <h2 className="text-[8.6vw] leading-tight text-primary sm:mb-6 sm:text-header ">
          Editura Instrumente Creative
        </h2>
        <p className="mx-9 mb-6 block text-[4vw] text-subtitle sm:mx-5 sm:text-lg md:mb-12">
          Produse create din pasiune pentru copii si educație. Toate
          ilustrațiile sunt originale
        </p>
        <LinkButton
          to={config.pages.produse.path}
          text="Vizualizează toate produsele"
          className="min-h-[44px]"
        />
      </div>
      <CFImage
        className="absolute left-0 right-0 z-10 mx-auto max-h-[600px]"
        image={images.images.hero_mobile}
      />
    </div>
  );
};
