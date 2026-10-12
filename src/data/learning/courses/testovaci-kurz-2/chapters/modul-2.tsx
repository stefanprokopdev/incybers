import React from "react";
import type { ChapterDefinition } from "@site/src/data/learning/types";

export const modul2: ChapterDefinition = {
  id: "modul-2",
  title: "Bezpečnostní minimum pro vývojáře",
  summary: "Krátký přehled návyků, které se vyplatí mít na paměti každý den.",
  materials: [
    {
      id: "modul-2-text",
      kind: "text",
      title: "Tři jednoduché zásady",
      content: (
        <>
          <ol>
            <li>Validujte vstupy na serveru a používejte parametrizované dotazy.</li>
            <li>Neukládejte hesla v plain textu – používejte moderní hash algoritmy.</li>
            <li>Logujte bezpečnostní události, ale neexponujte citlivá data ve výstupech pro uživatele.</li>
          </ol>
          <p>Tento modul je záměrně stručný – slouží k otestování druhé kapitoly a odemykání po splnění kvízu.</p>
        </>
      ),
    },
    {
      id: "modul-2-video",
      kind: "video",
      title: "Ukázkové video (placeholder)",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Sem vložte embed vašeho školicího videa.",
    },
  ],
  quiz: {
    questions: [
      {
        id: "q1",
        prompt: "Kde by měla probíhat validace vstupů?",
        answers: [
          { id: "a", text: "Primárně na serveru", isCorrect: true },
          { id: "b", text: "Pouze v CSS", isCorrect: false },
          { id: "c", text: "Nikde, stačí HTTPS", isCorrect: false },
        ],
      },
      {
        id: "q2",
        prompt: "Jak ukládat hesla uživatelů?",
        answers: [
          { id: "a", text: "V databázi jako plain text", isCorrect: false },
          { id: "b", text: "Pomocí vhodného hash algoritmu", isCorrect: true },
          { id: "c", text: "V cookies bez šifrování", isCorrect: false },
        ],
      },
      {
        id: "q3",
        prompt: "Co je vhodné zobrazit koncovému uživateli při chybě?",
        answers: [
          { id: "a", text: "Stack trace a SQL dotaz", isCorrect: false },
          { id: "b", text: "Obecnou zprávu, detaily logovat server-side", isCorrect: true },
          { id: "c", text: "Nic – aplikace spadne bez hlášky", isCorrect: false },
        ],
      },
      {
        id: "q4",
        prompt: "Proč parametrizovat SQL dotazy?",
        answers: [
          { id: "a", text: "Kvůli rychlejšímu designu UI", isCorrect: false },
          { id: "b", text: "Kvůli prevenci SQL injection", isCorrect: true },
          { id: "c", text: "Kvůli SEO", isCorrect: false },
        ],
      },
      {
        id: "q5",
        prompt: "Co se stane po splnění tohoto kvízu?",
        answers: [
          { id: "a", text: "Odemkne se další kapitola kurzu", isCorrect: true },
          { id: "b", text: "Automatické odhlášení", isCorrect: false },
          { id: "c", text: "Smazání kurzu", isCorrect: false },
        ],
      },
    ],
  },
};
