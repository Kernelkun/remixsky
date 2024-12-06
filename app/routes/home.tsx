import {
  type ActionFunctionArgs,
  type MetaFunction,
  useFetcher,
} from "react-router";
import { agent } from "~/lib/api";

export const meta: MetaFunction = () => {
  return [
    { title: "New React-Router v7 App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  // return await authenticator.authenticate("user-pass", request, {
  //   successRedirect: "/dashboard",
  //   failureRedirect: "/",
  // });
  const form = await request.formData();
  let identifier = form.get("identifier") as string;
  let password = form.get("password") as string;
  const user = await agent.login({ identifier, password });
  console.log(user);
  return null;
}

export default function Home() {
  const fetcher = useFetcher();

  return (
    <div className="h-full p-5 text-neutral-800 font-serif">
      <div className="h-full border-neutral-800 border-[10px] relative">
        <header className="p-10">
          <h1 className="text-5xl uppercase tracking-widest">.send</h1>
        </header>

        <div className="bg-neutral-800 h-[60%] w-[70%] max-w-[70rem] absolute bottom-24 right-40 text-stone-50 p-10 flex flex-col justify-end">
          <p className="text-7xl h-min tracking-wide">
            A minimal client for Bsky
          </p>
        </div>

        <div className="border-neutral-800 border-4 bg-stone-50 absolute right-12 max-w-[35rem] w-[45%] h-[40%] grid place-items-center">
          <fetcher.Form method="POST" className="flex flex-col w-min gap-4">
            <label>
              <span className="text-lg">Identifier</span>
              <input
                className="px-1 bg-slate-50 border-neutral-800 border-2"
                name="identifier"
                type="text"
                required
              />
            </label>

            <label>
              <span className="text-lg">Password</span>
              <input
                className="px-1 bg-slate-50 border-neutral-800 border-2"
                name="password"
                type="password"
                required
              />
            </label>

            <button
              className="p-2 bg-neutral-800 border-2 text-stone-50 mt-4"
              type="submit"
            >
              Submit
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
