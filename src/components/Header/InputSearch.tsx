import React from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faSearch } from "@fortawesome/free-solid-svg-icons";

function InputSearch({ mobile }: { mobile: boolean }) {
  return (
    <div
      className={`${styles.inputWrapper} relative ${mobile ? "" : " w-1/3"}`}
    >
      <FontAwesomeIcon
        icon={faSearch}
        className={`absolute left-3 top-1/2 transform -translate-y-1/2`}
      />
      <input
        type="text"
        className={`${styles.input} pl-10 rounded-full`}
        placeholder="Rechercher un jeu"
      />
      {!mobile && <FontAwesomeIcon icon={faBarcode} className="pl-6" />}
    </div>
  );
}

export default InputSearch;
