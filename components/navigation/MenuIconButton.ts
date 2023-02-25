import { IconButton, IconButtonProps, styled, useMediaQuery } from "@mui/material";

export const MenuIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => {
    const matchesLg = useMediaQuery(theme.breakpoints.down("lg"));
    return {
        display: matchesLg ? "block" : "none",
    }
});
