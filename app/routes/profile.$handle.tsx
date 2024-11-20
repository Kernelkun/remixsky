import React from "react";
import { LoaderFunctionArgs } from "@remix-run/router";
import { agent } from "~/lib/api";
import { useLoaderData } from "@remix-run/react";

type Params = {
  handle: string;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const typedParams = params as Params;

  const profile = await agent.getProfile({ actor: typedParams.handle });

  const feed = await agent.getAuthorFeed({ actor: typedParams.handle });

  return { feed, profile };
}

const ProfileHandle = () => {
  const { profile } = useLoaderData<typeof loader>();
  return (
    <div>
      <img alt="" src={profile.data.avatar} />
      <p>DisplayName: {profile.data.displayName}</p>
      <p>Description: {profile.data.description}</p>
    </div>
  );
};

export default ProfileHandle;
