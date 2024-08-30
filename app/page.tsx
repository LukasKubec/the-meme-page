import { loadMemes } from "@/programming memes";
import { use } from "react";
import { MemePageClientContent } from "./memePageClientContent";

export default function Home() {
  const memes = use(loadMemes());

  if (!memes) return null;

  return <MemePageClientContent memes={memes} />;
}
