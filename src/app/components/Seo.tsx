import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.valdeloirevi.fr";
const SITE_NAME = "VAL DE LOIRE V.I";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface Props {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
}

export function Seo({
  title,
  description,
  path = "/",
  image,
  noindex = false,
  type = "website",
  publishedAt,
  updatedAt,
  author,
}: Props) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {type === "article" && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === "article" && updatedAt && (
        <meta property="article:modified_time" content={updatedAt} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
}
