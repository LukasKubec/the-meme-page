"use client";
import { useNavigationContext } from "../../lib";
import { Typography } from "@mui/material";
import Link from "next/link";
import { OpenInNewOutlined } from "@mui/icons-material";

const AboutPage = (): JSX.Element => {
  useNavigationContext("About");
  return (
    <Typography variant="body1" align="center" margin={1}>
      This website is my sandbox to play with NextJS. Check out{" "}
      <Link href="https://github.com/LukasKubec/the-meme-page" target="_blank">
        Github <OpenInNewOutlined />
      </Link>
      .
    </Typography>
  );
};

export default AboutPage;
