import { useState, useEffect, RefObject } from "react";

export default function useClientWidth(ref: RefObject<HTMLElement>) {
  const [clientWidth, setClientWidth] = useState(0);

  function handleClientWidth() {
    if (ref?.current) {
      setClientWidth(ref.current.clientWidth);
    }
  }

  useEffect(() => {
    handleClientWidth();
  }, [ref]);

  useEffect(() => {
    if (window) window.addEventListener("resize", handleClientWidth);

    return function cleanup() {
      if (window) window.removeEventListener("resize", handleClientWidth);
    };
  }, []);

  return clientWidth;
}
