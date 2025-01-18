import React from "react";
import { theme } from "@/theme/theme";

function ButtonPrimary({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const partsColor: [string, string] = color?.split("-") as [string, string];
  const tailwindColor =
    theme.colors[partsColor[0] as keyof typeof theme.colors]?.[
      partsColor[1] as unknown as keyof (typeof theme.colors)["neutral"]
    ];
  return (
    <button
      className={`bg-${color} hover:brightness-90 text-white rounded-md font-semibold  px-3 py-1.5 m-2.5`}
      style={{ backgroundColor: tailwindColor }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ButtonPrimary;
