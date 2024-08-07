import { Button, useMediaQuery, useTheme } from "@mui/material";
import {
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";
import { RandomKeyboardIcon, RandomSwipeIcon } from "./icons";

interface RandomButtonProps {
  onClick: () => void;
  label: string;
  fullWidth?: boolean;
}

export const RandomButton = ({ onClick, label, fullWidth }: RandomButtonProps) => {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Button variant="contained" size="large" onClick={onClick} sx={{
      width: fullWidth ? "100%" : "auto",
    }}>
      {label}
      {matchesSm ? (
        <RandomSwipeIcon />
      ) : (
        <>
          <RandomKeyboardIcon />
          <KeyboardArrowRightOutlined />
        </>
      )}
    </Button>
  );
};
