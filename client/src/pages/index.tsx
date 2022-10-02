import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
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
        Software Engineer looking for problems to solve.
      </h1>

      <img src="/assets/images/Image.png" className="w-1/5" />

      <h1 className="">
        Computer Science Student at Technical University Munich.
      </h1>
      <h1 className="">B. Sc. Computer Science at RWTH Aachen University.</h1>

      <h1 className="text-2xl font-bold pt-8">Current Projects</h1>
      <h2>Counting Game</h2>
      <h2>Notion Table Embedder</h2>
      <h2>Raycast Extension</h2>

      <h1 className="text-2xl font-bold pt-8">Blog</h1>
      <h2>to be continued...</h2>
    </Main>
  );
};

export default Index;
