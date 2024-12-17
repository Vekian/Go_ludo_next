import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBarcode } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../Button/ButtonPrimary";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/logo.png"
          alt="logo"
          className="h-100 w-auto"
          layout="responsive"
          width={450}
          height={150}
        />
      </div>
      <div className={`${styles.inputWrapper} relative`}>
        <FontAwesomeIcon
          icon={faSearch}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2`}
        />
        <input
          type="text"
          className={`${styles.input} pl-10 rounded-full`}
          placeholder="Rechercher un jeu"
        />
        <FontAwesomeIcon icon={faBarcode} className="pl-16" />
      </div>
      <div>
        <ButtonPrimary label="Se connecter" color="primary" />
        <ButtonPrimary label="S'inscrire" color="secondary" />
      </div>
    </header>
  );
}
