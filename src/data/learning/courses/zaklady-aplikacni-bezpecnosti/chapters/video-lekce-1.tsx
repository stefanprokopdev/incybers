import type { ChapterDefinition } from "@site/src/data/learning/types";

export const videoLekce1: ChapterDefinition = {
  id: "video-lekce-1",
  title: "Video lekce: Bezpečné logování, monitoring a víceúrovňová autorizace",
  summary: "Tato lekce se skládá ze 40 minutové přednášky a kvízu.",
  materials: [
    {
      id: "video-1",
      kind: "video",
      title: "",
      embedUrl: "https://www.youtube.com/embed/tdGWBjmKibw",
      description: "",
    },
  ],
  quiz: {
    questions: [
      {
        id: "q1",
        prompt:
          "Co je hlavním rizikem, pokud aplikace před logováním neodfiltruje vstupní data a zaloguje např. heslo nebo privátní klíč?",
        description:
          "Jakmile se nezašifrované heslo nebo privátní klíč dostane do logů (např. jako v reálném incidentu peněženek Solana Slope), má k němu přístup každý uživatel či útočník s přístupem k logovacímu systému.",
        answers: [
          {
            id: "a",
            text: "Logovací soubor zabere více místa na disku a zpomalí logovací databázi a nástroj.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Aplikace automaticky přestane odesílat HTTP požadavky na backend, protože odhalí chybu.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Citlivé údaje se uloží do logovacího systému.",
            isCorrect: true,
          },
          {
            id: "d",
            text: "Dojde k okamžitému zablokování uživatelského účtu na úrovni operačního systému.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        prompt:
          "Pro správné sledování requestů napříč distribuovanými servery je osvědčenou praxí uchovávat časové údaje v UTC a k požadavkům přikládat tzv. Correlation ID.",
        description:
          "Jednotný časový formát (ISO/UTC) a unikátní Correlation ID umožňují přesně spárovat a sledovat průchod jednoho požadavku napříč všemi servery a mikroslužbami.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: true },
          { id: "b", text: "Nepravda", isCorrect: false },
        ],
      },
      {
        id: "q3",
        prompt: "Jaký je základní rozdíl mezi autentizací a autorizací?",
        description:
          "Autentizace zjišťuje a ověřuje identitu přihlášeného subjektu, zatímco autorizace rozhoduje o tom, k jakým funkcím a datům má daná identita přístup.",
        answers: [
          {
            id: "a",
            text: "Autentizace ověřuje identitu uživatele, zatímco autorizace prověřuje jeho oprávnění.",
            isCorrect: true,
          },
          {
            id: "b",
            text: "Autentizace se řeší na frontendu, zatímco autorizace probíhá výhradně na backendu.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Autentizace slouží k šifrování dat, zatímco autorizace data dešifruje.",
            isCorrect: false,
          },
          { id: "d", text: "Mezi pojmy není žádný rozdíl, jde o synonyma.", isCorrect: false },
        ],
      },
      {
        id: "q4",
        prompt:
          "Zranitelnost BFLA nastává v momentě, kdy uživatel dokáže spustit funkci nebo zavolat endpoint, ke kterému by neměl mít přístup.",
        description:
          "BFLA spočívá v chybějící nebo špatně nastavené kontrole oprávnění na úrovni funkcí/endpointů, což útočníkovi umožní provést akci vyhrazenou např. administrátorům.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: true },
          { id: "b", text: "Nepravda", isCorrect: false },
        ],
      },
      {
        id: "q5",
        prompt: "Co charakterizuje zranitelnost zvanou BOPLA?",
        description:
          "BOPLA znamená, že aplikace neprovádí selektivní filtraci polí (properties) objektu z backendu na frontend nebo neomezuje, které vlastnosti smí uživatel v požadavku změnit.",
        answers: [
          {
            id: "a",
            text: "Uživatel se nemůže přihlásit ke svému účtu kvůli poškozenému objektu v databázi.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Uživatel má sice právo k danému objektu přistoupit, ale backend nekontroluje přístup k jeho jednotlivým vlastnostem, takže uvidí nebo upraví i citlivá data.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Aplikace automaticky maže všechny objekty starší než 30 dní.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Jde o chybu, která se vyskytuje výhradně u mobilních aplikací pro iOS.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q6",
        prompt:
          "Spoléhat se na to, že neautorizovaný endpoint je bezpečný jen proto, že má tajnou, dlouhou nebo těžko uhádnutelnou URL adresu (tzv. Security through Obscurity), je z hlediska bezpečnosti dostačující.",
        description:
          "Utajení URL adresy či endpointu (obscurity) není bezpečnost. Jakmile se odkaz vyzradí (např. únikem v logu, sdílením nebo indexací), k datům získá přístup kdokoliv.",
        answers: [
          {
            id: "a",
            text: "Pravda",
            isCorrect: false,
          },
          { id: "b", text: "Nepravda", isCorrect: true },
        ],
      },
    ],
  },
};
