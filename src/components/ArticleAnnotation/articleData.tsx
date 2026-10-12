import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import type { IconName } from "@site/src/utils/faIcon";
import React from "react";

library.add(fas);

export interface ArticleData {
  icon: IconName;
  highlightedText: string;
  title: string;
  introText: React.ReactNode;
  description: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const articleAnnotations: Record<string, ArticleData> = {
  "/cheat-sheety/json-web-token-jwt/": {
    icon: "square-binary",
    highlightedText: "JSON Web Token (JWT)",
    title: "bezpečně",
    imageSrc: "/img/pages/secure-jwt.png",
    imageAlt: "Náhledový obrázek zabezpečený JWT",
    introText: (
      <p>
        <strong>JWT se dnes používá téměř všude. A právě proto bývá častým cílem útoků.</strong>
      </p>
    ),
    description: (
      <p>
        V tomhle článku se podíváme na nejčastější chyby, které vývojáři dělají při používání JWT, co z nich může
        vzniknout za průšvihy a jak psát bezpečný kód, který tokeny využívá správně. Bez zbytečné teorie, jen to, co
        fakt potřebujete vědět.
      </p>
    ),
    buttonText: "Číst dále",
    buttonLink: "/cheat-sheety/json-web-token-jwt/",
  },
  "/checklisty/autentizace/": {
    icon: "list-check",
    highlightedText: "Programování autentizace",
    title: "- checklist",
    imageSrc: "/img/pages/secure-authorization-checklist.png",
    imageAlt: "Náhledový obrázek checklist pro bezpečnou autorizaci",
    introText: (
      <p>
        <strong>
          Autentizace je často to první, co v aplikaci programujete. A bohužel taky první, co útočníci zkouší obejít.
        </strong>
      </p>
    ),
    description: (
      <p>
        Připravili jsme praktický checklist pro vývojáře, který vám pomůže vyhnout se nejčastějším chybám při
        implementaci přihlašování, session managementu nebo dvoufaktorového ověření. Krátké, přehledné, rovnou k věci,
        abyste nemuseli řešit průšvihy zpětně.
      </p>
    ),
    buttonText: "Číst dále",
    buttonLink: "/checklisty/autentizace/",
  },
  "/zranitelnosti/category/owasp-low-code--no-code-top-10/": {
    icon: "boxes-stacked",
    highlightedText: "Low-code/No-code",
    title: "zranitelnosti",
    imageSrc: "/img/pages/owasp-lcnc-top-10.png",
    imageAlt: "Náhledový obrázek Low-code/No-code top 10 zranitelnosti",
    introText: (
      <p>
        <strong>Low-code a no-code platformy zrychlují vývoj, ale bezpečnost často zůstává stranou.</strong>
      </p>
    ),
    description: (
      <p>
        OWASP vydal speciální Top 10 seznam nejčastějších zranitelností v těchto prostředích. Pokud stavíte aplikace
        lowcode/nocode aplikace, měli byste ho znát. V článku najdete jednotlivé hrozby, jak vypadají v praxi a co s
        nimi můžete udělat, i když nejste bezpečnostní expert.
      </p>
    ),
    buttonText: "Číst dále",
    buttonLink: "/zranitelnosti/category/owasp-low-code--no-code-top-10/",
  },
  "/zranitelnosti/category/owasp-low-code-no-code-top-10/": {
    icon: "boxes-stacked",
    highlightedText: "Low-code/No-code",
    title: "zranitelnosti",
    imageSrc: "/img/pages/owasp-lcnc-top-10.png",
    imageAlt: "Náhledový obrázek Low-code/No-code top 10 zranitelnosti",
    introText: (
      <p>
        <strong>Low-code a no-code platformy zrychlují vývoj, ale bezpečnost často zůstává stranou.</strong>
      </p>
    ),
    description: (
      <p>
        OWASP vydal speciální Top 10 seznam nejčastějších zranitelností v těchto prostředích. Pokud stavíte aplikace
        lowcode/nocode aplikace, měli byste ho znát. V článku najdete jednotlivé hrozby, jak vypadají v praxi a co s
        nimi můžete udělat, i když nejste bezpečnostní expert.
      </p>
    ),
    buttonText: "Číst dále",
    buttonLink: "/zranitelnosti/category/owasp-low-code-no-code-top-10/",
  },
};
