import { styled } from "@mui/material";
import { CelebrationOutlined, PsychologyOutlined } from "@mui/icons-material";

export const MenuCelebrationOutlined = styled(CelebrationOutlined)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const ChuckNorrisOutlined = styled(PsychologyOutlined)(({ theme }) => ({
    color: theme.palette.primary.main,
}));
