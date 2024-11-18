import type { MetaFunction } from "@remix-run/node";
import { agent } from "~/lib/api";
import { Link, useLoaderData } from "@remix-run/react";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const EXAMPLE_POST =
    "at://did:plc:vwzwgnygau7ed7b7wt5ux7y2/app.bsky.feed.post/3karfx5vrvv23";
  const thread = await agent.app.bsky.feed.getPostThread({
    uri: EXAMPLE_POST,
  });

  if (!AppBskyFeedDefs.isThreadViewPost(thread.data.thread))
    throw new Error("Expected a thread view post");

  const post = thread.data.thread.post;

  if (!AppBskyFeedPost.isRecord(post.record))
    throw new Error("Expected a post with a record");

  return { post, thread };
}

export default function Index() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col gap-4">
        <Link to="http://localhost:3000/profile/did:plc:fpruhuo22xkm5o7ttr2ktxdo/post/3k27cy5if2m2o">
          Text-only post
        </Link>
        <Link to="http://localhost:3000/profile/did:plc:fpgzkz4uvutk2kzgx64nt7vx/post/3lbah3bknp22b">
          Post with link and mention
        </Link>
      </div>
    </div>
  );
}
