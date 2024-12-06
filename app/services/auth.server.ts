import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { agent, login } from "~/lib/api";
import { ComAtprotoServerCreateSession } from "@atproto/api/src/client";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator =
  new Authenticator<ComAtprotoServerCreateSession.Response>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let identifier = form.get("identifier") as string;
    let password = form.get("password") as string;

    console.log({ sessionManager: agent.sessionManager });

    let user = await login({ identifier, password });
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass",
);
