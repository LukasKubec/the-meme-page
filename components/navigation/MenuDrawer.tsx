import { Box, Drawer } from "@mui/material";
import { CloseButton } from "./CloseButton";
import { MenuItem, MenuItemProps } from "./MenuItem";
import {
  ChuckNorrisOutlined,
  InfoOutlinedStyled,
  MenuCelebrationOutlined,
} from "./menuIcons";
import { useNavigationContext } from "@/lib";
import { OpenMenuButton } from "./OpenMenuButton";

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

interface Props {
  variant?: "temporary" | "permanent";
}

export const MenuDrawer = ({ variant }: Props): JSX.Element => {
  const { navigationIsOpen, closeNavigation, openNavigation } =
    useNavigationContext();
  const isTemporary = variant === "temporary";

  return (
    <>
      {isTemporary && <OpenMenuButton setIsOpen={openNavigation} />}
      <Drawer
        anchor="right"
        variant={isTemporary ? "temporary" : "permanent"}
        open={navigationIsOpen}
        onClose={closeNavigation}
        transitionDuration={{ enter: 300, exit: 200 }}
        sx={{
          height: "calc(100% - 96px)",
        }}
        PaperProps={{
          sx: {
            height: isTemporary ? "15rem" : "11rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          },
        }}
      >
        {isTemporary && <CloseButton onClick={closeNavigation} />}
        <Box sx={{ marginTop: "1rem" }}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              onClick={closeNavigation}
            />
          ))}
        </Box>
      </Drawer>
    </>
  );
};
