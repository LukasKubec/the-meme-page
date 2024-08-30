"use client";
import { useEffect, useRef } from "react";

interface UseSwipeParams {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
}

const useSwipe = ({ onSwipeRight, onSwipeLeft }: UseSwipeParams) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const controller = new AbortController();

  const onRight = (fn?: () => void) => {
    if (fn && touchStartX.current < touchEndX.current) fn();
  };
  const onLeft = (fn?: () => void) => {
    if (fn && touchStartX.current > touchEndX.current) fn();
  };

  useEffect(() => {
    if (onSwipeRight || onSwipeLeft) {
      document.addEventListener(
        "touchstart",
        (e) => {
          touchStartX.current = e.changedTouches[0].screenX;
        },
        { signal: controller.signal }
      );

      document.addEventListener(
        "touchend",
        (e) => {
          touchEndX.current = e.changedTouches[0].screenX;
          onRight(onSwipeRight);
          onLeft(onSwipeLeft);
        },
        { signal: controller.signal }
      );
    }
    return () => {
      controller.abort();
    };
  }, []);
};

export { useSwipe };
