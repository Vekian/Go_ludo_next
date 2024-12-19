import React from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faSearch } from "@fortawesome/free-solid-svg-icons";

function InputSearch() {
  return (
    <div
      className={`${styles.inputWrapper} order-last md:order-2 ml-6 mr-6  relative w-full  md:w-1/3
      `}
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
      <div className="pl-6 hidden md:block">
        <FontAwesomeIcon icon={faBarcode} />
      </div>
    </div>
  );
}

export default InputSearch;
