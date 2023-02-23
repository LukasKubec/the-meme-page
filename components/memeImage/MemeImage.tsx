import Image from "next/image";
import { StaticImageWithAlt } from "@/programming memes";
import { useMediaQuery, useTheme } from "@mui/material";

interface MemeImageProps {
  meme?: StaticImageWithAlt;
  onClick?: () => void;
}

const MemeImage = ({ meme, onClick }: MemeImageProps): JSX.Element => {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {meme && (
        <Image
          src={meme}
          alt={meme.alt}
          style={{
            maxWidth: "90vw",
            maxHeight: matchesSm ? "60vh" : "80vh",
            width: "auto",
            height: "auto",
          }}
          onClick={onClick}
          placeholder="blur"
        />
      )}
    </>
  );
};

export { MemeImage };
