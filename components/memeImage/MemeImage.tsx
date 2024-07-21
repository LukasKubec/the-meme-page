import Image from "next/image";
import { StaticImageWithAlt } from "@/programming memes";
import {Box, useMediaQuery, useTheme} from "@mui/material";
import { ReactNode } from "react";

interface MemeImageProps {
  meme?: StaticImageWithAlt;
  onClick?: () => void;
}

const MemeImage = ({
  meme,
  onClick,
}: MemeImageProps): JSX.Element => {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex" flexDirection="column">
      {meme && (
        <Image
          src={meme}
          alt={meme.alt}
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100vw",
            maxHeight: "60vh",
          }}
          onClick={onClick}
          title={meme.alt}
          priority
        />
      )}
    </Box>
  );
};

export { MemeImage };
