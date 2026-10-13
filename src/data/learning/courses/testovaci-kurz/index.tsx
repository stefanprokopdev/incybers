import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import React from "react";
import { modul1 } from "./chapters/modul-1";
import { modul2 } from "./chapters/modul-2";
import { modul3 } from "./chapters/modul-3";

/** Ukázkový kurz pro ověření platformy. Kapitoly jsou ve složce `chapters/`. */
export const testovaciKurz: LearningCourseDefinition = {
  id: "ai-hacking-jak-hackere-lamaou-jazykove-modely",
  title: "AI hacking: Jak hackeři lámou jazykové modely",
  description:
    "Nahlédněte do mysli útočníků a naučte se prakticky odhalovat slabiny AI aplikací pomocí hacking technik, které dnes skutečně fungují proti nejpoužívanějším modelům.",
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
        <li>
          jak funguje <strong>prompt injection</strong> a proč je tak obtížné ji zcela eliminovat,
        </li>
        <li>
          jak útočníci obcházejí bezpečnostní pravidla modelů (<em>jailbreaking</em>),
        </li>
        <li>jak dochází k úniku citlivých dat ze systémových promptů a kontextu,</li>
        <li>jak otestovat vlastní AI aplikaci a navrhnout účinná opatření.</li>
      </ul>
      <h2>Pro koho je kurz určen</h2>
      <p>
        Pro vývojáře, bezpečnostní specialisty a technické manažery, kteří AI aplikace vyvíjejí, nasazují nebo
        zabezpečují. Nevyžadujeme žádné předchozí zkušenosti s penetračním testováním.
      </p>
      <h2>Jak kurz probíhá</h2>
      <p>
        Kurz tvoří tři moduly s texty, videi a kvízy. Na konci získáte závěrečné vyhodnocení a certifikát o
        absolvování.
      </p>
    </>
  ),
  image: {
    src: "https://outcybers.net/img/eventy/kariera-v-it-jak-se-dostat-na-manazerskou-a-c-level-pozici.png",
    alt: "Žlutý štít s fajfkou a seznam kvízových odpovědí",
  },
  accessCode: "QG6IB9TJ3D",
  chapters: [modul1, modul2, modul3],
};
