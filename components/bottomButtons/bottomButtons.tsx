import { StaticImageWithAlt } from "@/programming memes";
import useDownloader from "react-use-downloader";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RandomButton } from "../randomButton";
import { useState } from "react";

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
  const [clipBoardError, setClipBoardError] = useState(false);
  const { download } = useDownloader();

  const copyToClipboard = async () => {
    if (meme) {
      try {
        const img = await fetch(meme.src);
        const imgBlob = await img.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [imgBlob.type]: imgBlob,
          }),
        ]);
        console.log("Image copied to clipboard");
      } catch (error) {
        console.error("Failed to copy image: ", error);
        setClipBoardError(true);
      }
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
          aria-label="Download image"
        >
          Download
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={copyToClipboard}
          aria-label="Copy image to clipboard"
        >
          Copy
        </Button>
      </Box>
      {clipBoardError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to copy image to clipboard.
        </Alert>
      )}
      <RandomButton onClick={setRandomMeme} label="Random meme!" fullWidth />
    </Box>
  );
};

export { BottomButtons };
