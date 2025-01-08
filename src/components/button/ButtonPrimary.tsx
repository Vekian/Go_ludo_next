import React from "react";
import styles from "./Button.module.scss";
import { theme } from "../../../theme/theme";

function ButtonPrimary({ label, color }: { label: string; color: string }) {
  const partsColor: [string, string] = color?.split("-") as [string, string];
  const tailwindColor =
    theme.colors[partsColor[0] as keyof typeof theme.colors]?.[
      partsColor[1] as unknown as keyof (typeof theme.colors)["neutral"]
    ];
  return (
    <button
      className={`${styles.button} hover:opacity-75`}
      style={{ backgroundColor: tailwindColor }}
    >
      {label}
    </button>
  );
}

export default ButtonPrimary;
