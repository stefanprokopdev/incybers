/**
 * Typed custom fields from docusaurus.config.js customFields.
 * Use in pages: (siteConfig.customFields as CustomSiteFields).common
 */
export interface FirebaseCustomFields {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
}

export interface CustomSiteFields {
  firebase?: FirebaseCustomFields;
  common: {
    metaDescription: string;
    title: string;
    tagline: string;
  };
  apiAuditHvoc: {
    token: string;
    header: string;
    description: string;
    title: string;
    metaDescription: string;
    fileUrl: string;
    image: string;
    formActionUrl: string;
    orderFormUrl: string;
    cta: string;
    chapters: string[];
    parameters: { name: string; content: string }[];
  };
  courseUnhackable: {
    showForm: boolean;
    token: string;
    header: string;
    description: string;
    title: string;
    metaDescription: string;
    fileUrl: string;
    image: string;
    ogImage: string;
    formActionUrl: string;
    orderFormUrl: string;
    cta: string;
    chapters: string[];
    parameters: { name: string; content: string }[];
  };
  [key: string]: unknown;
}
