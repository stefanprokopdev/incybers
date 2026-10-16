import type { ChapterDefinition } from "@site/src/data/learning/types";

export const videoLekce3: ChapterDefinition = {
  id: "video-lekce-3",
  title: "Video lekce: Statická analýza kódu a správná správa závislostí",
  summary: "Tato lekce se skládá z 30 minutové přednášky a kvízu.",
  materials: [
    {
      id: "video-3",
      kind: "video",
      title: "",
      embedUrl: "https://www.youtube.com/embed/1k1evuk5am8",
      description: "",
    },
  ],
  quiz: {
    questions: [
      {
        id: "q1",
        prompt: "Jaký je primární účel zavádění Rate Limitingu a Web Application Firewallu (WAF)?",
        description:
          "Rate limiting a WAF zamezují zneužití služeb (např. opakovanému posílání SMS či volání placených AI API) a filtrují škodlivé požadavky ještě před příchodem na server.",
        answers: [
          {
            id: "a",
            text: "Ochrana aplikace před DDoS útoky, neúměrným čerpáním výpočetních a finančních zdrojů.",
            isCorrect: true,
          },
          {
            id: "b",
            text: "Automatické odhalování moderních útoků prováděných AI boty.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Nahrazení potřeby provádět code review a psát unit testy.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Zrychlení bezpečnostního testování vyvíjených aplikací.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        prompt:
          "Použití ORM frameworku garantuje 100% ochranu před SQL injection, i když vývojář v aplikaci skládá dotazy pomocí raw SQL řetězců.",
        description:
          "I při použití ORM vzniká riziko SQL injection, pokud vývojář použije neosetřený RAW SQL dotaz nebo neprověřené řetězce bez parametrizace.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: false },
          { id: "b", text: "Nepravda", isCorrect: true },
        ],
      },
      {
        id: "q3",
        prompt: "Co je podle zásadní pro zachování bezpečnosti při vývoji s AI asistenty (Cursor, Copilot apod.)?",
        description:
          "Pro bezpečný vývoj s AI je nutné definovat standardy architektury v repozitáři, dělat malé kontrolovatelné změny a výstupy vždy auditovat lidským review nebo statickou analýzou.",
        answers: [
          {
            id: "a",
            text: "Důvěřovat vygenerovanému kódu a nevěnovat čas jeho kontrole.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Nastavit jasná pravidla, provádět malé auditovatelné změny a zachovat lidské code review.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Zakázat používání jakýchkoliv automatických testů a linterů.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Nechat AI vygenerovat celou aplikaci najednou.",
            isCorrect: false,
          },
        ],
      },
    ],
  },
};
