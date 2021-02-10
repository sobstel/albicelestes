import debounce from "lodash.debounce";
import { useState, useEffect, RefObject } from "react";

export default function useClientWidth(ref: RefObject<HTMLElement>) {
  const [clientWidth, setClientWidth] = useState(0);

  function handleClientWidth() {
    if (ref?.current) {
      setClientWidth(ref.current.clientWidth);
    }
  }

  useEffect(() => handleClientWidth(), [ref]);

  useEffect(() => {
    const debouncedHandleClientWidth = debounce(handleClientWidth, 300, {
      maxWait: 300,
      leading: true,
      trailing: true,
    });

    window?.addEventListener("resize", debouncedHandleClientWidth);

    return function cleanup() {
      window?.removeEventListener("resize", debouncedHandleClientWidth);
    };
  }, []);

  return clientWidth;
}
