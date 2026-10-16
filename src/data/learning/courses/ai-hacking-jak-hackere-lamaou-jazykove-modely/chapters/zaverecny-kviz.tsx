import type { ChapterDefinition } from "@site/src/data/learning/types";

export const zaverecnyKviz: ChapterDefinition = {
  id: "zaverecny-kviz",
  title: "Závěrečný kvíz",
  summary: "Tato lekce obsahuje závěrečný kvíz.",
  materials: [],
  quiz: {
    questions: [
      {
        id: "q1",
        prompt: "Proč jsou LLM modely zranitelné vůči prompt injection?",
        answers: [
          {
            id: "a",
            text: "AI aplikace neumí spolehlivě odlišit, kde končí uživatelská data a kde začínají systémové instrukce.",
            isCorrect: true,
          },
          {
            id: "b",
            text: "Systémové instrukce mají při generování odpovědi vždy nižší prioritu než obsah dodaný uživatelem.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Protože bezpečnostní guardrails chrání pouze před škodlivým výstupem modelu, nikoli před změnou jeho chování na základě vstupních dat.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Uživatelé nepoužívají dostatečně silná hesla při přihlašování k AI chatbotům.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        prompt:
          "Rozdíl mezi přímou (direct) a nepřímou (indirect) prompt injection je v tom, že nepřímý útok se vkládá do chatovacího okna.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: false },
          { id: "b", text: "Nepravda", isCorrect: true },
        ],
      },
      {
        id: "q3",
        prompt: "Co je to tzv. „Alignment Drift“ při útoku na jazykové modely?",
        answers: [
          { id: "a", text: "Okamžité zhroucení LLM v důsledku přetížení požadavky.", isCorrect: false },
          {
            id: "b",
            text: "Postupné odchylování „morálního kompasu“ a zábran modelu v průběhu konverzace.",
            isCorrect: true,
          },
          { id: "c", text: "Způsob, jakým AI automaticky vyhodnocuje jazyk konverzace.", isCorrect: false },
          { id: "d", text: "Fyzické poškození serveru během trénování modelu.", isCorrect: false },
        ],
      },
      {
        id: "q4",
        prompt:
          "Statické filtry klíčových slov (např. detekující slovo „bomba“) reagují pomaleji než analýza úmyslu v interním klasifikačním systému.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: false },
          { id: "b", text: "Nepravda", isCorrect: true },
        ],
      },
      {
        id: "q5",
        prompt: "Jak funguje technika zvaná „Framing“ při obcházení bezpečnostních filtrů?",
        answers: [
          { id: "a", text: "Změnou IP adresy uživatele před odesláním dotazu.", isCorrect: false },
          { id: "b", text: "Šifrováním celého promptu pomocí AES-256.", isCorrect: false },
          {
            id: "c",
            text: "Zabalení promptu do zdánlivě neškodného kontextu (např. výzkumného, lékařského nebo hypotetického).",
            isCorrect: true,
          },
          { id: "d", text: "Vytvořením nového chatu na platformě a pokračování v útoku zde.", isCorrect: false },
        ],
      },
      {
        id: "q6",
        prompt:
          "Do diagramu ve formátu draw.io nelze schovat skryté instrukce, protože AI agenti čtou pouze vizuální obrázky (PNG/JPEG).",
        answers: [
          { id: "a", text: "Pravda", isCorrect: false },
          { id: "b", text: "Nepravda", isCorrect: true },
        ],
      },
      {
        id: "q7",
        prompt:
          "Jakým způsobem může útočník zneužít AI agenta zpracovávajícího e-maily (např. OpenClaw) k provedení škodlivé akce bez kliknutí uživatele?",
        answers: [
          {
            id: "a",
            text: "Pošle e-mail se skrytou instrukcí, která agenta přesvědčí k automatickému stažení a spustění škodlivého pluginu.",
            isCorrect: true,
          },
          { id: "b", text: "Uhádne administrátorské heslo k e-mailovému serveru.", isCorrect: false },
          { id: "c", text: "Vypne elektrický proud v datovém centru.", isCorrect: false },
          { id: "c", text: "Změní DNS záznamy poskytovatele e-mailu.", isCorrect: false },
        ],
      },
      {
        id: "q8",
        prompt: "Co znamená v kontextu bezpečnosti agentních AI nástrojů výrok „Context is the new perimeter“?",
        answers: [
          {
            id: "a",
            text: "Firemní síť by měla mít nastavený geografický perimetr pouze na Českou republiku.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "AI agenti nepotřebují žádná přístupová práva, protože fungují zcela izolovaně.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Všechny AI modely musí být provozovány výhradně na lokálních mobilních telefonech.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Bezpečnost se již neměří počtem firemních firewallů, ale kontrolou toho, k jakým datům a zdrojům má AI agent přístup.",
            isCorrect: true,
          },
        ],
      },
    ],
  },
};
