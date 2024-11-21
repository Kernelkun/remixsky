import React from "react";
import { LoaderFunctionArgs } from "@remix-run/router";
import { authenticator } from "~/services/auth.server";
import { agent } from "~/lib/api";
import { redirect, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  if (!user) {
    throw redirect("/");
  }
  const {
    data: { feed: postsArray, cursor: nextPage },
  } = await agent.getTimeline({ cursor: "", limit: 50 });

  return { postsArray, nextPage };
}

export default function Dashboard() {
  const { postsArray, nextPage } = useLoaderData<typeof loader>();
  console.log({ postsArray, nextPage });
  return (
    <div className="flex flex-col gap-4">
      {postsArray.map(({ post, reply }) => {
        return (
          <div className="flex flex-col gap-4 border-2 border-slate-600 rounded">
            <p>{post.author.displayName}</p>
            <p>{post.record.text}</p>
          </div>
        );
      })}
    </div>
  );
}
