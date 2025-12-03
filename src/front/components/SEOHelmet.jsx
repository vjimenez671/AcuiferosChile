import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/**
 * SEOHelmet Component
 * Maneja dinámicamente:
 * - Canonical URLs
 * - Hreflang tags (internacionalización)
 * - Meta tags específicos por página
 * - Breadcrumbs Schema.org
 */
export const SEOHelmet = ({ 
  title, 
  description, 
  breadcrumbs = [],
  noIndex = false 
}) => {
  const location = useLocation();
  const baseUrl = 'https://acuiferoschile.cl';
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Generar breadcrumbs schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url ? `${baseUrl}${crumb.url}` : undefined
    }))
  } : null;

  return (
    <Helmet>
      {/* Title y Description */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Hreflang tags - Español Chile (principal) */}
      <link rel="alternate" hreflang="es-cl" href={currentUrl} />
      <link rel="alternate" hreflang="es" href={currentUrl} />
      <link rel="alternate" hreflang="x-default" href={currentUrl} />

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Breadcrumbs Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};
