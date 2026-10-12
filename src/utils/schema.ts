import { ORGANIZATION_DATA, getOrganizationProvider } from "./schemaConstants";

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  legalName: string;
  url: string;
  logo: string;
  foundingDate?: string;
  description: string;
  email?: string;
  telephone?: string;
  taxID?: string;
  vatID?: string;
  brand?: {
    "@type": string;
    name: string;
  };
  parentOrganization?: {
    "@type": string;
    name: string;
    legalName: string;
  };
  founder?: {
    "@type": string;
    name: string;
    email?: string;
    url?: string;
    sameAs?: string;
  };
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    "@type": string;
    email: string;
    telephone: string;
    contactType: string;
  };
  sameAs: string[];
  keywords: string;
}

export interface ServiceSchema {
  "@context": string;
  "@type": string;
  serviceType: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  description?: string;
  areaServed?:
    | string
    | {
        "@type": string;
        name: string;
      };
  availableChannel: {
    "@type": string;
    serviceUrl: string;
    serviceType?: string;
  };
  audience?: {
    "@type": string;
    audienceType: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount?: string;
  };
  keywords?: string;
}

export interface CourseSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  courseCode?: string;
  educationalLevel?: string;
  inLanguage?: string;
  teaches?: string;
  duration?: string;
  timeRequired?: string;
  audience?: {
    "@type": string;
    educationalRole: string;
  };
  keywords?: string;
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  potentialAction?: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export function getOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_DATA.name,
    legalName: ORGANIZATION_DATA.legalName,
    url: ORGANIZATION_DATA.url,
    logo: ORGANIZATION_DATA.logo,
    foundingDate: ORGANIZATION_DATA.foundingDate,
    description: ORGANIZATION_DATA.description,
    email: ORGANIZATION_DATA.email,
    telephone: ORGANIZATION_DATA.telephone,
    taxID: ORGANIZATION_DATA.taxID,
    vatID: ORGANIZATION_DATA.vatID,
    brand: {
      "@type": "Brand",
      name: ORGANIZATION_DATA.brand,
    },
    parentOrganization: {
      "@type": "Organization",
      name: ORGANIZATION_DATA.parentOrganization.name,
      legalName: ORGANIZATION_DATA.parentOrganization.legalName,
    },
    founder: {
      "@type": "Person",
      name: ORGANIZATION_DATA.founder.name,
      email: ORGANIZATION_DATA.founder.email,
      url: ORGANIZATION_DATA.founder.url,
      sameAs: ORGANIZATION_DATA.founder.sameAs,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION_DATA.address.streetAddress,
      addressLocality: ORGANIZATION_DATA.address.addressLocality,
      postalCode: ORGANIZATION_DATA.address.postalCode,
      addressCountry: ORGANIZATION_DATA.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: ORGANIZATION_DATA.contactPoint.email,
      telephone: ORGANIZATION_DATA.contactPoint.telephone,
      contactType: ORGANIZATION_DATA.contactPoint.contactType,
    },
    sameAs: [...ORGANIZATION_DATA.sameAs],
    keywords: ORGANIZATION_DATA.keywords,
  };
}

export function getServiceSchema(
  serviceType: string,
  url: string,
  description?: string,
  keywords?: string[],
  audienceType?: string,
  serviceTypeChannel?: string,
  ratingValue?: string,
  reviewCount?: string,
): ServiceSchema {
  const schema: ServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    provider: getOrganizationProvider(),
    areaServed: {
      "@type": "Country",
      name: "CZ",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
    },
  };

  if (description) {
    schema.description = description;
  }

  if (serviceTypeChannel) {
    schema.availableChannel.serviceType = serviceTypeChannel;
  }

  if (audienceType) {
    schema.audience = {
      "@type": "Audience",
      audienceType,
    };
  }

  if (ratingValue) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
    };
    if (reviewCount) {
      schema.aggregateRating.reviewCount = reviewCount;
    }
  }

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(", ");
  }

  return schema;
}

export function getCourseSchema(
  name: string,
  description: string,
  courseCode?: string,
  teaches?: string,
  keywords?: string[],
  audienceType?: string,
  duration?: string,
  timeRequired?: string,
): CourseSchema {
  const schema: CourseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: getOrganizationProvider(),
    educationalLevel: "Advanced",
    inLanguage: "cs",
  };

  if (courseCode) {
    schema.courseCode = courseCode;
  }

  if (teaches) {
    schema.teaches = teaches;
  }

  if (duration) {
    schema.duration = duration;
  }

  if (timeRequired) {
    schema.timeRequired = timeRequired;
  }

  if (audienceType) {
    schema.audience = {
      "@type": "EducationalAudience",
      educationalRole: audienceType,
    };
  }

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(", ");
  }

  return schema;
}

export interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image?: string;
  author: {
    "@type": string;
    name: string;
    url?: string;
    sameAs?: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  keywords?: string;
}

export interface TechArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  author: {
    "@type": string;
    name: string;
    url?: string;
    sameAs?: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  keywords?: string;
  about?: {
    "@type": string;
    name: string;
  };
  teaches?: string;
}

export interface EventSchema {
  "@context": string;
  "@type": string;
  name: string;
  description?: string;
  url?: string;
  startDate: string;
  endDate?: string;
  eventAttendanceMode?: string;
  eventStatus?: string;
  location: {
    "@type": string;
    url?: string;
    name?: string;
  };
  organizer: {
    "@type": string;
    name: string;
    url: string;
  };
  performer?: {
    "@type": string;
    name: string;
  };
  offers?: {
    "@type": string;
    url?: string;
    price?: string;
    priceCurrency?: string;
    availability?: string;
    validFrom?: string;
  };
  keywords?: string;
}

export interface BreadcrumbListSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export function getWebSiteSchema(includeSearchAction = true): WebSiteSchema {
  const schema: WebSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Outcybers",
    url: "https://outcybers.net",
  };

  if (includeSearchAction) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://outcybers.net/hledej?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

export function getArticleSchema(
  headline: string,
  description: string,
  url: string,
  datePublished: string,
  authorName: string,
  authorUrl?: string,
  image?: string,
  keywords?: string[],
  dateModified?: string,
): ArticleSchema {
  const schema: ArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_DATA.name,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION_DATA.logo,
      },
    },
    datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  if (authorUrl) {
    schema.author.url = authorUrl;
  }

  if (authorName === "Štefan Prokop") {
    schema.author.sameAs = "https://www.linkedin.com/in/stefanprokopdev/";
  }

  if (image) {
    schema.image = image;
  }

  if (dateModified) {
    schema.dateModified = dateModified;
  }

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(", ");
  }

  return schema;
}

/**
 * Creates TechArticle schema for cheat sheet pages
 * TechArticle is appropriate for technical documentation and tutorials
 */
export function getTechArticleSchema(
  headline: string,
  description: string,
  url: string,
  authorName: string = "Štefan Prokop",
  authorUrl?: string,
  keywords?: string[],
  datePublished?: string,
  dateModified?: string,
  teaches?: string,
): TechArticleSchema {
  const schema: TechArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_DATA.name,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION_DATA.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  if (authorUrl) {
    schema.author.url = authorUrl;
  }

  if (authorName === "Štefan Prokop") {
    schema.author.sameAs = "https://www.linkedin.com/in/stefanprokopdev/";
  }

  if (datePublished) {
    schema.datePublished = datePublished;
  }

  if (dateModified) {
    schema.dateModified = dateModified;
  }

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(", ");
  }

  if (teaches) {
    schema.teaches = teaches;
  }

  // Add about field for security/application security topic
  schema.about = {
    "@type": "Thing",
    name: "Aplikační bezpečnost",
  };

  return schema;
}

export function getEventSchema(
  name: string,
  startDate: string,
  duration: number,
  url: string,
  description?: string,
  isOnline: boolean = true,
  performerName?: string,
  keywords?: string[],
  eventStatus?: "scheduled" | "past",
): EventSchema {
  const start = new Date(startDate);
  const end = new Date(start.getTime() + duration * 60000);

  // Determine event status: use provided status, or calculate from date comparison
  // Note: Date comparison can cause SSR mismatches, so prefer explicit status
  let status: string;
  if (eventStatus === "scheduled") {
    status = "https://schema.org/EventScheduled";
  } else if (eventStatus === "past") {
    status = "https://schema.org/EventPast";
  } else {
    // Fallback to date comparison (for backward compatibility and dynamic events)
    status = start > new Date() ? "https://schema.org/EventScheduled" : "https://schema.org/EventPast";
  }

  // Build schema object with all required properties for Google Rich Results
  const schema: EventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    url, // Event page URL (required for Google Rich Results)
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    eventAttendanceMode: isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: status,
    location: isOnline
      ? {
          "@type": "VirtualLocation",
          url, // Event access/join URL (can be same as event page)
        }
      : {
          "@type": "Place",
          name: "TBD",
        },
    organizer: getOrganizationProvider(),
    // Offers property is required/recommended for Google Rich Results detection
    offers: {
      "@type": "Offer",
      url, // Registration/booking URL (same as event page)
      price: "0",
      priceCurrency: "CZK",
      availability: "https://schema.org/InStock",
    },
  };

  if (description) {
    schema.description = description;
  }

  if (performerName) {
    schema.performer = {
      "@type": "Person",
      name: performerName,
    };
  }

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(", ");
  }

  return schema;
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FAQSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export interface HowToSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image?: string;
  estimatedCost?: {
    "@type": string;
    currency: string;
    value: string;
  };
  tool?: Array<{
    "@type": string;
    name: string;
  }>;
  step: Array<{
    "@type": string;
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
  totalTime?: string;
}

export interface ReviewSchema {
  "@context": string;
  "@type": string;
  itemReviewed: {
    "@type": string;
    name: string;
  };
  reviewRating: {
    "@type": string;
    ratingValue: string;
    bestRating: string;
    worstRating: string;
  };
  author: {
    "@type": string;
    name: string;
  };
  reviewBody?: string;
  datePublished?: string;
}

/**
 * Creates FAQPage schema for AI search optimization
 * Critical for ChatGPT, Perplexity, and other AI search engines
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Creates HowTo schema for step-by-step tutorials
 * Helps AI understand tutorial content structure
 */
export function getHowToSchema(
  name: string,
  description: string,
  steps: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>,
  options?: {
    image?: string;
    totalTime?: string;
    estimatedCost?: { currency: string; value: string };
    tools?: string[];
  },
): HowToSchema {
  const schema: HowToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
  };

  if (options?.image) {
    schema.image = options.image;
  }

  if (options?.totalTime) {
    schema.totalTime = options.totalTime;
  }

  if (options?.estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: options.estimatedCost.currency,
      value: options.estimatedCost.value,
    };
  }

  if (options?.tools && options.tools.length > 0) {
    schema.tool = options.tools.map((tool) => ({
      "@type": "HowToTool",
      name: tool,
    }));
  }

  return schema;
}

/**
 * Creates Review schema for testimonials and ratings
 * Helps with rich snippets and AI understanding of reputation
 */
export function getReviewSchema(
  itemName: string,
  ratingValue: number,
  authorName: string,
  options?: {
    reviewBody?: string;
    datePublished?: string;
    bestRating?: number;
    worstRating?: number;
  },
): ReviewSchema {
  const schema: ReviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Service",
      name: itemName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(ratingValue),
      bestRating: String(options?.bestRating || 5),
      worstRating: String(options?.worstRating || 1),
    },
    author: {
      "@type": "Person",
      name: authorName,
    },
  };

  if (options?.reviewBody) {
    schema.reviewBody = options.reviewBody;
  }

  if (options?.datePublished) {
    schema.datePublished = options.datePublished;
  }

  return schema;
}

export interface PersonSchema {
  "@context": string;
  "@type": string;
  name: string;
  url?: string;
  jobTitle?: string;
  knowsAbout?: string[];
  sameAs?: string[];
  email?: string;
  image?: string;
}

export interface VideoObjectSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  embedUrl: string;
  contentUrl?: string;
}

export interface CollectionPageSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  mainEntity: {
    "@type": string;
    itemListElement: Array<{
      "@type": string;
      position: number;
      name: string;
      url: string;
    }>;
  };
}

/**
 * Creates Person schema for authors and team members
 * Helps AI understand expertise and credibility
 */
export function getPersonSchema(
  name: string,
  options?: {
    url?: string;
    jobTitle?: string;
    expertise?: string[];
    sameAs?: string[];
    email?: string;
    image?: string;
  },
): PersonSchema {
  const schema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
  };

  if (options?.url) {
    schema.url = options.url;
  }

  if (options?.jobTitle) {
    schema.jobTitle = options.jobTitle;
  }

  if (options?.expertise && options.expertise.length > 0) {
    schema.knowsAbout = options.expertise;
  }

  if (options?.sameAs && options.sameAs.length > 0) {
    schema.sameAs = options.sameAs;
  }

  if (options?.email) {
    schema.email = options.email;
  }

  if (options?.image) {
    schema.image = options.image;
  }

  return schema;
}

/**
 * Creates VideoObject schema for YouTube videos and other video content
 * Helps with video rich snippets in search results
 */
export function getVideoObjectSchema(
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  embedUrl: string,
  options?: {
    duration?: string;
    contentUrl?: string;
  },
): VideoObjectSchema {
  const schema: VideoObjectSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    embedUrl,
  };

  if (options?.duration) {
    schema.duration = options.duration;
  }

  if (options?.contentUrl) {
    schema.contentUrl = options.contentUrl;
  }

  return schema;
}

/**
 * Creates CollectionPage schema for listing pages (courses, articles, etc.)
 * Helps AI understand page structure and content organization
 */
export function getCollectionPageSchema(
  name: string,
  description: string,
  items: Array<{ name: string; url: string }>,
): CollectionPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

/**
 * Helper function to create breadcrumb schema from URL path segments
 * Automatically creates breadcrumb trail for any page
 */
export function getBreadcrumbSchemaForPath(
  baseUrl: string,
  path: string,
  segmentNames?: Record<string, string>,
): BreadcrumbListSchema {
  const segments = path.split("/").filter((s) => s.length > 0);
  const items: Array<{ name: string; url: string }> = [{ name: "Domů", url: baseUrl }];

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const displayName =
      segmentNames?.[segment] ||
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    items.push({
      name: displayName,
      url: `${baseUrl}${currentPath}/`,
    });
  });

  return getBreadcrumbSchema(items);
}
