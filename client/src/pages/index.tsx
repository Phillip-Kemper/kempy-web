import Date from '@/components/date';
import * as Meta from '@/layouts/Meta';
import { getSortedPostsData } from '@/lib/posts';
// eslint-disable-next-line import/extensions
import { Main } from '@/templates/Main';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Index = ({ allPostsData }: any) => {
  return (
    <Main
      meta={<Meta.Meta title="Phillip Kemper" description="Phillip Kemper." />}
    >
      <h1 className="text-2xl font-bold">📚 Blog</h1>

      {allPostsData.map(({ date, title, id }: any) => (
        <a
          key={id}
          href={`/posts/${id}`}
          className="pt-4 font-bold text-white "
        >
          <h2 className="text-lg ">{title}</h2>
          <h2 className="mb-1.5 text-sm ">
            <Date dateString={date} />
          </h2>
        </a>
      ))}

      <h1 className="pt-8 text-2xl font-bold">🎓 Education</h1>

      <h2 className="text-lg font-bold">
        M. Sc. Informatics at Technical University Munich
      </h2>
      <h3 className="text-sm font-bold">2021-2023</h3>

      <h2 className="pt-4 text-lg font-bold">
        B. Sc. Computer Science at RWTH Aachen University
      </h2>
      <h3 className="text-sm font-bold">2017-2021</h3>

    </Main>
  );
};

export default Index;
