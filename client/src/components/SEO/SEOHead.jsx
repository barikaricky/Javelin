import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false
}) => {
  const siteUrl = 'https://www.javelinassociates.com';
  const siteName = 'Javelin Associates Security Services';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  
  const defaultTitle = 'Javelin Security Services Nigeria | #1 Professional Security Company Lagos Abuja';
  const defaultDescription = "Nigeria's leading security company providing professional armed guards, VIP protection, corporate security, event security, residential security & 24/7 surveillance services in Lagos, Abuja, Port Harcourt. Licensed by NSCDC. Call now for free quote!";
  const defaultKeywords = 'security company Nigeria, security services Lagos, security guards Nigeria, armed guards Lagos, VIP protection Nigeria, executive protection Lagos, corporate security Abuja, event security Nigeria, private security company Nigeria, security agency Lagos, bodyguards Nigeria, residential security Lagos, commercial security Abuja, security consultants Nigeria, CCTV monitoring Lagos, surveillance services Nigeria, security company Port Harcourt, best security company Nigeria, top security firms Lagos, professional guards Abuja, security personnel Nigeria, manned guarding Lagos, static guards Nigeria, mobile patrol Lagos, access control Nigeria, fire watch security, industrial security Lagos, oil and gas security Nigeria, bank security Lagos, hotel security Nigeria, school security Lagos, church security Nigeria, estate security Lagos, warehouse security Abuja';
  
  const fullTitle = title ? `${title} | Javelin Associates Security Nigeria` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      <html lang="en-NG" />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={siteName} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={fullUrl} />

      <meta name="geo.region" content="NG" />
      <meta name="geo.placename" content="Lagos, Nigeria" />
      <meta name="geo.position" content="6.5244;3.3792" />
      <meta name="ICBM" content="6.5244, 3.3792" />
      <meta name="language" content="English" />
      <meta name="coverage" content="Nigeria" />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_NG" />
      <meta property="og:site_name" content={siteName} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@javelinsecurity" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      <meta name="theme-color" content="#003A67" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Javelin Security" />
      <meta name="application-name" content="Javelin Security" />
    </Helmet>
  );
};

export default SEOHead;
