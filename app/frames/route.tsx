/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { appURL } from "../utils";

const frameHandler = frames(async (ctx) => {
  return {
    image: `${appURL()}/maschine.png`,
    buttons: [
      <Button
        action="link"
        target="https://warpcast.com/maschine/0x223ce762"
      >
        Let&apos;s build
      </Button>,
      <Button
        action="link"
        target="https://hypersub.xyz/s/maschine-10v1dj0ipor28"
      >
        Hypersub
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
