import React from "react";
import { theme } from "../../../theme/theme";

function ButtonSecondary({ label, color }: { label: string; color: string }) {
  const partsColor: [string, string] = color?.split("-") as [string, string];
  const tailwindColor =
    theme.colors[partsColor[0] as keyof typeof theme.colors]?.[
      partsColor[1] as unknown as keyof (typeof theme.colors)["neutral"]
    ];
  console.log(color);
  return (
    <button
      className={`hover:opacity-75 bg-white text-neutral-950 rounded-md font-semibold  px-3 py-1.5 m-2.5`}
      style={{ border: `2px solid ${tailwindColor}` }}
    >
      {label}
    </button>
  );
}

export default ButtonSecondary;
