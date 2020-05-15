import { useState, useEffect, useLayoutEffect, RefObject } from "react";

export default function useClientWidth(ref: RefObject<HTMLElement>) {
  const [clientWidth, setClientWidth] = useState(0);

  useLayoutEffect(() => {
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
