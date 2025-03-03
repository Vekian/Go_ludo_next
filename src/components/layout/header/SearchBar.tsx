import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import InputSearch from "@/components/ui/input/search/InputSearch";

function SearchBar() {
  return (
    <div
      className={` order-2  flex items-center md:w-1/3 
      `}
    >
      <div className="w-full hidden md:block">
        <InputSearch label="Rechercher un jeu" />
      </div>

      <div className="pl-6 hidden md:block">
        <FontAwesomeIcon icon={faBarcode} className="text-black" />
      </div>
    </div>
  );
}

export default SearchBar;
