import React from "react";
import { Button } from "./shared/Button";

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[550px] w-full bg-[#fcf8f5]">
      <div className="absolute bottom-0 z-0 h-[100.7px] w-full bg-[#e8e2db]"></div>
      <div className="absolute z-20 flex w-full flex-col items-center justify-center p-[20px] text-center">
        <h2 className="text-header text-primary ">
          Editura Instrumente Creative
        </h2>
        <p className="mx-[20px] mb-4 block text-lg text-text">
          Produse create de psihologi și logopezi. Toate ilustrațiile sunt
          originale
        </p>
        <Button text="Vizualizează toate produsele" />
      </div>
      <img
        className="absolute left-0 right-0 z-10 mx-auto h-[550px] "
        src="https://cdn.shopify.com/s/files/1/0598/9367/8278/files/Kit_slide_mobile_54330571-644e-43bb-a4b0-af2c0c503ff2.png?v=1651500342"
        alt="header"
      />
    </div>
  );
};
