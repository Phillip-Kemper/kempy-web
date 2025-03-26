import Head from 'next/head';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
    locale: string;
    type: string;
  };
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
};

const Meta = (props: IMetaProps) => {
  const canonical = props.canonical || 'https://kemperino.com';
  const keywords =
    props.keywords?.join(', ') ||
    'blog, technology, programming, web development';

  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta
        property="og:title"
        content={props.openGraph?.title || props.title}
      />
      <meta
        property="og:description"
        content={props.openGraph?.description || props.description}
      />
      <meta property="og:url" content={props.openGraph?.url || canonical} />
      <meta
        property="og:site_name"
        content={props.openGraph?.siteName || 'Kemperino'}
      />
      <meta property="og:locale" content={props.openGraph?.locale || 'en_US'} />
      <meta property="og:type" content={props.openGraph?.type || 'website'} />
      {props.openGraph?.images.map((image) => (
        <meta
          key={image.url}
          property="og:image"
          content={image.url}
          data-width={image.width}
          data-height={image.height}
          data-alt={image.alt}
        />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={props.openGraph?.title || props.title}
      />
      <meta
        name="twitter:description"
        content={props.openGraph?.description || props.description}
      />
      {props.openGraph?.images.map((image) => (
        <meta key={image.url} name="twitter:image" content={image.url} />
      ))}

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Phillip Kemper" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="generator" content="Next.js" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: props.title,
            description: props.description,
            url: canonical,
            datePublished: props.datePublished || new Date().toISOString(),
            dateModified: props.dateModified || new Date().toISOString(),
            author: {
              '@type': 'Person',
              name: 'Phillip Kemper',
              url: 'https://kemperino.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Kemperino',
              logo: {
                '@type': 'ImageObject',
                url: 'https://kemperino.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonical,
            },
          }),
        }}
      />
    </Head>
  );
};

export { Meta };
