import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ButtonInput({
  label,
  classColor,
  onClick,
}: {
  label: string;
  classColor: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`bg-${classColor} px-5 py-1 rounded-full text-white hover:brightness-75`}
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faEdit} className="mr-2" />
      {label}
    </button>
  );
}

export default ButtonInput;
