import { MutableRefObject, useEffect } from "react";

export function useOffClick(
  mutableObjectRef: MutableRefObject<any>,
  fn: () => void
) {
  useEffect(() => {
    function handleMouseEvent(event: Event) {
      if (
        mutableObjectRef.current &&
        !mutableObjectRef.current.contains(event.target)
      ) {
        fn();
      }
    }

    document.addEventListener("mousedown", handleMouseEvent);

    return () => {
      document.removeEventListener("mousedown", handleMouseEvent);
    };
  }, [mutableObjectRef, fn]);
}
