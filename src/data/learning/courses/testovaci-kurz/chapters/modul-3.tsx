import React from "react";
import type { ChapterDefinition } from "@site/src/data/learning/types";

export const modul3: ChapterDefinition = {
  id: "modul-3",
  title: "Doplňkové materiály (bez kvízu)",
  summary: "Kapitola jen s obsahem – po prostudování ji ručně označíte jako splněnou.",
  materials: [
    {
      id: "modul-3-text",
      kind: "text",
      title: "Kdy stačí materiály",
      content: (
        <>
          <p>
            Některé části kurzu slouží jako referenční materiál, checklist nebo shrnutí. U nich není kvíz – vy
            sami posoudíte, že jste obsah prostudovali.
          </p>
          <p>
            Po kliknutí na <strong>Označit kapitolu jako splněnou</strong> se kapitola započítá do postupu v kurzu
            stejně jako úspěšný kvíz. Teprve potom se odemkne závěrečné vyhodnocení (až po všech kapitolách).
          </p>
        </>
      ),
    },
    {
      id: "modul-3-checklist",
      kind: "text",
      title: "Mini checklist",
      content: (
        <ul>
          <li>Mám přehled o tom, jak funguje postup v kurzu.</li>
          <li>Vím, kde najdu závěrečné vyhodnocení a certifikát.</li>
          <li>Rozumím rozdílu mezi kapitolou s kvízem a kapitolou jen s materiály.</li>
        </ul>
      ),
    },
  ],
};
