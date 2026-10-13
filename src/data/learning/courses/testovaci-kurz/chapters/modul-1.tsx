import type { ChapterDefinition } from "@site/src/data/learning/types";
import React from "react";

export const modul1: ChapterDefinition = {
  id: "modul-1",
  title: "Informace o kurzu",
  summary: "Tady najdete informace o kurzu, co se v něm naučíte a v další kapitole pak samotný záznam webináře.",
  materials: [
    {
      id: "modul-1-text",
      kind: "text",
      title: "Jak postupovat",
      content: (
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
          <p>Co se na webináři naučíte</p>

          <p>
            ✓ Jaké techniky útoků na AI dnes skutečně fungují.
            <br />✓ Jak prakticky testovat prompt injection a jailbreaky.
            <br />✓ Jak odhalovat slabiny AI agentů a AI workflow na reálném příkladu.
            <br />✓ Jak přemýšlet o AI security tak, aby odpovídala realitě, ne marketingu.
          </p>

          <p>Uvidíte například</p>

          <p>
            Uvidíte například: Jak ochotně modely poskytnou recept na smrtící bojový plyn, jak v přímém přenosu
            přehodnotí svůj morální kompas, nebo jak Gemini odhalí své konkrétní slabiny, a tím pomůže útočníkovi.
          </p>

          <p>O přednášejícím</p>

          <p>
            Radek Hendrych se profesně věnuje naplno bezpečnosti AI systémů. Působí jako Staff Security Manager ve firmě
            Productboard, kde AI security řeší ze všech úhlů: jak defenzivní a ofenzivní stránku, tak governance i
            řízení rizik. Zároveň patří mezi přední české výzkumníky v oblasti AI bezpečnosti.
          </p>
        </>
      ),
    },
  ],
  quiz: {
    questions: [
      {
        id: "q1",
        prompt: "Co je potřeba splnit, aby se odemkla další kapitola?",
        answers: [
          { id: "a", text: "Přečíst všechny texty v pořadí", isCorrect: false },
          { id: "b", text: "Kvíz v předchozí kapitole s alespoň 80 %", isCorrect: true },
          { id: "c", text: "Počkat 24 hodin", isCorrect: false },
        ],
      },
      {
        id: "q2",
        prompt: "Lze výukové materiály v kapitole přeskakovat?",
        answers: [
          { id: "a", text: "Ano, pořadí materiálů není vynucené", isCorrect: true },
          { id: "b", text: "Ne, vždy jen postupně od prvního", isCorrect: false },
          { id: "c", text: "Jen pokud máte roli full access", isCorrect: false },
        ],
      },
      {
        id: "q3",
        prompt: "Co dělá tlačítko „Resetovat kvíz“?",
        answers: [
          { id: "a", text: "Smaže celý kurz z dashboardu", isCorrect: false },
          { id: "b", text: "Umožní kvíz zopakovat od začátku", isCorrect: true },
          { id: "c", text: "Automaticky nastaví 100 %", isCorrect: false },
        ],
      },
      {
        id: "q4",
        prompt: "Kde zadáte kód pro přihlášení ke kurzu?",
        answers: [
          { id: "a", text: "V patičce webu", isCorrect: false },
          { id: "b", text: "V levém panelu po přihlášení", isCorrect: true },
          { id: "c", text: "V kvízu první kapitoly", isCorrect: false },
        ],
      },
      {
        id: "q5",
        prompt: "Kolik správných odpovědí typicky stačí u kvízu s pěti otázkami (práh 80 %)?",
        answers: [
          { id: "a", text: "3 z 5", isCorrect: false },
          { id: "b", text: "4 z 5", isCorrect: true },
          { id: "c", text: "5 z 5 vždy", isCorrect: false },
        ],
      },
    ],
  },
};
