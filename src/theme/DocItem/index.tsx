import { useLocation } from '@docusaurus/router';
import ArticleAnnotation from '@site/src/components/ArticleAnnotation';
import { articleAnnotations } from '@site/src/components/ArticleAnnotation/articleData';
import DocItem from '@theme-original/DocItem';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import React from 'react';

export default function DocItemWrapper(props: any): React.JSX.Element {
  const location = useLocation();
  // Normalize pathname - try multiple variants for matching
  const pathname = location.pathname;
  const pathWithSlash = pathname.endsWith('/') ? pathname : pathname + '/';
  const pathWithoutSlash = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Try to find annotation data with different path variants
  // Also try matching by checking if any key starts with or equals the pathname
  let annotationData = articleAnnotations[pathname] 
    || articleAnnotations[pathWithSlash] 
    || articleAnnotations[pathWithoutSlash];
  
  // If still not found, try fuzzy matching (in case of URL encoding differences)
  if (!annotationData) {
    const normalizedPathname = pathname.toLowerCase().replace(/\/$/, '');
    for (const [key, value] of Object.entries(articleAnnotations)) {
      const normalizedKey = key.toLowerCase().replace(/\/$/, '');
      if (normalizedPathname === normalizedKey) {
        annotationData = value;
        break;
      }
    }
  }
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    const shouldLog = pathname.includes('owasp-low-code') || pathname.includes('autentizace') || pathname.includes('jwt');
    if (shouldLog) {
      console.log('DocItem pathname:', pathname);
      console.log('pathWithSlash:', pathWithSlash);
      console.log('pathWithoutSlash:', pathWithoutSlash);
      console.log('Available keys:', Object.keys(articleAnnotations));
      console.log('Found annotation:', !!annotationData);
      if (annotationData) {
        console.log('Annotation data:', annotationData);
      }
    }
  }

  return (
    <>
      <DocBreadcrumbs />
      {annotationData && (
        <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
          <ArticleAnnotation
            icon={annotationData.icon}
            highlightedText={annotationData.highlightedText}
            title={annotationData.title}
            introText={annotationData.introText}
            description={annotationData.description}
            buttonText={annotationData.buttonText}
            buttonLink={annotationData.buttonLink}
            showCloseButton={false}
            showButton={false}
            showDescription={true}
          />
        </div>
      )}
      <div className="doc-item-wrapper">
        <DocItem {...props} />
      </div>
    </>
  );
}
