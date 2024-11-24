import { LoaderFunctionArgs } from "@remix-run/router";
import { authenticator } from "~/services/auth.server";
import { agent } from "~/lib/api";
import { redirect, useLoaderData } from "@remix-run/react";
import Post from "~/components/Post/Post";
import { FeedViewPost } from "@atproto/api/src/client/types/app/bsky/feed/defs";

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
  const { postsArray } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      {(postsArray as FeedViewPost[]).map(({ post }) => {
        return (
          <div className="w-full max-w-sm">
            <div className="flex flex-row items-center">
              <img
                src={post.author.avatar}
                alt={post.author.handle}
                className="h-12 w-12 rounded-full"
              />

              <div className="ml-4">
                <p className="text-lg font-medium">{post.author.displayName}</p>

                <p>@{post.author.handle}</p>
              </div>
            </div>

            <div className="mt-4">
              <Post post={post} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
