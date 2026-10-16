import type { ChapterDefinition } from "@site/src/data/learning/types";

export const videoLekce2: ChapterDefinition = {
  id: "video-lekce-2",
  title: "Video lekce: Statická analýza kódu a správná správa závislostí",
  summary: "Tato lekce se skládá ze 40 minutové přednášky a kvízu.",
  materials: [
    {
      id: "video-2",
      kind: "video",
      title: "",
      embedUrl: "https://www.youtube.com/embed/TkDkWCRU8yg",
      description: "",
    },
  ],
  quiz: {
    questions: [
      {
        id: "q1",
        prompt:
          "V čem spočívá hlavní výhoda nástrojů pro statickou analýzu kódu, jako je SonarQube nebo CodeQL, oproti penetračním testům?",
        description:
          "Statická analýza kódu kontroluje kód od samého začátku vývojového cyklu (Software Development Life Cycle) a označí přesný řádek s chybou ještě před nasazením.",
        answers: [
          {
            id: "a",
            text: "SAST nástroje dokáží samy opravit všechny chyby bez zásahu vývojáře.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Odhalují chyby a zranitelnosti přímo ve zdrojovém kódu na konkrétním řádku už během vývoje a v CI/CD pipeline.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Zaručují 100% ochranu před odcizením zdrojového kódu.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "SAST funguje zejména na spuštěné aplikaci v produkčním prostředí jako firewall.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        prompt: "Co je to tzv. „Typo-squatting“ při správě knihoven a závislostí?",
        description:
          "Typo-squatting zneužívá nepozornosti vývojářů nebo generování AI asistentů, kdy se nainstaluje škodlivý balíček s překlepem v názvu, který může obsahovat např. post-install skript pro krádež dat.",
        answers: [
          { id: "a", text: "Metoda krádeže open-source balíčků útočníky.", isCorrect: false },
          { id: "b", text: "Pravidlo pro automatické formátování odsazení v kódu.", isCorrect: false },
          { id: "c", text: "Chyba, která způsobuje přepisování uživatelských hesel.", isCorrect: false },
          {
            id: "d",
            text: "Útok, při kterém útočník publikuje škodlivý balíček s názvem velmi podobným originálnímu balíčku.",
            isCorrect: true,
          },
        ],
      },
      {
        id: "q3",
        prompt:
          "Pokud pro známou zranitelnost v knihovně neexistuje oficiální patch a nelze ji aktualizovat, lze riziko snížit pomocí tzv. techniky zvané virtual patching.",
        description:
          "Virtuální patching či kompenzační opatření (jako skrytí zastaralé aplikace za VPN nebo přidání validační vrstvy) omezují dostupnost zranitelnosti pro útočníky, i když samotné jádro kódu nebylo opraveno.",
        answers: [
          {
            id: "a",
            text: "Pravda",
            isCorrect: true,
          },
          {
            id: "b",
            text: "Nepravda",
            isCorrect: false,
          },
        ],
      },
    ],
  },
};
