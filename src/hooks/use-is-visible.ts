import type React from "react";
import { useEffect, useState } from "react";

export function useIsVisible(ref: React.RefObject<HTMLElement>, initialState = false) {
	const [isVisible, setIsVisible] = useState<boolean>(initialState);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log("You clicked outside of me!", {
          ref: ref.current,
          eventTarget: event.target,
        });
				setIsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  const toggle = () => setIsVisible(!isVisible);
  const hide = () => setIsVisible(false);
  const show = () => setIsVisible(true);
	return {
    isVisible,
    toggle,
    hide,
    show,
  };
}