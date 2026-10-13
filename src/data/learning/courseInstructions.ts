import { QUIZ_PASS_THRESHOLD_PERCENT } from "@site/src/data/learning/types";

/** Globální pokyny ke studiu zobrazené na úvodu detailu každého kurzu. */
export const COURSE_INSTRUCTIONS: readonly string[] = [
  "Kapitoly procházejte popořadě – další se odemkne až po splnění té předchozí.",
  "V kapitole si můžete otevřít všechny materiály (texty i videa) v libovolném pořadí.",
  `U kapitol s kvízem potřebujete alespoň ${QUIZ_PASS_THRESHOLD_PERCENT}\u00A0% správných odpovědí. Kvíz můžete resetovat a zopakovat.`,
  "Kapitoly bez kvízu označíte jako splněné tlačítkem na konci kapitoly.",
  "Po splnění všech kapitol získáte závěrečné vyhodnocení a certifikát.",
];
