import React from "react";
import { theme } from "../../../theme/theme";
import styles from "./Onglet.module.scss";
function Onglet({
  label,
  color,
  angle,
  active = false,
}: {
  label: string;
  color: string;
  angle: number;
  active?: boolean;
}) {
  const partsColor: [string, string] = color?.split("-") as [string, string];
  const tailwindColor =
    theme.colors[partsColor[0] as keyof typeof theme.colors]?.[
      partsColor[1] as unknown as keyof (typeof theme.colors)["neutral"]
    ];
  return (
    <div
      className={`${styles.onglet} p-5 text-white font-semibold rounded-t-lg ${
        angle === 1 ? "rotate-2" : "-rotate-2"
      } hover:-translate-y-6 ${
        active ? "-translate-y-6" : "-translate-y-0"
      }  transition border-white border-4 h-24  z-10 -mb-8 text-center ml-3 mr-3`}
      style={{
        backgroundColor: tailwindColor,
      }}
    >
      {label}
    </div>
  );
}

export default Onglet;
