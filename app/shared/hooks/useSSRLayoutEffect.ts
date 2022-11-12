import { useLayoutEffect } from "react";

export const useSSRLayoutEffect =
  typeof window === "undefined" ? () => {} : useLayoutEffect;
