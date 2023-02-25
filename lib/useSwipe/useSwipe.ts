import { useEffect, useRef } from "react";

interface UseSwipeParams {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
}

const useSwipe = ({ onSwipeRight, onSwipeLeft }: UseSwipeParams) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onRight = (fn?: () => void) => {
    if (fn && touchStartX.current < touchEndX.current) fn();
  };
  const onLeft = (fn?: () => void) => {
    if (fn && touchStartX.current > touchEndX.current) fn();
  };
  useEffect(() => {
    if (onSwipeRight || onSwipeLeft) {
      document.addEventListener("touchstart", (e) => {
        touchStartX.current = e.changedTouches[0].screenX;
      });
      document.addEventListener("touchend", (e) => {
        touchEndX.current = e.changedTouches[0].screenX;
        onRight(onSwipeRight);
        onLeft(onSwipeLeft);
      });
    }
    return () => {
        document.removeEventListener("touchstart", () => {});
        document.removeEventListener("touchend", () => {});
    }
  }, []);
};

export { useSwipe };
