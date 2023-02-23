import { useEffect } from "react";

interface UseSwipeParams {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
}

const useSwipe = ({ onSwipeRight, onSwipeLeft }: UseSwipeParams) => {
  let touchStartX = 0;
  let touchEndX = 0;

  const onRight = (fn?: () => void) => {
    if (fn && touchStartX < touchEndX) fn();
  };
  const onLeft = (fn?: () => void) => {
    if (fn && touchStartX > touchEndX) fn();
  };

  useEffect(() => {
    if (onSwipeRight || onSwipeLeft) {
      document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        onRight(onSwipeRight);
        onLeft(onSwipeLeft);
      });
    }
  }, []);
};

export { useSwipe };
