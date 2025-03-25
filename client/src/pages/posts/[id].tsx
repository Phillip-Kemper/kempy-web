import Date from '@/components/date';
import { Meta } from '@/components/Meta';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { Main } from '@/templates/Main';

export default function Post({ postData }: { postData: any }) {
  const canonical = `https://kemperino.com/posts/${postData.id}`;
  const description = postData.excerpt || postData.title;

  return (
    <Main
      meta={
        <Meta
          title={postData.title}
          description={description}
          canonical={canonical}
          openGraph={{
            title: postData.title,
            description,
            url: canonical,
            siteName: 'Kempy',
            images: [
              {
                url: 'https://kemperino.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: postData.title,
              },
            ],
            locale: 'en_US',
            type: 'article',
          }}
        />
      }
    >
      <article className="markdown-container katex-container">
        <div className="border-b border-white">
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
