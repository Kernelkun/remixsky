import React from "react";
import { Await, Link, useLoaderData } from "react-router";

import type { FeedViewPost } from "@atproto/api/src/client/types/app/bsky/feed/defs";

import Post from "~/components/Post/Post";
import { agent } from "~/lib/api";

import type { Route } from "./+types/dashboard";
// https://blog.jobins.jp/how-to-set-border-lines-on-a-css-grid-layout
import styles from "./dashboard.client.css?url";

// https://remix.run/docs/en/main/styling/css
export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export async function loader({}: Route.LoaderArgs) {
  const feed = agent.getTimeline({ cursor: "", limit: 50 });

  const profile = agent.getProfile({ actor: agent.session?.did ?? "" });
  return { feed, profile };
}

export default function Dashboard() {
  const { feed, profile } = useLoaderData<typeof loader>();

  return (
    <div className="grid-container font-serif grayscale">
      <div className="grid-item p-4">
        <React.Suspense fallback={<p>Loading...</p>}>
          <Await resolve={profile}>
            {(response) => {
              const { displayName, handle } = response?.data || {};
              return (
                <>
                  <p className="font-bold text-5xl">{displayName}</p>
                  <p className="">{handle}</p>
                  <p className="mt-4">
                    <Link to="/logout">Logout</Link>
                  </p>
                </>
              );
            }}
          </Await>
        </React.Suspense>
      </div>

      <div className="grid-item main-column py-2 px-4 max-h-dvh">
        <div className="overflow-y-auto grid">
          <React.Suspense fallback={<p>Loading...</p>}>
            <Await resolve={feed}>
              {({ data: { feed: postsArray } }) => {
                return ((postsArray as FeedViewPost[]) || []).map(
                  ({ post }) => {
                    return (
                      <div className="w-full post-item py-4" key={post.cid}>
                        <div className="flex flex-row items-center">
                          <img
                            src={post.author.avatar}
                            alt={post.author.handle}
                            className="h-12 w-12 rounded-full"
                          />

                          <div className="ml-4">
                            <p className="text-lg font-medium">
                              {post.author.displayName}
                            </p>

                            <p>@{post.author.handle}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Post post={post} />
                        </div>
                      </div>
                    );
                  },
                );
              }}
            </Await>
          </React.Suspense>
        </div>
      </div>

      <div className="grid-item">Third column</div>
    </div>
  );
}
