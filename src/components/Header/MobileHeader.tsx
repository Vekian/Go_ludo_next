import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBarcode } from "@fortawesome/free-solid-svg-icons";
import InputSearch from "./InputSearch";

function MobileHeader() {
  return (
    <header className={`${styles.header} md:hidden block  pl-5 pr-5`}>
      <div
        className={`${styles.imageWrapper} flex items-center justify-between`}
      >
        <Image
          src="/images/logo.png"
          alt="logo"
          className="h-100 w-auto"
          layout="responsive"
          width={450}
          height={150}
        />
        <FontAwesomeIcon icon={faBarcode} className="pl-16" />
      </div>
      <InputSearch mobile={true} />
    </header>
  );
}

export default MobileHeader;
