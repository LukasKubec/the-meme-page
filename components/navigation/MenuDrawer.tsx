import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { CloseButton } from "./CloseButton";
import { MenuDivider } from "./MenuDivider";
import { MenuItem, MenuItemProps } from "./MenuItem";
import {
  ChuckNorrisOutlined,
  InfoOutlinedStyled,
  MenuCelebrationOutlined,
} from "./menuIcons";
import { useNavigationContext } from "@/lib";

export const menuItems: MenuItemProps[] = [
  {
    href: "/",
    label: "IT Memes",
    icon: <MenuCelebrationOutlined />,
  },
  {
    href: "/chuck",
    label: "Chuck Norris Facts",
    icon: <ChuckNorrisOutlined />,
  },
  {
    href: "/about",
    label: "About",
    icon: <InfoOutlinedStyled />,
  },
];

export const MenuDrawer = (): JSX.Element => {
  const { navigationIsOpen, closeNavigation } = useNavigationContext();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Drawer
      anchor="right"
      variant={matchesMd ? "temporary" : "permanent"}
      open={navigationIsOpen}
      onClose={closeNavigation}
      sx={{
        height: "calc(100% - 96px)",
      }}
      PaperProps={{
        sx: {
          height: matchesMd ? "15rem" : "11rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        },
      }}
    >
        {matchesMd && <CloseButton onClick={closeNavigation} />}
        <MenuDivider />
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              onClick={closeNavigation}
            />
          ))}
    </Drawer>
  );
};
