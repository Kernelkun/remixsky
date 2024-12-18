import { AtpAgent, type AtpSessionData } from "@atproto/api";
import type { ComAtprotoServerCreateSession } from "@atproto/api/src/client";

// import type { AtpAgentLoginOpts } from "@atproto/api/src/types";
// import { jwtDecode } from "jwt-decode";
//
// export function isSessionExpired(accessJwt: string | undefined) {
//   try {
//     if (accessJwt) {
//       const decoded = jwtDecode(accessJwt);
//       if (decoded.exp) {
//         const didExpire = Date.now() >= decoded.exp * 1000;
//         return didExpire;
//       }
//     }
//   } catch (e) {
//     console.error(`session: could not decode jwt`);
//   }
//   return true;
// }

export const dataToSession = (
  data: ComAtprotoServerCreateSession.Response["data"],
) => {
  return {
    refreshJwt: data.refreshJwt,
    accessJwt: data.accessJwt,
    handle: data.handle,
    did: data.did,
    email: data.email,
    emailConfirmed: data.emailConfirmed,
    emailAuthFactor: data.emailAuthFactor,
    active: !!data.active,
    status: data.status,
  } as AtpSessionData;
};

export const agent = new AtpAgent({
  // This is the AppView URL
  // service: "https://public.api.bsky.app",

  // If you were making an authenticated client, you would
  // use the PDS URL here instead - the main one is bsky.social
  service: "https://bsky.social",
});
