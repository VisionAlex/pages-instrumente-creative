import type { SVGProps } from "react";

const SvgMenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      d="M1 9h28M1 15h28M10 21h19"
    />
  </svg>
);

export default SvgMenuIcon;
