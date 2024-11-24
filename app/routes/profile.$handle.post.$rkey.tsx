import { LoaderFunctionArgs } from "@remix-run/router";
import { useLoaderData } from "@remix-run/react";
import { agent } from "~/lib/api";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import Post from "~/components/Post/Post";

type Params = {
  handle: string;
  rkey: string;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const typedParams = params as Params;
  const uri = `at://${decodeURIComponent(typedParams.handle)}/app.bsky.feed.post/${
    typedParams.rkey
  }`;

  const thread = await agent.getPostThread({
    uri: uri,
  });

  if (!AppBskyFeedDefs.isThreadViewPost(thread.data.thread))
    throw new Error("Expected a thread view post");

  const post = thread.data.thread.post;

  if (!AppBskyFeedPost.isRecord(post.record))
    throw new Error("Expected a post with a record");

  return { post, thread };
}

export default function PostView() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="grid min-h-screen place-items-center">
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
          <Post post={post as AppBskyFeedDefs.PostView} />
        </div>
      </div>
    </div>
  );
}
