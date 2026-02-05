import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url = "", type = "website", image, schema, keywords }) => {
  const siteTitle = "Floureto Férigoule | Méthode Poyet Pierrefonds";
  const fullTitle = title ? `${title} | Floureto Férigoule` : siteTitle;
  
  const defaultDesc = "Cabinet de Méthode Poyet et Somatothérapie à Pierrefonds (60). Une approche manuelle douce pour l'harmonisation du corps.";
  const metaDesc = description || defaultDesc;
  
  const siteUrl = "https://flouretoferigoule-methodepoyet.fr";
  const fullUrl = `${siteUrl}${url}`;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;