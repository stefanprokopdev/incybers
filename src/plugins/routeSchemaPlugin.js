/**
 * Docusaurus plugin to inject route-specific schema.org structured data during build
 * Handles Event, Course, Service, WebSite, and TechArticle schemas
 * Reads TechArticle schemas from markdown frontmatter for content pages
 * Uses postBuild hook to inject schemas into the correct HTML files during SSR
 */

const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");
const { ROUTE_SCHEMAS } = require("../data/routeSchemas");

// Organization data (inline, matching organizationSchemaPlugin)
const ORGANIZATION_DATA = {
  name: "Outcybers",
  legalName: "Štefan Prokop",
  url: "https://outcybers.net",
};

// Content directories that should have TechArticle schemas from frontmatter
const CONTENT_DIRECTORIES = [
  { path: "cheat-sheety", routeBase: "cheat-sheety" },
  { path: "zranitelnosti", routeBase: "zranitelnosti" },
  { path: "haxing", routeBase: "haxing" },
  { path: "checklisty", routeBase: "checklisty" },
  { path: "newsletter-archiv", routeBase: "newsletter-archiv" },
  { path: "tym", routeBase: "tym" },
  { path: "kurzy", routeBase: "kurzy" },
];

function getOrganizationProvider() {
  return {
    "@type": "Organization",
    name: ORGANIZATION_DATA.name,
    legalName: ORGANIZATION_DATA.legalName,
    url: ORGANIZATION_DATA.url,
  };
}

function generateEventSchema(config, siteUrl) {
  const start = new Date(config.startDate);
  const end = new Date(start.getTime() + config.duration * 60000);
  const eventUrl = `${siteUrl}${config.route}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: config.name,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    eventAttendanceMode: config.isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: start > new Date() ? "https://schema.org/EventScheduled" : "https://schema.org/EventPast",
    location: {
      "@type": "VirtualLocation",
      url: eventUrl,
    },
    organizer: getOrganizationProvider(),
    description: config.description,
  };

  if (config.performerName) {
    schema.performer = {
      "@type": "Person",
      name: config.performerName,
    };
  }

  if (config.keywords && config.keywords.length > 0) {
    schema.keywords = config.keywords.join(", ");
  }

  return JSON.parse(JSON.stringify(schema)); // Remove undefined fields
}

function generateCourseSchema(config) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: config.name,
    description: config.description,
    provider: getOrganizationProvider(),
    educationalLevel: "Advanced",
    inLanguage: "cs",
  };

  if (config.courseCode) {
    schema.courseCode = config.courseCode;
  }

  if (config.teaches) {
    schema.teaches = config.teaches;
  }

  if (config.keywords && config.keywords.length > 0) {
    schema.keywords = config.keywords.join(", ");
  }

  return JSON.parse(JSON.stringify(schema));
}

function generateServiceSchema(config, siteUrl) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: config.serviceType,
    provider: getOrganizationProvider(),
    areaServed: {
      "@type": "Country",
      name: "CZ",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: config.url || `${siteUrl}${config.route}`,
    },
  };

  if (config.description) {
    schema.description = config.description;
  }

  if (config.serviceTypeChannel) {
    schema.availableChannel.serviceType = config.serviceTypeChannel;
  }

  if (config.audienceType) {
    schema.audience = {
      "@type": "Audience",
      audienceType: config.audienceType,
    };
  }

  if (config.ratingValue) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: config.ratingValue,
    };
    if (config.reviewCount) {
      schema.aggregateRating.reviewCount = config.reviewCount;
    }
  }

  if (config.keywords && config.keywords.length > 0) {
    schema.keywords = config.keywords.join(", ");
  }

  return JSON.parse(JSON.stringify(schema));
}

function generateWebSiteSchema(config, siteUrl) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bezpečný kód",
    url: siteUrl,
  };

  if (config.includeSearchAction) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/hledej?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return JSON.parse(JSON.stringify(schema));
}

function generateTechArticleSchema(config, siteUrl) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: config.headline || config.name,
    description: config.description,
    author: {
      "@type": "Person",
      name: config.authorName || "Štefan Prokop",
    },
    publisher: {
      "@type": "Organization",
      name: "Bezpečný kód",
      logo: {
        "@type": "ImageObject",
        url: "https://outcybers.net/img/logo-ctverec.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": config.url || `${siteUrl}${config.route}`,
    },
    about: {
      "@type": "Thing",
      name: "Aplikační bezpečnost",
    },
  };

  if (config.authorUrl) {
    schema.author.url = config.authorUrl;
  }

  if ((config.authorName || "Štefan Prokop") === "Štefan Prokop") {
    schema.author.sameAs = "https://www.linkedin.com/in/stefanprokopdev/";
  }

  if (config.datePublished) {
    schema.datePublished = config.datePublished;
  }

  if (config.dateModified) {
    schema.dateModified = config.dateModified;
  }

  if (config.keywords && config.keywords.length > 0) {
    schema.keywords = Array.isArray(config.keywords) ? config.keywords.join(", ") : config.keywords;
  }

  if (config.teaches) {
    schema.teaches = config.teaches;
  }

  return JSON.parse(JSON.stringify(schema));
}

function generateSchema(config, siteUrl) {
  switch (config.type) {
    case "Event":
      return generateEventSchema(config, siteUrl);
    case "Course":
      return generateCourseSchema(config);
    case "Service":
      return generateServiceSchema(config, siteUrl);
    case "WebSite":
      return generateWebSiteSchema(config, siteUrl);
    case "TechArticle":
      return generateTechArticleSchema(config, siteUrl);
    default:
      throw new Error(`Unknown schema type: ${config.type}`);
  }
}

/**
 * Recursively find all markdown files in a directory
 */
async function findMarkdownFiles(dir, fileList = []) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Skip node_modules, .git, etc.
      if (!file.name.startsWith(".") && file.name !== "node_modules") {
        await findMarkdownFiles(filePath, fileList);
      }
    } else if (file.isFile() && (file.name.endsWith(".md") || file.name.endsWith(".mdx"))) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Convert file path to route path
 * Example:
 * - cheat-sheety/json-web-token-jwt.md -> /cheat-sheety/json-web-token-jwt/
 * - cheat-sheety/index.md -> /cheat-sheety/
 * - zranitelnosti/owasp-top-10-web/3-injection.md -> /zranitelnosti/owasp-top-10-web/3-injection/
 */
function filePathToRoute(filePath, contentDir, routeBase) {
  // Get relative path from content directory
  const relativePath = path.relative(contentDir, filePath);
  // Remove extension
  const withoutExt = relativePath.replace(/\.(md|mdx)$/, "");

  // Handle index files - they should map to the base route
  if (withoutExt === "index" || path.basename(withoutExt) === "index") {
    return `/${routeBase}/`;
  }

  // Convert to route
  const routePath = `/${routeBase}/${withoutExt}/`;
  // Normalize path separators (Windows uses backslashes)
  return routePath.replace(/\\/g, "/");
}

/**
 * Extract schema config from markdown frontmatter
 */
function extractSchemaFromFrontmatter(frontmatter, route, title) {
  // Only generate schema if schema metadata is present
  if (!frontmatter.schema) {
    return null;
  }

  const schemaConfig = frontmatter.schema;

  return {
    type: "TechArticle",
    route: route,
    headline: schemaConfig.headline || title,
    name: schemaConfig.name || title,
    description: schemaConfig.description || frontmatter.description || "",
    keywords: schemaConfig.keywords || frontmatter.keywords || [],
    teaches: schemaConfig.teaches,
    authorName: schemaConfig.authorName,
    authorUrl: schemaConfig.authorUrl,
    datePublished: schemaConfig.datePublished,
    dateModified: schemaConfig.dateModified,
  };
}

/**
 * Extract title from markdown content (first H1)
 */
function extractTitleFromContent(content) {
  const h1Match = content.match(/^#\s+(.+)$/m);
  return h1Match ? h1Match[1].trim() : "";
}

/**
 * Scan content directories and extract schema configs from frontmatter
 */
async function scanContentDirectoriesForSchemas(context) {
  const schemas = [];
  // Use siteDir from context, fallback to process.cwd()
  // In Docusaurus, context.siteDir is the project root directory
  const siteDir = context.siteDir || process.cwd();
  const contentBasePath = path.resolve(siteDir);

  for (const dirConfig of CONTENT_DIRECTORIES) {
    const contentDir = path.resolve(contentBasePath, dirConfig.path);

    try {
      // Check if directory exists
      await fs.access(contentDir);

      // Find all markdown files
      const markdownFiles = await findMarkdownFiles(contentDir);

      for (const filePath of markdownFiles) {
        try {
          const fileContent = await fs.readFile(filePath, "utf-8");
          const { data: frontmatter, content } = matter(fileContent);

          // Extract title from content if not in frontmatter
          const title = frontmatter.title || extractTitleFromContent(content);

          // Convert file path to route
          const route = filePathToRoute(filePath, contentDir, dirConfig.routeBase);

          // Extract schema config from frontmatter
          const schemaConfig = extractSchemaFromFrontmatter(frontmatter, route, title);

          if (schemaConfig) {
            schemas.push(schemaConfig);
          }
        } catch (error) {
          console.warn(`⚠ Could not process ${filePath}: ${error.message}`);
        }
      }
    } catch (error) {
      // Directory doesn't exist, skip
      console.warn(`⚠ Content directory ${contentDir} not found, skipping`);
    }
  }

  return schemas;
}

function normalizeRoutePath(input) {
  if (!input) return "/";
  const noQueryOrHash = input.split(/[?#]/)[0];
  const noIndex = noQueryOrHash.replace(/\/index\.html$/, "/");
  const trimmed = noIndex.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "/";
}

function routeSchemaPlugin(context) {
  const siteUrl = context.siteConfig.url;
  const outDir = context.outDir || "build";

  return {
    name: "route-schema-plugin",
    async postBuild({ routesPaths, outDir: buildOutDir }) {
      const actualOutDir = buildOutDir || outDir;
      let injectedCount = 0;
      const errors = [];

      // First, process static routes from routeSchemas.js (Events, Services, etc.)
      for (const [route, config] of Object.entries(ROUTE_SCHEMAS)) {
        // Skip TechArticle routes that should come from markdown files
        if (
          config.type === "TechArticle" &&
          (route.startsWith("/cheat-sheety/") ||
            route.startsWith("/zranitelnosti/") ||
            route.startsWith("/haxing/") ||
            route.startsWith("/checklisty/"))
        ) {
          continue;
        }

        // Normalize route for matching (handle trailing slashes)
        const normalizedRoute = normalizeRoutePath(route);

        // Find matching route path
        const matchingRoute = routesPaths.find((rp) => {
          const normalizedRp = normalizeRoutePath(rp);
          console.log({ normalizedRp, normalizedRoute });
          return (
            normalizedRp === normalizedRoute ||
            normalizedRp === normalizedRoute + "/" ||
            normalizedRoute === normalizedRp + "/"
          );
        });

        if (!matchingRoute) {
          console.warn(`⚠ Route ${route} not found in routesPaths`);
          continue;
        }

        try {
          const schema = generateSchema(config, siteUrl);
          const schemaScript = `    <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)
            .split("\n")
            .map((line) => "      " + line)
            .join("\n")}\n    </script>`;

          // Determine HTML file path
          const routePath = matchingRoute === "/" ? "" : matchingRoute.replace(/\/$/, "");
          const htmlPath = path.join(actualOutDir, routePath === "" ? "index.html" : `${routePath}/index.html`);

          // Read the HTML file
          let html = await fs.readFile(htmlPath, "utf-8");

          // Check if schema already exists (avoid duplicates)
          const schemaType = config.type;
          if (
            html.includes(`"@type":"${schemaType}"`) &&
            html.includes(config.name || config.serviceType || "WebSite")
          ) {
            console.log(`⏭  ${schemaType} schema already exists for ${route}`);
            continue;
          }

          // Find the last </script> tag before </head> and insert after it
          const headCloseIndex = html.indexOf("</head>");
          if (headCloseIndex === -1) {
            throw new Error("Could not find </head> tag");
          }

          const headSection = html.substring(0, headCloseIndex);
          const lastScriptIndex = headSection.lastIndexOf("</script>");

          if (lastScriptIndex !== -1) {
            // Insert after the last script tag
            const insertIndex = headSection.indexOf(">", lastScriptIndex) + 1;
            html = html.slice(0, insertIndex) + "\n" + schemaScript + html.slice(insertIndex);
          } else {
            // No script tags, insert before </head>
            html = html.slice(0, headCloseIndex) + schemaScript + "\n    " + html.slice(headCloseIndex);
          }

          // Write back the modified HTML
          await fs.writeFile(htmlPath, html, "utf-8");
          console.log(`✓ Injected ${schemaType} schema for ${route}`);
          injectedCount++;
        } catch (error) {
          const errorMsg = `Could not inject ${config.type} schema for ${route}: ${error.message}`;
          console.warn(`⚠ ${errorMsg}`);
          errors.push(errorMsg);
        }
      }

      // Second, scan content directories for TechArticle schemas from frontmatter
      try {
        const contentSchemas = await scanContentDirectoriesForSchemas(context);

        for (const config of contentSchemas) {
          // Normalize route for matching (handle trailing slashes)
          const normalizedRoute = config.route === "/" ? "/" : config.route.replace(/\/$/, "");

          // Find matching route path
          const matchingRoute = routesPaths.find((rp) => {
            const normalizedRp = rp === "/" ? "/" : rp.replace(/\/$/, "");
            return (
              normalizedRp === normalizedRoute ||
              normalizedRp === normalizedRoute + "/" ||
              normalizedRoute === normalizedRp + "/"
            );
          });

          if (!matchingRoute) {
            console.warn(`⚠ Route ${config.route} not found in routesPaths`);
            continue;
          }

          try {
            const schema = generateSchema(config, siteUrl);
            const schemaScript = `    <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)
              .split("\n")
              .map((line) => "      " + line)
              .join("\n")}\n    </script>`;

            // Determine HTML file path
            const routePath = matchingRoute === "/" ? "" : matchingRoute.replace(/\/$/, "");
            const htmlPath = path.join(actualOutDir, routePath === "" ? "index.html" : `${routePath}/index.html`);

            // Read the HTML file
            let html = await fs.readFile(htmlPath, "utf-8");

            // Check if schema already exists (avoid duplicates)
            if (html.includes(`"@type":"TechArticle"`) && html.includes(config.headline || config.name)) {
              console.log(`⏭  TechArticle schema already exists for ${config.route}`);
              continue;
            }

            // Find the last </script> tag before </head> and insert after it
            const headCloseIndex = html.indexOf("</head>");
            if (headCloseIndex === -1) {
              throw new Error("Could not find </head> tag");
            }

            const headSection = html.substring(0, headCloseIndex);
            const lastScriptIndex = headSection.lastIndexOf("</script>");

            if (lastScriptIndex !== -1) {
              // Insert after the last script tag
              const insertIndex = headSection.indexOf(">", lastScriptIndex) + 1;
              html = html.slice(0, insertIndex) + "\n" + schemaScript + html.slice(insertIndex);
            } else {
              // No script tags, insert before </head>
              html = html.slice(0, headCloseIndex) + schemaScript + "\n    " + html.slice(headCloseIndex);
            }

            // Write back the modified HTML
            await fs.writeFile(htmlPath, html, "utf-8");
            console.log(`✓ Injected TechArticle schema for ${config.route} (from frontmatter)`);
            injectedCount++;
          } catch (error) {
            const errorMsg = `Could not inject TechArticle schema for ${config.route}: ${error.message}`;
            console.warn(`⚠ ${errorMsg}`);
            errors.push(errorMsg);
          }
        }
      } catch (error) {
        console.warn(`⚠ Error scanning content directories: ${error.message}`);
        errors.push(`Error scanning content directories: ${error.message}`);
      }

      if (injectedCount > 0) {
        console.log(`\n✅ Successfully injected ${injectedCount} schema(s)`);
      }

      if (errors.length > 0) {
        console.warn(`\n⚠ ${errors.length} error(s) occurred during schema injection`);
      }
    },
  };
}

module.exports = routeSchemaPlugin;
