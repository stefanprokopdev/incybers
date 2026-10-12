# AGENT WORKING GUIDELINES

**IMPORTANT: This file (AGENTS.md) must always be written in English, regardless of the site's content or prompt instructions language.**

This repository is a Docusaurus 3 / React / TypeScript project for the **Outcybers** website.  
These guidelines summarize how automated agents (and humans) should work with this repo.

## Tech Stack & Structure

- **Framework**: Docusaurus 3 (React, SPA/static site).
- **Language**: TypeScript for components/pages (`.tsx`), Markdown/MDX for content.
- **Styling**: CSS Modules + Infima utility classes; global styles in `src/css/custom.css`.
- **Key areas**:
  - Pages in `src/pages/**` (including solution pages under `src/pages/reseni/`).
  - Reusable components under `src/components/**`.
  - Configuration in `docusaurus.config.js`.

When adding new UI:

- Prefer **functional React components** with explicit `JSX.Element` return type.
- Use **CSS Modules** (`index.module.css`) for component‑specific styling.
- Keep texts for the public site **in Czech**, but code identifiers in **English**.
- **Prefer reusable components** where possible for consistency across the interface and maintainability. When creating new components, consider making them configurable via props so they can be reused in different contexts rather than hardcoding specific data or behavior.

## Git Workflow

- **Commits MUST use Conventional Commits and be written in English.**
  - Examples: `feat: add waf solution page`, `fix: correct navbar spacing`, `chore: update dependencies`.
- Prefer **feature branches** with the pattern: `feature/<short-descriptor>`.
- When updating against remote, use **`git pull --rebase origin main`**, not merge.
- Only `git push` when explicitly requested or when part of a defined workflow.

## Package Management & Commands

- Use **Yarn**, not npm:
  - `yarn install`
  - `yarn start`
  - `yarn build`
- Do not introduce new package managers without a strong reason.

## Coding & Content Practices

- Maintain **TypeScript strictness** – avoid `any` unless unavoidable.
- Keep **imports clean** (remove unused, no duplicate imports).
- For new pages:
  - Wrap content in Docusaurus `Layout`.
  - Provide SEO metadata via `SEOHead` and, where relevant, `StructuredData` helpers.
  - Use Czech marketing/copywriting matching existing tone.
- For security‑related pages (WAF, VPN/ZTNA, SIEM, SOC, etc.):
  - Prefer precise, expert terminology.
  - Avoid unrealistic promises; focus on risk reduction, detection, and process.

## Navigation & URLs

- Add new top‑level or dropdown items to the navbar via `themeConfig.navbar.items` in `docusaurus.config.js`.
- For moved/renamed pages, ensure **redirects** exist (client‑side redirect pages or other SEO‑friendly solution).
- Keep URL slugs **lowercase**, use hyphens, and stay consistent with existing patterns (e.g. `/reseni/waf/`, `/reseni/siem/`).

## Style & UX

- Follow existing visual style:
  - Use `container`, `row`, `col col--*` for layout.
  - Use `hero__title`, `hero__subtitle`, `textHighlight` and other established patterns for hero sections.
- Aim for **responsive layouts** (check behavior on desktop and mobile breakpoints).

## Glossary & Terminology

- The glossary lives in `src/pages/slovnik-pojmu.md` and uses **tables** with `<span id="...">` anchors.
- When adding new terms:
  - Place them in the most relevant section (e.g. AppSec, Web/API, Monitoring, Attacks).
  - Reuse existing style and keep explanations concise and practitioner‑oriented.

## Tooltips for Technical Terms

### Overview

The `TermWithTooltip` component provides inline explanations for technical terms, acronyms, and specialized vocabulary. Terms with tooltips are visually marked with a dotted underline and show an explanation on hover.

### When to Use Tooltips

Use `TermWithTooltip` for:

- **Acronyms and abbreviations**: NIS2, DORA, GDPR, ISO 27001, PCI DSS, SOC2, WAF, SIEM, SOC, UEBA, EDR, SOAR, etc.
- **Technical terms**: Zero Trust, Threat Modeling, Threat Hunting, Purple Teaming, Device Posture, laterální pohyb, etc.
- **Methodologies and frameworks**: OWASP, PTES, PTF, FAIR, MITRE ATT&CK, SSDLC, SDLC, DevSecOps, etc.
- **Roles and services**: CISO, vCISO, MSSP
- **Security concepts**: Defense in Depth, Attack Surface Reduction, Least Privilege, Mikro-segmentace, etc.
- **Specialized terms and abbreviations**: Generally, all specialized terms, abbreviations, and technical concepts that are not commonly known to laypeople should have tooltips. This includes:
  - Security technologies and concepts (Device Posture, ransomware, lateral movement, etc.)
  - Specialized abbreviations and acronyms
  - Technical terms from cybersecurity domain
  - Methodologies and frameworks
  - Compliance standards and regulations

**Do NOT use tooltips for:**

- Common words that don't need explanation
- Terms already explained in the same sentence/paragraph
- Terms in meta descriptions (SEO) – keep those as plain text
- Generally known terms that don't require explanation (e.g., "password", "user", "application")

### Usage

1. **Import the component**:

   ```typescript
   import TermWithTooltip from "@site/src/components/TermWithTooltip";
   ```

2. **Wrap terms in JSX**:

   ```tsx
   <TermWithTooltip
     term="NIS2"
     explanation="Směrnice EU o kybernetické bezpečnosti, která ukládá povinnosti organizacím v kritických sektorech."
   >
     NIS2
   </TermWithTooltip>
   ```

3. **For terms with formatting** (bold, links, etc.):

   ```tsx
   <TermWithTooltip
     term="ISO 27001"
     explanation="Mezinárodní standard pro řízení bezpečnosti informací (ISMS)."
   >
     <strong>ISO{"\u00A0"}27001</strong>
   </TermWithTooltip>
   ```

4. **In string props** (subtitle, description):
   - Convert string props to JSX fragments when tooltips are needed:

   ```tsx
   // Before (string):
   subtitle="Text with PCI DSS requirement"

   // After (JSX):
   subtitle={
     <>
       Text with <TermWithTooltip term="PCI DSS" explanation="...">PCI DSS</TermWithTooltip> requirement
     </>
   }
   ```

### Best Practices

- **Consistent explanations**: Use the same explanation text for the same term across all pages.
- **Concise explanations**: Keep tooltip text brief (1-2 sentences) and practitioner-oriented.
- **Non-breaking spaces**: Use `{'\u00A0'}` for terms like "ISO 27001" to prevent line breaks.
- **Czech language**: All tooltip explanations should be in Czech to match the site language.
- **Visual consistency**: Terms with tooltips automatically get dotted underline styling – don't add additional styling.

### Examples from Existing Pages

**Compliance standards:**

```tsx
<TermWithTooltip term="NIS2" explanation="Směrnice EU o kybernetické bezpečnosti, která ukládá povinnosti organizacím v kritických sektorech.">NIS2</TermWithTooltip>
<TermWithTooltip term="DORA" explanation="Digital Operational Resilience Act – evropská regulace pro finanční sektor zaměřená na kybernetickou odolnost.">DORA</TermWithTooltip>
<TermWithTooltip term="ISO 27001" explanation="Mezinárodní standard pro řízení bezpečnosti informací (ISMS).">ISO{'\u00A0'}27001</TermWithTooltip>
```

**Security technologies:**

```tsx
<TermWithTooltip term="WAF" explanation="Web Application Firewall – firewall na aplikační vrstvě (Layer 7) chránící webové aplikace před útoky jako SQL Injection, XSS, CSRF a další.">WAF</TermWithTooltip>
<TermWithTooltip term="SIEM" explanation="Security Information and Event Management – systém pro sběr, analýzu a korelaci bezpečnostních logů a událostí.">SIEM</TermWithTooltip>
```

**Methodologies:**

```tsx
<TermWithTooltip term="FAIR" explanation="Factor Analysis of Information Risk – metodika pro kvantitativní analýzu a hodnocení bezpečnostních rizik.">FAIR</TermWithTooltip>
<TermWithTooltip term="OWASP" explanation="Open Web Application Security Project – organizace poskytující metodiky a standardy pro bezpečnost webových aplikací.">OWASP</TermWithTooltip>
```

### Implementation Notes

- The component uses `react-tooltip` library for tooltip functionality.
- Each tooltip gets a unique ID generated from the term name.
- Tooltips appear on hover with a 300ms delay.
- Terms are styled with dotted underline via CSS Module (`index.module.css`).
- The component accepts `children` prop, allowing custom formatting of the term text.

These rules should be treated as the default operating mode for any automated changes or new features in this repository.\*\*\*
