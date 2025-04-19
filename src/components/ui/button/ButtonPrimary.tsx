import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function ButtonPrimary({
  label,
  color,
  onClick,
  icon,
  addClass,
  type,
}: {
  label: string;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: IconProp;
  addClass?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      type={type ? type : "button"}
      className={` hover:brightness-90 text-white rounded-md font-semibold  px-3 py-1.5 ${
        addClass ?? ""
      } `}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <div className="h-3 flex items-center py-3">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={`${label !== "" && "me-2"}`}
          />
        )}
        {label}
      </div>
    </button>
  );
}

export default ButtonPrimary;
