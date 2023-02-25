import { createContext, useContext } from "react";

export interface UseNavigationContext {
  header?: string;
  setHeader: (header: string) => void;
  navigationIsOpen: boolean;
  openNavigation: () => void;
  closeNavigation: () => void;
}
export const navigationContext = createContext<UseNavigationContext>({
  header: "Memes!",
  setHeader: () => {},
  navigationIsOpen: false,
  openNavigation: () => {},
  closeNavigation: () => {},
});

export const useNavigationContext = (header?: string) => {
  const context = useContext(navigationContext);
  if (header) {
    context.setHeader(header);
  }
  return context;
};
