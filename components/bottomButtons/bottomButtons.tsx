import { StaticImageWithAlt } from "@/programming memes";
import useDownloader from "react-use-downloader";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { RandomButton } from "../randomButton";

interface DownloadButtonProps {
  meme: StaticImageWithAlt;
  setRandomMeme: () => void;
}

const BottomButtons = ({
  meme,
  setRandomMeme,
}: DownloadButtonProps): JSX.Element => {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { download } = useDownloader();
  const copyToClipboard = async () => {
    if (meme) {
      await navigator.clipboard.writeText(
        `${window.location.origin}${meme.src}`
      );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        position: matchesSm ? "absolute" : "relative",
        bottom: 0,
        order: matchesSm ? 2 : 1,
      }}
      pb={matchesSm ? 1 : 0}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={() => download(meme.src, `${meme?.alt}.${meme?.extension}`)}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={copyToClipboard}
        >
          Copy
        </Button>
      </Box>
      <RandomButton onClick={setRandomMeme} label="Random meme!" fullWidth />
    </Box>
  );
};

export { BottomButtons };
