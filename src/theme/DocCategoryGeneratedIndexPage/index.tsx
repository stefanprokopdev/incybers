import { useLocation } from '@docusaurus/router';
import ArticleAnnotation from '@site/src/components/ArticleAnnotation';
import { articleAnnotations } from '@site/src/components/ArticleAnnotation/articleData';
import DocCategoryGeneratedIndexPage from '@theme-original/DocCategoryGeneratedIndexPage';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import React from 'react';

export default function DocCategoryGeneratedIndexPageWrapper(props: any): React.JSX.Element {
  const location = useLocation();
  // Normalize pathname - try multiple variants for matching
  const pathname = location.pathname;
  const pathWithSlash = pathname.endsWith('/') ? pathname : pathname + '/';
  const pathWithoutSlash = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Try to find annotation data with different path variants
  let annotationData = articleAnnotations[pathname] 
    || articleAnnotations[pathWithSlash] 
    || articleAnnotations[pathWithoutSlash];
  
  // If still not found, try fuzzy matching (normalize dashes and compare)
  if (!annotationData) {
    // Normalize pathname: remove trailing slash, lowercase, normalize dashes
    const normalizePath = (path: string) => 
      path.toLowerCase().replace(/\/$/, '').replace(/--+/g, '-');
    
    const normalizedPathname = normalizePath(pathname);
    
    for (const [key, value] of Object.entries(articleAnnotations)) {
      const normalizedKey = normalizePath(key);
      if (normalizedPathname === normalizedKey) {
        annotationData = value;
        break;
      }
    }
  }
  
  // If still not found, try matching with different dash patterns
  if (!annotationData) {
    // Try replacing double dashes with single dash
    const pathWithSingleDash = pathname.replace(/--/g, '-');
    const pathWithSingleDashWithSlash = pathWithSingleDash.endsWith('/') ? pathWithSingleDash : pathWithSingleDash + '/';
    const pathWithSingleDashWithoutSlash = pathWithSingleDash.endsWith('/') ? pathWithSingleDash.slice(0, -1) : pathWithSingleDash;
    
    annotationData = articleAnnotations[pathWithSingleDash]
      || articleAnnotations[pathWithSingleDashWithSlash]
      || articleAnnotations[pathWithSingleDashWithoutSlash];
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
        <DocCategoryGeneratedIndexPage {...props} />
      </div>
    </>
  );
}
