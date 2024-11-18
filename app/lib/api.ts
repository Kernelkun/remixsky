import { AtpAgent } from "@atproto/api";

export const agent = new AtpAgent({
  // This is the AppView URL
  service: "https://public.api.bsky.app",

  // If you were making an authenticated client, you would
  // use the PDS URL here instead - the main one is bsky.social
  // service: "https://bsky.social",
});
