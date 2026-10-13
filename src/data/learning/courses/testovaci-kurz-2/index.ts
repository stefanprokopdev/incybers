import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import { modul1 } from "./chapters/modul-1";
import { modul2 } from "./chapters/modul-2";
import { modul3 } from "./chapters/modul-3";

/** Ukázkový kurz pro ověření platformy. Kapitoly jsou ve složce `chapters/`. */
export const testovaciKurz2: LearningCourseDefinition = {
  id: "testovaci-kurz-2",
  title: "Testovací kurz 2",
  description:
    "Ukázkový kurz pro ověření platformy: kvízy, materiálové kapitoly bez kvízu a závěrečné vyhodnocení s certifikátem.",
  image: {
    src: "https://outcybers.net/img/eventy/kariera-v-it-jak-se-dostat-na-manazerskou-a-c-level-pozici.png",
    alt: "Žlutý štít s fajfkou a seznam kvízových odpovědí",
  },
  accessCode: "TEST20262",
  chapters: [modul1, modul2, modul3],
};
