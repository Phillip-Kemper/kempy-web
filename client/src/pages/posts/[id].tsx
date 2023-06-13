import Head from 'next/head';

import { Main } from '@/templates/Main';

import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }: { postData: any }) {
  return (
    <Main meta={undefined}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <div className="border-b border-white ">
          <h1 className="text-3xl">{postData.title}</h1>
          <div className="pb-8 text-2xl">
            <Date dateString={postData.date} />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Main>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
