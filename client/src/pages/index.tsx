import { Meta } from "@/layouts/Meta";
import { getSortedPostsData } from "@/lib/posts";
import Date from "@/components/date"; 
// eslint-disable-next-line import/extensions
import { Main } from "@/templates/Main";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}


const Index = ({allPostsData}) => {
  return (
    <Main meta={<Meta title="Phillip Kemper" description="Phillip Kemper." />}>
      <h1 className="text-2xl font-bold">📚 Blog.</h1>
      <a href="https://twitter.com/Kemperino_" className="text-white font-bold">
        <h2 className="text-lg ">
          A Primer on Data Availability For ZK Rollups
        </h2>
        <h2 className="text-sm ">June 2023</h2>
      </a>

          {allPostsData.map(({ date, title, id}) => (
      <a href={"/posts/"+id} className="pt-4 text-white font-bold">
      <h2 className="text-lg ">
        {title}
      </h2>
      <h2 className="text-sm ">
              <Date dateString={date} />
      </h2>
    </a>
          ))}

      <h1 className="pt-8 text-2xl font-bold">🎓 Education.</h1>
      <h2>M. Sc. Informatics Candidate at Technical University Munich.</h2>
      <h2>B. Sc. Computer Science at RWTH Aachen University.</h2>

      <h1 className="pt-8 text-2xl font-bold">📫 Contact.</h1>
      <h2>first name at last name dot tum dot de</h2>

      <a href="https://drive.google.com/file/d/126z1XVnPJy4HbYTS3N53VDX47dRcHzHu/view?usp=drive_link">
        check out my cv
      </a>
    </Main>
  );
};

export default Index;
