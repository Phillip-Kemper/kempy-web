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
      <h1 className="text-2xl font-bold">📚 Writing</h1>

      {allPostsData.map(({ date, title, id }: any) => (
        <a
          key={id}
          href={`/posts/${id}`}
          className="pt-4 block transform transition-all duration-300 ease-out hover:scale-105 group"
        >
          <h2 className="text-lg font-bold text-gray-100 group-hover:text-white">{title}</h2>
          <h2 className="mb-1.5 text-sm text-gray-400 group-hover:text-gray-200">
            <Date dateString={date} />
          </h2>
        </a>
      ))}

      <h1 className="pt-8 text-2xl font-bold">🎓 Education</h1>

      <div className="group block transform transition-all duration-300 ease-out hover:scale-105">
        <h2 className="text-lg font-bold text-gray-100 group-hover:text-white">
          M. Sc. Informatics at Technical University Munich
        </h2>
        <h3 className="text-sm font-bold text-gray-400 group-hover:text-gray-200">2021-2023</h3>
      </div>
      <div className="group block transform transition-all duration-300 ease-out hover:scale-105">
        <h2 className="pt-4 text-lg font-bold text-gray-100 group-hover:text-white">
          B. Sc. Computer Science at RWTH Aachen University
        </h2>
        <h3 className="text-sm font-bold text-gray-400 group-hover:text-gray-200">2017-2021</h3>
      </div>
    </Main>
  );
};

export default Index;
