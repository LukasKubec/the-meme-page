import { useEffect } from "react";

interface UseArrowKeyListenerParams {
  keyMap: {
    [key: string]: () => void;
  };
}

export const useKeyListener = ({
  keyMap,
}: UseArrowKeyListenerParams) => {
  const keyListener = (event: KeyboardEvent) => {
    const { key } = event;
    if (key in keyMap) {
      keyMap[key]();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, []);
};
