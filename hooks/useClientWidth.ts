import { useState, useEffect, RefObject } from "react";

export default function useClientWidth(
  ref: RefObject<HTMLElement>,
  defaultWidth = 0
) {
  const [clientWidth, setClientWidth] = useState(defaultWidth);

  useEffect(() => {
    if (ref?.current) setClientWidth(ref.current.clientWidth);
  }, [ref]);

  useEffect(() => {
    function handleResize() {
      if (ref?.current) {
        setClientWidth(ref.current.clientWidth);
      }
    }

    if (window) window.addEventListener("resize", handleResize);

    return function cleanup() {
      if (window) window.removeEventListener("resize", handleResize);
    };
  }, []);

  return clientWidth;
}
