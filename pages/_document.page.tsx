import { Html, Head, Main, NextScript } from "next/document";

interface DocumentProps {
  emotionStyleTags: JSX.Element;
}

export default function Document({ emotionStyleTags }: DocumentProps) {
  return (
    <Html lang="en">
      <Head>{emotionStyleTags}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
