import { useState, useEffect, RefObject } from "react";

export default function useClientWidth(
  ref: RefObject<HTMLElement>,
  defaultWidth = 0
) {
  // TODO: set to some default for SSR
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

    // TODO: debounce it! (https://github.com/slorber/awesome-debounce-promise)
    if (window) window.addEventListener("resize", handleResize);

    return function cleanup() {
      if (window) window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // console.log(clientWidth);
  }, [clientWidth]);

  return clientWidth;
}
