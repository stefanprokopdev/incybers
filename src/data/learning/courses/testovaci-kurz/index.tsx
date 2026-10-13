import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import React from "react";
import { doplnkoveMaterialy } from "./chapters/doplnkove-materialy";
import { videoLekce } from "./chapters/video-lekce";
import { zaverecnyKviz } from "./chapters/zaverecny-kviz";

export const testovaciKurz: LearningCourseDefinition = {
  id: "ai-hacking-jak-hackere-lamaou-jazykove-modely",
  title: "AI hacking: Jak hackeři lámou jazykové modely",
  description:
    "Nahlédněte do mysli útočníků a naučte se prakticky odhalovat slabiny AI aplikací pomocí hacking technik, které dnes skutečně fungují proti nejpoužívanějším modelům.",
  estimatedTime: "3 hodiny",
  cpeCredits: 3,
  longDescription: (
    <>
      <p>
        Adopce umělé inteligence ve firmách je tak rapidní, že výrazně předbíhá vyspělost technologií, které by měly
        zajišťovat její bezpečnost.
      </p>
      <p>
        Pokud ve firmě implementujete AI agenty a LLM modely s napojením na interní systémy, měli byste zpozornět.
        Útočníkům totiž dnes k exfiltraci dat z vaší firmy stačí neviditelný text v CSS souboru nebo chytře upravený
        diagram.
      </p>
      <h2>Co se v kurzu naučíte</h2>
      <ul>
        <li>Jaké techniky útoků na AI dnes skutečně fungují.</li>
        <li>Jak prakticky testovat prompt injection a jailbreaky.</li>
        <li>Jak odhalovat slabiny AI agentů a AI workflow na reálném příkladu.</li>
        <li>Jak přemýšlet o AI security tak, aby odpovídala realitě, ne marketingu.</li>
      </ul>
      <p>
        <b>Uvidíte například</b>: Jak ochotně modely poskytnou recept na smrtící bojový plyn, jak v přímém přenosu
        přehodnotí svůj morální kompas, nebo jak Gemini odhalí své konkrétní slabiny, a tím pomůže útočníkovi.
      </p>
      <h2>O lektorovi</h2>
      <p>
        <b>Radek Hendrych</b> se profesně věnuje naplno bezpečnosti AI systémů. Působí jako Staff Security Manager ve
        firmě Productboard, kde AI security řeší ze všech úhlů: jak defenzivní a ofenzivní stránku, tak governance i
        řízení rizik. Zároveň patří mezi přední české výzkumníky v oblasti AI bezpečnosti.
      </p>
    </>
  ),
  image: {
    src: "https://outcybers.net/img/eventy/kariera-v-it-jak-se-dostat-na-manazerskou-a-c-level-pozici.png",
    alt: "Žlutý štít s fajfkou a seznam kvízových odpovědí",
  },
  accessCode: "QG6IB9TJ3D",
  chapters: [videoLekce, doplnkoveMaterialy, zaverecnyKviz],
};
