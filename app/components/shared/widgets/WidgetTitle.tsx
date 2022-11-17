import React from "react";

interface Props {
  title: string;
}

export const WidgetTitle: React.FC<Props> = ({ title }) => {
  return (
    <h3 className="overflow-hidden text-center uppercase leading-6 tracking-widest">
      <span className="relative px-4 before:absolute before:left-full before:top-1/2 before:h-px before:w-screen before:bg-secondaryBackground after:absolute after:right-full after:top-1/2 after:h-px after:w-screen after:bg-secondaryBackground">
        {title}
      </span>
    </h3>
  );
};
