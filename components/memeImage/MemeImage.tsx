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
            width: "auto",
            height: "auto",
            maxWidth: meme.width > meme.height ? "100%" : "auto",
            maxHeight: matchesSm ? meme.height > (window.innerHeight * 0.60) ? "60vh" : "78vh" : "78vh",
          }}
          onClick={onClick}
          title={meme.alt}
        />
      )}
    </>
  );
};

export { MemeImage };
