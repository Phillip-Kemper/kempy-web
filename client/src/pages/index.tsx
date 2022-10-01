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
        Software | Data Engineer looking for problems to solve.
      </h1>
    </Main>
  );
};

export default Index;
