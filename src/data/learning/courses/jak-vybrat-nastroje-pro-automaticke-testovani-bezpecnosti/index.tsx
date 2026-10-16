import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import React from "react";
import { videoLekce } from "./chapters/video-lekce";
import { zaverecnyKviz } from "./chapters/zaverecny-kviz";

export const testovaciKurz: LearningCourseDefinition = {
  id: "jak-vybrat-nastroje-pro-automaticke-testovani-bezpecnosti",
  title: "Jak vybrat nástroje pro automatické testování bezpečnosti",
  description: "Naučte se vybrat, vyhodnotit a nasadit nástroje pro testování bezpečnosti.",
  estimatedTime: "1 hodina",
  cpeCredits: 1,
  longDescription: (
    <>
      <p>
        Kurz vysvětluje motivace firem pro zavedení automatizace – od plnění požadavků compliance a řešení nedostatku
        pentestrů až po zrychlení vývojového cyklu a kontrolu kvality kódu. Tento kurz je výstup z výzkumu cca 30 firem
        dodávajících tyto produkty.
      </p>
      <p>
        Přednáška se věnuje testovacím nástrojům DAST (dynamické testování), SAST (statická analýza kódu) a SCA (analýza
        open-source knihoven a jejich licencí).
      </p>
      <h2>Co se v kurzu naučíte</h2>
      <ul>
        <li>Správně definovat motivaci a návratnost.</li>
        <li>Rozlišovat hlavní typy bezpečnostních nástrojů (DAST, SAST, SCA).</li>
        <li>Definovat požadavky a rozpočet.</li>
        <li>Efektivně komunikovat s vendory.</li>
        <li>Správně provést Proof of Concept (POC).</li>
        <li>Zajistit úspěšné nasazení a provoz ve firmě.</li>
      </ul>
    </>
  ),
  image: {
    src: "img/kurzy/automaticke-testovani-bezpecnosti.png",
    alt: "Náhled kurzu Jak vybrat nástroje pro automatické testování bezpečnosti",
  },
  accessCode: "2K8RWNL5ML",
  chapters: [videoLekce, zaverecnyKviz],
};
