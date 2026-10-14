import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import React from "react";
import { videoLekce1 } from "./chapters/video-lekce-1";
import { zaverecnyKviz } from "./chapters/zaverecny-kviz";

export const testovaciKurz: LearningCourseDefinition = {
  id: "zaklady-aplikacni-bezpecnosti",
  title: "Základy aplikační bezpečnosti",
  description: "Naučte se identifikovat a zabezpečovat zranitelnosti ve vašich aplikacích.",
  estimatedTime: "3 hodiny",
  cpeCredits: 3,
  longDescription: (
    <>
      <p>
        Získejte vhled do odhalování nejčastějších bezpečnostních rizik podle OWASP. Místo čisté teorie uvidíte reálné
        ukázky zranitelného kódu a rozebereme si známé bezpečnostní incidenty – od úniků hesel a krypto klíčů v
        logovacích systémech až po kritické zranitelnosti typu Log4j a útoky na nechráněná rozhraní.
      </p>
      <h2>Co se v kurzu naučíte</h2>
      <ul>
        <li>Bezpečnostní logování a monitoring.</li>
        <li>Pokročilé řízení autorizace (BOLA, BOPLA, BFLA).</li>
        <li>Automatizovaná statická analýza kódu (SAST).</li>
        <li>Správa zranitelných závislostí a Dockeru.</li>
        <li>Ochrana proti injection zranitelnostem.</li>
        <li>Rate Limiting a ochrana zdrojů.</li>
        <li>Bezpečný vývoj s AI (secure vibe coding).</li>
      </ul>
    </>
  ),
  image: {
    src: "https://outcybers.net/img/eventy/ai-hacking-jak-hackeri-lamou-jazykove-modely.png",
    alt: "Náhled kurzu",
  },
  accessCode: "K4UMZA1GWV",
  chapters: [videoLekce1, zaverecnyKviz],
};
