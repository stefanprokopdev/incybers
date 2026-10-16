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
        prompt: "Co je nejčastější motivací firem k pořízení automatizovaných bezpečnostních nástrojů?",
        description:
          "Hlavními impulsy bývají auditní požadavky na compliance (např. DORA) a zároveň reálný požadavek na škálování a zrychlení testování v prostředí, kde je nedostatek kapacit pentestrů.",
        answers: [
          {
            id: "a",
            text: "Snaha automaticky snížit platy vývojářům, testerům a bezpečákům v týmu.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Požadavky na compliance (audity, např. DORA) a nedostatky kapacit pentestrů/potřeba škálovat testování.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Zákonná povinnost mít nástroj nainstalovaný pro každý kritický produkt/aplikaci.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Modernizace aplikace a předcházení technickému dluhu.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        prompt: "DAST provádí bezpečnostní testy zevnitř aplikace a má plný přístup ke zdrojovému kódu.",
        description:
          "DAST nástroj funguje jako vnější útočník (pentestr) – testuje běžící aplikaci skrz její rozhraní, ale nezná kód ani vnitřní strukturu na pozadí.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: false },
          { id: "b", text: "Nepravda", isCorrect: true },
        ],
      },
      {
        id: "q3",
        prompt: "V čem spočívá hlavní výhoda SAST nástrojů oproti DAST?",
        description:
          "SAST analyzuje přímo zdrojový kód ještě před nasazením a dokáže vývojáře navést přímo na konkrétní řádek s chybou.",
        answers: [
          { id: "a", text: "Nevyžadují žádné znalosti programovacího jazyka ze strany vývojářů.", isCorrect: false },
          {
            id: "b",
            text: "Bezpečně testují již nasazenou produkční aplikaci.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Kontrolují zdrojový kód a odhalují zranitelnosti s přesným řádkem kódu.",
            isCorrect: true,
          },
          { id: "d", text: "Fungují automaticky bez ohledu na použité technologie a jazyky.", isCorrect: false },
        ],
      },
      {
        id: "q4",
        prompt:
          "SCA nástroje analyzují použité open-source knihovny a jejich závislosti, ale nekontrolují kód napsaný vývojáři.",
        description:
          "SCA se zaměřuje výhradně na tranzitivní závislosti a licence třetích stran (např. v repozitářích), zatímco vlastní aplikační kód nezkoumá.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: true },
          { id: "b", text: "Nepravda", isCorrect: false },
        ],
      },
      {
        id: "q5",
        prompt: "Proč je na internetu nemožné najít nezávislé studie nebo benchmarky DAST nástrojů?",
        description:
          "Výrobci do svých podmínek používání (EULA) zakomponovávají zákazy srovnávacích testů, takže většina veřejných článků na internetu je v podstatě přímým nebo skrytým marketingem samotných vendorů.",
        answers: [
          { id: "a", text: "O tyto nástroje je na trhu zatím minimální zájem, jsou nové.", isCorrect: false },
          {
            id: "b",
            text: "Zkoušení více nástrojů najednou způsobuje problémy, protože se nástroje mezi sebou bijí.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Všechny tyto nástroje jsou vyvíjeny pod jednou státní licencí.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Výrobci mají ve smluvních podmínkách podmínky zakazující benchmarking a srovnávání.",
            isCorrect: true,
          },
        ],
      },
      {
        id: "q6",
        prompt:
          "Proč se nedoporučuje, aby výběr nového nástroje do firmy prováděl řadový zaměstnanec (např. pentester)?",
        description:
          "Řadový zaměstnanec často navrhne nástroj jen podle toho, co zná z minulosti, ale chybí mu manažerský nadhled nad dlouhodobou strategií, rozpočtem a podporou.",
        answers: [
          {
            id: "a",
            text: "Zaměstnanec většinou zná jen svou agendu a nezná celkový kontext firmy, budoucí vývoj (cloud vs. on-prem), rozpočet a SLA potřeby.",
            isCorrect: true,
          },
          {
            id: "b",
            text: "Řadoví zaměstnanci nemají pravomoc komunikovat s výrobci nebo rozhodovat o nákupu.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Výrobci odmítají odpovídat na technické dotazy od vývojářů, chtějí se bavit pouze s manažery.",
            isCorrect: false,
          },
          { id: "d", text: "Nástroje se špatně integrují do CI/CD pipeline.", isCorrect: false },
        ],
      },
      {
        id: "q7",
        prompt:
          "Všichni výrobci nástrojů účtují licence výhradně podle jednoho pevného modelu, a to podle počtu nalezených zranitelností.",
        description:
          "Licenční modely se u různých vendorů zásadně liší – někteří účtují podle počtu vývojářů na GitHubu, jiní podle počtu URL/FQDN adres, nebo podle počtu spuštěných testovacích skenů.",
        answers: [
          {
            id: "a",
            text: "Pravda",
            isCorrect: false,
          },
          { id: "b", text: "Nepravda", isCorrect: true },
        ],
      },
      {
        id: "q8",
        prompt: "Na jakých projektech by se měl provádět Proof of Concept (PoC) vybraného nástroje?",
        description:
          "Testování na jednoduchém projektu je chyba, protože na něm funguje téměř vše. Pouze na složitém a komplexním projektu se ukáže, jak si nástroj poradí např. s JavaScriptem, autentizací či falešnými poplachy.",
        answers: [
          {
            id: "a",
            text: "Na nejjednodušších a triviálních projektech, kde se nemůže nic rozbít.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Na nejkomplexnějších a nejsložitějších projektech, aby se prověřila reálná funkčnost.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Výhradně na neaktivních projektech bez zdrojového kódu.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Na neprodukčních projektech, které ještě nebyly schváleny vedením.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q9",
        prompt:
          "Při přípravě zakázky nebo tendru je klíčové smluvně ošetřit možnost odstoupení od smlouvy v případě, že vybraný nástroj neprojde úspěšně fází PoC podle definovaných metrik.",
        description:
          "Smluvní výjimka chrání firmu před tím, aby musela platit dlouholeté licence za nástroj, který v reálném prostředí selže nebo se ukáže jako nefunkční.",
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
      {
        id: "q10",
        prompt: "Jaká je realita po zakoupení a nasazení bezpečnostního nástroje ve firmě?",
        description:
          "Pořízení nástroje je pouze první krok. Bez vyhrazených kapacit na konfiguraci, správu přístupů a reakce na hlášené chyby zůstane nástroj ležet bez využití.",
        answers: [
          {
            id: "a",
            text: "Nástroj funguje zcela autonomně a nevyžaduje žádný další čas ani lidské zdroje.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Všechny nalezené chyby se automaticky opravují v pipeline.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Nástroj vyžaduje vyhrazený čas na konfiguraci, filtraci false positives, aktualizace a čas vývojářů na opravy nálezů.",
            isCorrect: true,
          },
          {
            id: "d",
            text: "Nástroj do jednoho týdne zcela nahradí potřebu jakýchkoliv bezpečnostních školení.",
            isCorrect: true,
          },
        ],
      },
      {
        id: "q11",
        prompt:
          "Startupy nabízející bezpečnostní nástroje jsou pro velké korporace vždy ideální volbou, protože mají rozsáhlou síť lokálních zástupců a dlouholeté zkušenosti s veřejnými zakázkami.",
        description:
          "Startupy naopak často nemají zkušenosti s formalitami veřejných zakázek, nemají lokální české partnery pro přeprodej licencí a zdlouhavý korporátní nákupní proces je pro ně příliš náročný.",
        answers: [
          {
            id: "a",
            text: "Pravda",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Nepravda",
            isCorrect: true,
          },
        ],
      },
      {
        id: "q12",
        prompt: "Při výběru SAST nástroje musí firma zvážit klíčový kompromis mezi:",
        description:
          "Existují SAST nástroje, které jdou do obrovské hloubky v konkrétním jazyce, a nástroje s širokým záběrem napříč mnoha jazyky. Výběr závisí na technologickém stacku firmy.",
        answers: [
          {
            id: "a",
            text: "Hloubkou znalosti jednoho konkrétního programovacího jazyka a šířkou podpory více různých jazyků.",
            isCorrect: true,
          },
          {
            id: "b",
            text: "Počtem řádků kódu a počtem vývojářů v týmu.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Použitím operačního systému Linux, Windows nebo macOS.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Počtem hodin strávených vývojem a počtem hodin strávených testováním.",
            isCorrect: false,
          },
        ],
      },
    ],
  },
};
