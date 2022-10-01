import { useRouter } from "next/router";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Phillip Kemper"
          description="Welcome to Kempy's Playground."
        />
      }
    >
      <h1 className="text-2xl font-bold">
        Boilerplate code for your Nextjs project with Tailwind CSS
      </h1>
    </Main>
  );
};

export default Index;
