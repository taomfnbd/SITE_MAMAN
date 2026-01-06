import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url = "", type = "website" }) => {
  const siteTitle = "Floureto Férigoule | Méthode Poyet Pierrefonds";
  const fullTitle = title ? `${title} | Floureto Férigoule` : siteTitle;
  
  const defaultDesc = "Cabinet de Méthode Poyet et Somatothérapie à Pierrefonds (60). Une approche manuelle douce pour l'harmonisation du corps.";
  const metaDesc = description || defaultDesc;
  
  const siteUrl = "https://flouretoferigoule-methodepoyet.fr";
  const fullUrl = `${siteUrl}${url}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
    </Helmet>
  );
};

export default SEO;