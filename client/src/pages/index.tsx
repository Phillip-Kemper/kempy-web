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

      <h1 className="">
        Computer Science Student at Technical University Munich.
      </h1>
      <h1 className="">B. Sc. Computer Science at RWTH Aachen University.</h1>
    </Main>
  );
};

export default Index;
