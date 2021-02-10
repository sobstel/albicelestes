import { useMediaQuery } from "react-responsive";
// @ts-expect-error No definition file for tailwind config js file
import tailwindConfig from "tailwind.config";

export default function useBreakpoint(screen: "sm" | "md"): boolean {
  const breakpoint = tailwindConfig.theme.screens[screen];
  return useMediaQuery({ query: `(max-width: ${breakpoint})` });
}
