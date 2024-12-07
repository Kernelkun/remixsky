import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import type { ComAtprotoServerCreateSession } from "@atproto/api/src/client";

import { agent } from "~/lib/api";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator =
  new Authenticator<ComAtprotoServerCreateSession.Response>();

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let identifier = form.get("identifier") as string;
    let password = form.get("password") as string;
    let user = await agent.login({ identifier, password });
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "login",
);
