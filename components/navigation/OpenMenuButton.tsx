import { MenuOpen } from "@mui/icons-material";
import { MenuIconButton } from "./MenuIconButton";

interface OpenMenuButtonProps {
  setIsOpen: () => void;
}



export const OpenMenuButton = ({ setIsOpen }: OpenMenuButtonProps): JSX.Element => {
  return (
    <MenuIconButton
      edge="end"
      color="secondary"
      aria-label="open menu"
      onClick={setIsOpen}
    >
      <MenuOpen />
    </MenuIconButton>
  );
};
