import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ButtonInput({
  label,
  color,
  onClick,
  icon,
}: {
  label: string;
  color: string;
  onClick: () => void;
  icon?: IconProp;
}) {
  return (
    <button
      className={` ${
        label ? "px-5" : "px-3"
      } py-1 rounded-full text-white hover:brightness-75`}
      onClick={() => onClick()}
      style={{ backgroundColor: color }}
    >
      <FontAwesomeIcon
        icon={icon ?? faEdit}
        className={`${label && "lg:mr-2"}`}
      />
      <span className="lg:inline hidden">{label}</span>
    </button>
  );
}

export default ButtonInput;
