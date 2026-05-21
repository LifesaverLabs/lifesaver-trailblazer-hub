import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://lifesaverlabs.org";

const PageMeta = ({ title, description, path, jsonLd }: PageMetaProps) => {
  const url = `${BASE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(block)}</script>
      ))}
    </Helmet>
  );
};

export default PageMeta;