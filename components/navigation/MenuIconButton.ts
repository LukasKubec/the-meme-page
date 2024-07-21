import { IconButton, IconButtonProps, styled, useMediaQuery } from "@mui/material";

export const MenuIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => {
    return {
        position: "absolute",
        right: "2rem",
        top: "1rem",
    }
});
