import React from "react";
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
  return (
    <button
      className={` hover:brightness-90 text-white rounded-md font-semibold  px-3 py-1.5 ${addClass} `}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
      {label}
    </button>
  );
}

export default ButtonPrimary;
