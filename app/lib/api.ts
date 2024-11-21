import { AtpAgent } from "@atproto/api";
import type { AtpAgentLoginOpts } from "@atproto/api/src/types";

export const agent = new AtpAgent({
  // This is the AppView URL
  // service: "https://public.api.bsky.app",

  // If you were making an authenticated client, you would
  // use the PDS URL here instead - the main one is bsky.social
  service: "https://bsky.social",
});

export function login({
  identifier,
  password,
  authFactorToken = undefined,
}: AtpAgentLoginOpts) {
  return agent.login({ identifier, password, authFactorToken });
}
