import Image from "next/image";
import { StaticImageWithAlt } from "@/programming memes";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSwipe } from "@/lib";

interface MemeImageProps {
  meme: StaticImageWithAlt | undefined;
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
        />
      )}
    </>
  );
};

export { MemeImage };