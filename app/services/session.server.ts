// export the whole sessionStorage object
import { createCookieSessionStorage } from "react-router";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["s3cret1"], // replace this with an actual secret
    secure: import.meta.env.PROD, // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;
