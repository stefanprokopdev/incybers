import Head from "@docusaurus/Head";
import React, { JSX } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "course" | "event";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export default function SEOHead({
  title,
  description,
  image = "/img/logo-ctverec.png",
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  keywords,
  noindex = false,
  nofollow = false,
}: SEOHeadProps): JSX.Element {
  const baseUrl = "https://outcybers.net";
  const fullUrl = url ? (url.startsWith("http") ? url : `${baseUrl}${url}`) : baseUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const robotsContent = [];
  if (noindex) {
    robotsContent.push("noindex");
  } else {
    robotsContent.push("index");
  }
  if (nofollow) {
    robotsContent.push("nofollow");
  } else {
    robotsContent.push("follow");
  }
  robotsContent.push("max-image-preview:large", "max-snippet:-1", "max-video-preview:-1");

  return (
    <Head>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robotsContent.join(", ")} />
      <meta name="googlebot" content={robotsContent.join(", ")} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description.substring(0, 200)} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Outcybers" />
      <meta property="og:locale" content="cs_CZ" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@outcybers" />
      <meta name="twitter:creator" content="@outcybers" />

      {type === "article" && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {keywords && keywords.map((keyword, i) => <meta key={i} property="article:tag" content={keyword} />)}
        </>
      )}

      <link rel="canonical" href={fullUrl} />

      <meta httpEquiv="content-language" content="cs" />
      <link rel="alternate" hrefLang="cs" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Head>
  );
}
