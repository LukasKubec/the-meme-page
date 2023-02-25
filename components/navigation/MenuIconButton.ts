import { IconButton, IconButtonProps, styled, useMediaQuery } from "@mui/material";

export const MenuIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => {
    const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
    return {
        display: matchesMd ? "block" : "none",
    }
});
