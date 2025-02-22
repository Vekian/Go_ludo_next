import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ButtonInput({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      className={` ${
        label ? "px-5" : "px-3"
      } py-1 rounded-full text-white hover:brightness-75`}
      onClick={() => onClick()}
      style={{ backgroundColor: color }}
    >
      <FontAwesomeIcon icon={faEdit} className={`${label && "mr-2"}`} />
      {label}
    </button>
  );
}

export default ButtonInput;
