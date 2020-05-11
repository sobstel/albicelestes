import { useState, useEffect, RefObject } from "react";
import { debounce } from "ts-debounce";

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

    const debouncedHandleResize = debounce(handleResize, 250, {
      isImmediate: true,
    });

    if (window) window.addEventListener("resize", debouncedHandleResize);

    return function cleanup() {
      if (window) window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return clientWidth;
}
