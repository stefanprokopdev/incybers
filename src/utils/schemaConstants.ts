/**
 * Centralized constants for schema.org structured data
 * Used across schema utilities and plugins to avoid duplication
 */

export const ORGANIZATION_DATA = {
  name: "Outcybers",
  legalName: "Štefan Prokop",
  url: "https://outcybers.net",
  logo: "https://outcybers.net/img/logo-ctverec.png",
  foundingDate: "2022",
  description:
    "Zvyšujeme bezpečnost vašich aplikací. Pentesty, školení bezpečnosti a praktické návody pro vývojáře a firmy.",
  email: "info@outcybers.net",
  telephone: "+420-606-918-970",
  taxID: "-",
  vatID: "-",
  brand: "Outcybers",
  parentOrganization: {
    name: "Outcybers",
    legalName: "Štefan Prokop",
  },
  founder: {
    name: "Štefan Prokop",
    email: "info@outcybers.net",
    url: "https://outcybers.net",
    sameAs: "https://www.linkedin.com/in/stefanprokopdev/",
  },
  address: {
    streetAddress: "Pocernicka",
    addressLocality: "Praha",
    postalCode: "108 00",
    addressCountry: "CZ",
  },
  contactPoint: {
    email: "info@outcybers.net",
    telephone: "+420-606-918-970",
    contactType: "customer service",
  },
  sameAs: ["https://www.linkedin.com/company/outcybers/", "https://www.youtube.com/@outcybers"],
  keywords: "komunita, síť, kybernetická bezpečnost, expertní síť, bezpečnost",
} as const;

export function getOrganizationProvider() {
  return {
    "@type": "Organization",
    name: ORGANIZATION_DATA.name,
    url: ORGANIZATION_DATA.url,
  };
}
