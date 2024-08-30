"use client";
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
  onClick?: () => void;
}

export const MenuItem = ({ href, label, icon, onClick }: MenuItemProps) => {
  const selected = typeof window !== "undefined" ? window.location.pathname === href : false;
  return (
      <MenuLink href={href}>
        <ListItemButton onClick={onClick} selected={selected}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </MenuLink>
  );
};
