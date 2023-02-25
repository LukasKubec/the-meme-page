import { useEffect } from "react";

interface UseArrowKeyListenerParams {
    onLeftArrow?: () => void;
    onRightArrow?: () => void;
    onTopArrow?: () => void;
    onBottomArrow?: () => void;
}

export const useArrowKeyListener = ({
    onLeftArrow,
    onRightArrow,
    onTopArrow,
    onBottomArrow,
}: UseArrowKeyListenerParams) => {

    const keyListener = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowLeft":
                onLeftArrow && onLeftArrow();
                break;
            case "ArrowRight":
                onRightArrow && onRightArrow();
                break;
            case "ArrowUp":
                onTopArrow && onTopArrow();
                break;
            case "ArrowDown":
                onBottomArrow && onBottomArrow();
                break;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", keyListener);
    }, []);
}
