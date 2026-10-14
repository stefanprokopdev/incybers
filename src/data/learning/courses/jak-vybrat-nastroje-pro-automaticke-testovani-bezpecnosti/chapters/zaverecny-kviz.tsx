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
        prompt:
          "Co je podle webináře nejčastější prvotní motivací firem k pořízení automatizovaných bezpečnostních nástrojů?",
        description:
          "Hlavními impulsy bývají auditní požadavky na compliance (např. DORA) a zároveň reálný požadavek na škálování a zrychlení testování v prostředí, kde je nedostatek kapacit pentestrů.",
        answers: [
          {
            id: "a",
            text: "Snaha automaticky zvýšit platy vývojářům v týmu.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Požadavky na compliance (audity, např. DORA) a nedostatky kapacit pentestrů/potřeba škálovat testování.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Zákonná povinnost mít nástroj nainstalovaný na každém služebním notebooku.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Přechod vývojového týmu na nový operační systém.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        prompt:
          "DAST (Dynamic Application Security Testing) provádí bezpečnostní testy zevnitř aplikace a má plný přístup k jejímu zdrojovému kódu.",
        description:
          "DAST nástroj funguje jako vnější útočník (pentestr) – testuje běžící aplikaci skrz její rozhraní, ale nezná kód ani vnitřní strukturu na pozadí.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: false },
          { id: "b", text: "Nepravda", isCorrect: true },
        ],
      },
      {
        id: "q3",
        prompt: "V čem spočívá hlavní výhoda SAST (Static Application Security Testing) nástrojů oproti DAST?",
        description:
          "SAST analyzuje přímo zdrojový kód ještě před nasazením a dokáže vývojáře navést přímo na konkrétní řádek s chybou.",
        answers: [
          { id: "a", text: "Nevyžadují žádné znalosti programovacího jazyka ze strany vývojářů.", isCorrect: false },
          {
            id: "b",
            text: "Testují výhradně již nasazenou produkční aplikaci.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Kontrolují přímo zdrojový kód a odhalují zranitelnosti velmi brzy v SDLC s přesným označením řádku.",
            isCorrect: true,
          },
          { id: "d", text: "Fungují automaticky bez ohledu na použité technologie a jazyky.", isCorrect: false },
        ],
      },
      {
        id: "q4",
        prompt:
          "Nástroje z kategorie SCA (Software Composition Analysis) analyzují použité open-source knihovny a jejich závislosti, ale nekontrolují vlastní kód napsaný vývojáři.",
        description:
          "SCA se zaměřuje výhradně na tranzitivní závislosti a licence třetích stran (např. v repozitářích), zatímco vlastní aplikační kód nezkoumá.",
        answers: [
          { id: "a", text: "Pravda", isCorrect: true },
          { id: "b", text: "Nepravda", isCorrect: false },
        ],
      },
      {
        id: "q5",
        prompt: "Proč je na internetu témaldy nemožné najít nezávislé srovnávací studie nebo benchmarky DAST nástrojů?",
        description:
          "Výrobci do svých podmínek používání (EULA) zakomponovávají zákazy srovnávacích testů, takže většina veřejných článků na internetu je v podstatě přímým nebo skrytým marketingem samotných vendorů.",
        answers: [
          { id: "a", text: "O tyto nástroje je na trhu minimální zájem.", isCorrect: false },
          { id: "b", text: "Zkoušení více nástrojů najednou způsobuje trvalé poškození serverů.", isCorrect: false },
          {
            id: "c",
            text: "Všechny tyto nástroje jsou vyvíjeny pod jednou státní licencí.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Vendoři mají ve svých smluvních podmínkách striktní klauzule zakazující jakýkoliv nezávislý benchmarking a srovnávání.",
            isCorrect: true,
          },
        ],
      },
      {
        id: "q6",
        prompt:
          "Proč přednášející nedoporučuje, aby výběr nového bezpečnostního nástroje do firmy prováděl řadový zaměstnanec (např. pentester)?",
        description:
          "Řadový zaměstnanec často navrhne nástroj jen podle toho, co zná z minulosti, ale chybí mu manažerský nadhled nad dlouhodobou strategií, rozpočtem a podporou.",
        answers: [
          {
            id: "a",
            text: "Řadový zaměstnanec zná obvykle jen svou agendu a nezná celkový kontext firmy, budoucí vývoj (cloud vs. on-prem), rozpočet ani SLA potřeby.",
            isCorrect: true,
          },
          { id: "b", text: "Řadoví zaměstnanci nemají pravomoc komunikovat v anglickém jazyce.", isCorrect: false },
          { id: "c", text: "Vendoři odmítají odpovídat na technické dotazy od vývojářů.", isCorrect: false },
          { id: "d", text: "Nástroje schválené vývojáři nelze integrovat do CI/CD pipeline.", isCorrect: false },
        ],
      },
      {
        id: "q7",
        prompt:
          "Všichni vendoři bezpečnostních nástrojů účtují licence výhradně podle jednoho pevného modelu, a to podle počtu nalezených zranitelností.",
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
        prompt:
          "Na jakých projektech by se podle doporučení z webináře měl provádět Proof of Concept (POC) vybraného nástroje?",
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
            text: "Na nejkomplexnějších a nejsložitějších projektech, aby se prověřila reálná funkčnost, podpora technologií a míra false positives.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Výhradně na neaktivních projektech bez zdrojového kódu.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Na projektech, které ještě nebyly schváleny vedením.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q9",
        prompt:
          "Při přípravě zakázky nebo tendru je klíčové smluvně ošetřit možnost odstoupení od smlouvy v případě, že vybraný nástroj neprojde úspěšně fází POC podle definovaných metrik.",
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
        prompt: "Jaká je realita po zakoupení a nasazení bezpečnostního nástroje (např. SAST či DAST) ve firmě?",
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
            text: "Všechny zjištěné chyby se automaticky opraví samy během nočního sestavení.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Nástroj vyžaduje vyhrazený čas na konfiguraci, filtraci false positivů, aktualizace a čas vývojářů na opravy nálezů.",
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
          "Startupy nabízející bezpečnostní nástroje jsou pro velké korporace vždy ideální volbou, protože mají rozsáhlou síť lokálních českých zástupců a dlouholeté zkušenosti s veřejnými zakázkami.",
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
            text: "Počtem monitorů vývojáře a velikostí paměti RAM na serveru.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Použitím operačního systému Linux nebo macOS na notebooku.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Počtem odeslaných marketingových e-mailů vendorovi.",
            isCorrect: false,
          },
        ],
      },
    ],
  },
};
