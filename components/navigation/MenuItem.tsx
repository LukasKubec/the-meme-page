import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import Link, { LinkProps } from "next/link";

const MenuLink = styled(Link)<LinkProps>(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

export interface MenuItemProps {
  href: string;
  label: string;
  icon: JSX.Element;
}

export const MenuItem = ({ href, label, icon }: MenuItemProps) => {
  return (
      <MenuLink href={href}>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </MenuLink>
  );
};
