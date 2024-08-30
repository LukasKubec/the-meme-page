"use client";
import { navigationContext } from "@/lib";
import { ReactNode, useState } from "react";

interface NavigationProvider {
  children: ReactNode;
}

const NavigationContextProvider = navigationContext.Provider;

export const NavigationProvider = ({
  children,
}: NavigationProvider): JSX.Element => {
  const [header, setHeader] = useState<string | undefined>(undefined);
  const [navigationIsOpen, setNavigationIsOpen] = useState(false);
  const handleClose = () => setNavigationIsOpen(false);
  const handleOpen = () => setNavigationIsOpen(true);

  return (
    <NavigationContextProvider
      value={{
        header,
        setHeader,
        navigationIsOpen,
        closeNavigation: handleClose,
        openNavigation: handleOpen,
      }}
    >
      {children}
    </NavigationContextProvider>
  );
};
