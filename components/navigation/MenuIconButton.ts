"use client";
import { IconButton, IconButtonProps, styled } from "@mui/material";

export const MenuIconButton = styled(IconButton)<IconButtonProps>(
  () => {
    return {
      position: "absolute",
      right: "2rem",
      top: "1rem",
    };
  }
);
