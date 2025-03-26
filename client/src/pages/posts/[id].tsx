import Date from '@/components/date';
import { Meta } from '@/components/Meta';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { Main } from '@/templates/Main';

// Function to extract keywords from content
function extractKeywords(content: string): string[] {
  // Remove HTML tags and convert to lowercase
  const text = content.replace(/<[^>]*>/g, '').toLowerCase();

  // Split into words and filter out common words
  const words = text.split(/\s+/);
  const commonWords = new Set([
    'the',
    'be',
    'to',
    'of',
    'and',
    'a',
    'in',
    'that',
    'have',
    'i',
    'it',
    'for',
    'not',
    'on',
    'with',
    'he',
    'as',
    'you',
    'do',
    'at',
  ]);

  // Count word frequencies
  const wordCount = new Map<string, number>();
  words.forEach((word) => {
    if (!commonWords.has(word) && word.length > 3) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  });

  // Sort by frequency and take top 10
  return Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}

export default function Post({ postData }: { postData: any }) {
  const canonical = `https://kemperino.com/posts/${postData.id}`;
  const description = postData.excerpt || postData.title;
  const keywords = extractKeywords(postData.contentHtml);

  return (
    <Main
      meta={
        <Meta
          title={postData.title}
          description={description}
          canonical={canonical}
          keywords={keywords}
          datePublished={postData.date}
          dateModified={postData.date}
          openGraph={{
            title: postData.title,
            description,
            url: canonical,
            siteName: 'Kemperino',
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
