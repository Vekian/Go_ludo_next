import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ButtonSecondary({
  label,
  color,
  onClick,
  icon,
  type,
}: {
  label: string;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: IconProp;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      type={type ? type : "button"}
      className={`hover:opacity-75 bg-white text-neutral-950 rounded-md font-semibold  px-3 py-1.5 `}
      style={{ border: `2px solid ${color}` }}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className={`${label && "me-2"}`} />}
      {label}
    </button>
  );
}

export default ButtonSecondary;
