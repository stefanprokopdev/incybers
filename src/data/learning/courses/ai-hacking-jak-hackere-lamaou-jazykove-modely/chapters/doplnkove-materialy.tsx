import type { ChapterDefinition } from "@site/src/data/learning/types";
import React from "react";

export const doplnkoveMaterialy: ChapterDefinition = {
  id: "doplnkove-materialy",
  title: "Doplňkové materiály",
  summary: "Kapitola obsahuje doplňkové materiály.",
  materials: [
    {
      id: "doplnkove-materialy-1",
      kind: "text",
      title: "Kdy stačí materiály",
      content: (
        <>
          <p>
            Některé části kurzu slouží jako referenční materiál, checklist nebo shrnutí. U nich není kvíz – vy sami
            posoudíte, že jste obsah prostudovali.
          </p>
          <p>
            Po kliknutí na <strong>Označit kapitolu jako splněnou</strong> se kapitola započítá do postupu v kurzu
            stejně jako úspěšný kvíz. Teprve potom se odemkne závěrečné vyhodnocení (až po všech kapitolách).
          </p>
        </>
      ),
    },
    {
      id: "doplnkove-materialy-2",
      kind: "text",
      title: "Mini checklist",
      content: (
        <ol>
          <li>Mám přehled o tom, jak funguje postup v kurzu.</li>
          <li>Vím, kde najdu závěrečné vyhodnocení a certifikát.</li>
          <li>Rozumím rozdílu mezi kapitolou s kvízem a kapitolou jen s materiály.</li>
        </ol>
      ),
    },
  ],
};
