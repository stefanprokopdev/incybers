/**
 * Docusaurus plugin to inject Organization schema.org structured data site-wide
 * Note: This plugin uses inline constants because CommonJS plugins cannot directly
 * require TypeScript modules. The constants are synchronized with schemaConstants.ts
 */

const ORGANIZATION_DATA = {
  name: "Outcybers",
  legalName: "Štefan Prokop",
  url: "https://outcybers.net",
  logo: "https://outcybers.net/img/logo-ctverec.png",
  foundingDate: "2022",
  description:
    "Zvyšujeme bezpečnost vašich aplikací. Pentesty, školení bezpečnosti a praktické návody pro vývojáře a firmy.",
  email: "info@outcybers.net",
  telephone: "+420-606-460-316",
  taxID: "-",
  vatID: "-",
  brand: "Outcybers",
  parentOrganization: {
    name: "Outcybers",
    legalName: "Štefan Prokop",
  },
  founder: {
    "@type": "Person",
    name: "Štefan Prokop",
    email: "info@outcybers.net",
    url: "https://outcybers.net",
    sameAs: ["https://www.linkedin.com/in/stefanprokopdev/"],
  },
  address: {
    streetAddress: "počernická",
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
};

function organizationSchemaPlugin(context, options) {
  return {
    name: "organization-schema-plugin",
    injectHtmlTags() {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: ORGANIZATION_DATA.name,
        legalName: ORGANIZATION_DATA.legalName,
        url: ORGANIZATION_DATA.url,
        logo: {
          "@type": "ImageObject",
          url: ORGANIZATION_DATA.logo,
        },
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

      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              type: "application/ld+json",
            },
            innerHTML: JSON.stringify(schema),
          },
        ],
      };
    },
  };
}

module.exports = organizationSchemaPlugin;
