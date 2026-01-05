import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords = '',
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  author = 'Bedeew Digital',
  publishedTime = '',
  modifiedTime = ''
}) => {
  const siteName = 'Bedeew Digital';
  const siteUrl = 'https://bedeew.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullTitle = title ? `${title} | ${siteName} Dakar` : `${siteName} - Agence Digitale à Dakar`;
  const defaultDescription = 'Bedeew Digital - Agence de communication digitale à Dakar, Sénégal. Développement web, marketing digital, design graphique et formations.';
  const metaDescription = description || defaultDescription;
  const defaultKeywords = 'agence digitale Dakar, marketing digital Dakar, développement web Dakar, design graphique Dakar, SEO Dakar';
  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_SN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />

      {/* Article specific (for blog posts) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="SN-DK" />
      <meta name="geo.placename" content="Dakar" />
      <meta name="geo.position" content="14.6928;-17.4467" />
    </Helmet>
  );
};

export default SEO;
