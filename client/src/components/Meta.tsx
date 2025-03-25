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
};

const Meta = (props: IMetaProps) => {
  const canonical = props.canonical || 'https://kemperino.com';

  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
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
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            author: {
              '@type': 'Person',
              name: 'Phillip Kemper',
            },
          }),
        }}
      />
    </Head>
  );
};

export { Meta };
