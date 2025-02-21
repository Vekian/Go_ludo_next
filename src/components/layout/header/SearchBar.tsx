import React from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import InputSearch from "@/components/ui/input/search/InputSearch";

function SearchBar() {
  return (
    <div
      className={`${styles.inputWrapper} order-last md:order-2 ml-6 mr-6  md:w-1/3
      `}
    >
      <div className="w-full">
        <InputSearch label="Rechercher un jeu" />
      </div>

      <div className="pl-6 hidden md:block">
        <FontAwesomeIcon icon={faBarcode} />
      </div>
    </div>
  );
}

export default SearchBar;
