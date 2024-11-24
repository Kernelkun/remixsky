import { PostView } from "@atproto/api/src/client/types/app/bsky/feed/defs";
import { RichText } from "@atproto/api";
import { Facet } from "@atproto/api/src/rich-text/rich-text";

const Post = ({ post }: { post: PostView }) => {
  const { text, facets } = post.record as { text: string; facets: Facet[]};
  const rt = new RichText({
    text: text,
    facets: facets,
  });

  const textArray = [];

  for (const segment of rt.segments()) {
    switch (true) {
      case segment.isMention(): {
        textArray.push(
          <a
            className="text-blue-500"
            href={`/profile/${segment.mention?.did}`}
          >
            {segment.text}
          </a>,
        );
        break;
      }
      case segment.isLink(): {
        textArray.push(
          <a className="text-blue-500" href={segment.link?.uri}>
            {segment.text}
          </a>,
        );
        break;
      }
      case segment.isTag(): {
        textArray.push(<span className="text-blue-500">{segment.text}</span>);
        break;
      }
      default: {
        textArray.push(segment.text);
      }
    }
  }
  return <p>{textArray}</p>;
};

export default Post;
