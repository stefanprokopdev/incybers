import { QUIZ_PASS_THRESHOLD_PERCENT, type LearningCourseDefinition } from "@site/src/data/learning/types";
import { modul1 } from "./chapters/modul-1";
import { modul2 } from "./chapters/modul-2";
import { modul3 } from "./chapters/modul-3";

/** Ukázkový kurz pro ověření platformy. Kapitoly jsou ve složce `chapters/`. */
export const testovaciKurz: LearningCourseDefinition = {
  id: "testovaci-kurz",
  title: "Testovací kurz",
  description:
    "Ukázkový kurz pro ověření platformy: kvízy, materiálové kapitoly bez kvízu a závěrečné vyhodnocení s certifikátem.",
  image: {
    src: "https://outcybers.net/img/eventy/kariera-v-it-jak-se-dostat-na-manazerskou-a-c-level-pozici.png",
    alt: "Žlutý štít s fajfkou a seznam kvízových odpovědí",
  },
  instructions: [
    "Kapitoly procházejte popořadě – další se odemkne až po splnění té předchozí.",
    "V kapitole si můžete otevřít všechny materiály (texty i videa) v libovolném pořadí.",
    `U kapitol s kvízem potřebujete alespoň ${QUIZ_PASS_THRESHOLD_PERCENT}\u00A0% správných odpovědí. Kvíz můžete resetovat a zopakovat.`,
    "Kapitoly bez kvízu označíte jako splněné tlačítkem na konci kapitoly.",
    "Po splnění všech kapitol získáte závěrečné vyhodnocení a certifikát.",
  ],
  accessCode: "TEST2026",
  chapters: [modul1, modul2, modul3],
};
