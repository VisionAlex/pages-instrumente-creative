import React from "react";
import { Button } from "./shared/Button";

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[110vw] max-h-[550px] w-full bg-[#fcf8f5]">
      <div className="absolute bottom-0 z-0 h-[100.7px] w-full bg-[#e8e2db]"></div>
      <div className="absolute z-20 flex w-full flex-col items-center justify-center p-5 text-center">
        <h2 className="text-header leading-tight text-primary ">
          Editura Instrumente Creative
        </h2>
        <p className="mx-5 mb-6 block text-lg text-subtitle">
          Produse create de psihologi și logopezi. Toate ilustrațiile sunt
          originale
        </p>
        <Button text="Vizualizează toate produsele" />
      </div>
      <img
        loading="lazy"
        className="absolute left-0 right-0 z-10 mx-auto max-h-[550px]"
        src="https://cdn.shopify.com/s/files/1/0598/9367/8278/files/Kit_slide_mobile_54330571-644e-43bb-a4b0-af2c0c503ff2.png?v=1651500342"
        alt="header"
      />
    </div>
  );
};
