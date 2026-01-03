import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Javelin Associates Ltd - Professional Security Company in Rivers State, Port Harcourt, Nigeria',
  description = 'Leading security company in Rivers State, Nigeria. 24/7 armed guards, unarmed security personnel, K-9 units, CCTV surveillance, and professional security services in Port Harcourt.',
  keywords = 'security company Nigeria, security company Rivers State, security services Port Harcourt, armed security guards Nigeria',
  ogImage = '/images/javelin-logo-1.jpg',
  url = 'https://javelinassociates.org',
  type = 'website'
}) => {
  const fullTitle = title.includes('Javelin') ? title : `${title} - Javelin Associates Ltd`;
  const canonicalUrl = `https://javelinassociates.org${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://javelinassociates.org${ogImage}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://javelinassociates.org${ogImage}`} />
    </Helmet>
  );
};

export default SEO;
