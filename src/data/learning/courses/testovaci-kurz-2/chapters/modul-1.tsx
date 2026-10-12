import React from "react";
import type { ChapterDefinition } from "@site/src/data/learning/types";

export const modul1: ChapterDefinition = {
  id: "modul-1",
  title: "Úvod do platformy",
  summary: "Jak funguje studium kapitol, materiály a kvízy.",
  materials: [
    {
      id: "modul-1-text",
      kind: "text",
      title: "Jak postupovat",
      content: (
        <>
          <p>
            Každý kurz se skládá z kapitol. V rámci kapitoly si můžete prohlídnout všechny výukové materiály v
            libovolném pořadí – texty i videa.
          </p>
          <p>
            U kapitol s kvízem potřebujete alespoň <strong>80&nbsp;%</strong> správných odpovědí. Kapitoly pouze s
            materiály si označíte jako splněné tlačítkem na konci kapitoly.
          </p>
          <p>
            Přístup ke kurzu získáte zadáním kódu v levém panelu (pole „Kód kurzu“) nebo přes roli s plným
            přístupem.
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
