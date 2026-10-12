// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require("dotenv").config();

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const ALGOLIA_APP_ID = "F1VT4JRN2K";
const ALGOLIA_API_KEY = "5a93fc36190a0546868f91344e8a3ea4";
const ALGOLIA_INDEX_NAME = "bezpecnykod";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: " Outcybers",
  tagline: "Síť expertů na kybernetickou bezpečnost.",
  url: "https://outcybers.net",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.svg",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "cs",
    locales: ["cs"],
  },

  plugins: [
    require.resolve("./src/plugins/smoothScrollPlugin.js"),
    require.resolve("./src/plugins/organizationSchemaPlugin.js"),
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "tym",
          routeBasePath: "tym",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "daily",
          priority: 1,
          filename: "sitemap.xml",
          ignorePatterns: ["/dekuji/**"],
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("dekuji"));
          },
        },
        googleTagManager: {
          containerId: "GTM-KWCR66MP",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: " ",
        logo: {
          alt: "Outcybers - logo",
          src: "img/logo.svg",
        },
        items: [],
      },
      footer: {
        style: "light",
        links: [
          /*{
            label: "VOP a GDPR",
            to: "/vop-gdpr/",
          },*/
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Outcybers`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      image: "/img/logo.svg",
      colorMode: {
        disableSwitch: true,
      },
    }),
  customFields: {
    followers: "1000+",
    experts: "50+",
    algolia: {
      appId: ALGOLIA_APP_ID,
      apiKey: ALGOLIA_API_KEY,
      indexName: ALGOLIA_INDEX_NAME,
    },
    logo: "img/logo.svg",
    logoAlt: "Logo Outcybers",
    newsletterUrl: "https://outcybers.substack.com/",
    assessmentFormUrl: "https://tally.so/r/mYG0jd",
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY || "",
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || "outcybers-net.firebaseapp.com",
      projectId: process.env.FIREBASE_PROJECT_ID || "outcybers-net",
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "outcybers-net.firebasestorage.app",
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.FIREBASE_APP_ID || "",
    },
    common: {
      metaDescription:
        "Jsme Outcybers, komunita juniorů, seniorů i manažerů zaměřená na sdílení praktických zkušeností a know-how z oboru kybernetické bezpečnosti.",
      title: "Outcybers –⁠⁠⁠⁠⁠⁠ Síť expertů na kybernetickou bezpečnost",
      tagline: "",
    },
    outOfOffice: {
      start: "2026-08-24",
      end: "2026-09-11",
    },
  },
};

module.exports = config;
