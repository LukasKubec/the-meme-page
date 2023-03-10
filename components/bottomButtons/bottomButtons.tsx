import { StaticImageWithAlt } from "@/programming memes";
import useDownloader from "react-use-downloader";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";

interface DownloadButtonProps {
  meme?: StaticImageWithAlt;
}

const BottomButtons = ({ meme }: DownloadButtonProps): JSX.Element => {
  const { download } = useDownloader();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  const copyToClipboard = async () => {
    if (meme) {
      await navigator.clipboard.writeText(
        `${window.location.origin}${meme.src}`
      );
    }
  };

  return (
    <>
      {meme && meme?.alt && (
        <Box
          display="flex"
          flexDirection={matchesSm ? "column" : "row"}
          alignItems="center"
        >
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={() =>
              download(meme.src, `${meme?.alt}.${meme?.extension}`)
            }
            sx={matchesSm ? { marginBottom: "1rem" } : { marginRight: "1rem" }}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={copyToClipboard}
          >
            Copy path to clipboard
          </Button>
        </Box>
      )}
    </>
  );
};

export { BottomButtons };
