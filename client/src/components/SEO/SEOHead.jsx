import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title,
  description,
  keywords,
  image = '/images/javelin-og-image.jpg',
  url,
  type = 'website'
}) => {
  const siteUrl = 'https://www.javelinassociates.org';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  const defaultTitle = 'Javelin Security Services Nigeria | Professional Security Company';
  const defaultDescription = "Nigeria's leading security company providing professional armed & unarmed guards, CCTV monitoring, VIP protection, event security, and corporate security services in Lagos, Abuja, and nationwide.";
  
  const fullTitle = title ? `${title} | Javelin Associates Security` : defaultTitle;
  const fullDescription = description || defaultDescription;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
};

export default SEOHead;
