/**
 * Centralized schema.org structured data metadata for static routes
 * This file contains schemas for Events, Services, Courses, and WebSite
 *
 * Note: TechArticle schemas for content pages (cheat-sheety, zranitelnosti,
 * haxing, checklisty) are now read from markdown frontmatter via routeSchemaPlugin.
 * Add schema metadata to markdown files using the 'schema' frontmatter field.
 */

const ROUTE_SCHEMAS = {
  // Event schemas
  "/udalosti/threat-modeling-bezpecnost-ktera-nebrzdi/": {
    type: "Event",
    route: "/udalosti/threat-modeling-bezpecnost-ktera-nebrzdi/",
    name: "Threat modeling: Bezpečnost, která nebrzdí",
    startDate: "2026-01-13T16:00:00+01:00",
    duration: 60,
    description:
      "Bezpečnost nemusí brzdit vývoj. Zjistěte, jak modelování hrozeb snižuje náklady, zjednodušuje rozhodování a pomáhá projít auditem bez stresu.",
    isOnline: true,
    performerName: "Michal Svoboda, cyber security architekt a mentor",
    keywords: ["threat modeling", "modelování hrozeb", "bezpečnost", "webinar"],
  },
  "/udalosti/ravendb-jedna-databaze-vladne-vsem/": {
    type: "Event",
    route: "/udalosti/ravendb-jedna-databaze-vladne-vsem/",
    name: "RavenDB: Jedna databáze vládne všem",
    startDate: "2025-11-18T16:00:00+01:00",
    duration: 60,
    description:
      "Zjistěte, kdy se vám vyplatí vsadit na RavenDB – all-in-one databázi, která zjednoduší architekturu, šetří čas a škáluje bez zbytečné složitosti.",
    isOnline: true,
    performerName: "Jindřich Pergler, SW architekt",
    keywords: ["raven db", "databáze", "webinar"],
  },

  // Course schema
  "/kurz-nehacknutelny/": {
    type: "Course",
    route: "/kurz-nehacknutelny/",
    name: "Kurz Nehacknutelný - ovládněte aplikační bezpečnost",
    description:
      "Kurz aplikační bezpečnosti - jediný svého druhu v Evropě. Speciálně pro CTO, CIO, Head of dev a další manažery IT oddělení, kteří berou bezpečnost vážně nebo s ní začínají. Předběhněte hackery jednou provždy.",
    courseCode: "Nehacknutelný",
    teaches: "Aplikační bezpečnost, Bezpečný vývoj softwaru, API bezpečnost",
    keywords: ["kurz aplikační bezpečnosti", "školení aplikační bezpečnosti", "bezpečnost AI", "aplikační bezpečnost"],
  },

  // Service schemas
  "/firemni-skoleni/": {
    type: "Service",
    route: "/firemni-skoleni/",
    serviceType: "Firemní školení kybernetické bezpečnosti",
    url: "https://outcybers.net/firemni-skoleni/",
    description:
      "Praktická školení kybernetické bezpečnosti a bezpečného vývoje softwaru a AI pro firmy a týmy. Online i prezenčně, v češtině i angličtině.",
    keywords: [
      "firemní školení",
      "školení bezpečnosti",
      "školení vývojářů",
      "školení aplikační bezpečnosti",
      "kybernetická bezpečnost",
      "bezpečnost AI",
    ],
    audienceType: "Vývojáři, IT týmy, Management",
    serviceTypeChannel: "Online a prezenční školení",
    ratingValue: "4.6",
    reviewCount: "300",
  },
  "/sluzby/pentesty/": {
    type: "Service",
    route: "/sluzby/pentesty/",
    serviceType: "Penetrační testování a bezpečnostní audit",
    url: "https://outcybers.net/sluzby/pentesty/",
    description:
      "Otestujeme zabezpečení vašich systémů pomocí pentestů, skenů zranitelností, revizí kódu a red teamingu. Výstupy odpovídají NIS2, ZoKB, DORA a dalším normám.",
    keywords: [
      "pentest",
      "pentesty",
      "bezpečnostní audit",
      "penetrační testování",
      "testování zranitelností",
      "aplikační bezpečnost",
    ],
  },

  // WebSite schema (homepage)
  "/": {
    type: "WebSite",
    route: "/",
    includeSearchAction: true,
  },
};

module.exports = { ROUTE_SCHEMAS };
