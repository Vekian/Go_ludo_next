import React from "react";
import { theme } from "@/theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function ButtonPrimary({
  label,
  color,
  onClick,
  icon,
  addClass,
}: {
  label: string;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: IconProp;
  addClass?: string;
}) {
  const partsColor: [string, string] = color?.split("-") as [string, string];
  const tailwindColor =
    theme.colors[partsColor[0] as keyof typeof theme.colors]?.[
      partsColor[1] as unknown as keyof (typeof theme.colors)["neutral"]
    ];
  return (
    <button
      className={`bg-${color} hover:brightness-90 text-white rounded-md font-semibold  px-3 py-1.5 ${addClass} `}
      style={{ backgroundColor: tailwindColor }}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
      {label}
    </button>
  );
}

export default ButtonPrimary;
