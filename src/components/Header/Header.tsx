import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import ButtonPrimary from "../Button/ButtonPrimary";
import InputSearch from "./InputSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className={`${styles.header} hidden md:flex`}>
      <div className={`${styles.imageWrapper}`}>
        <Image
          src="/images/logo.png"
          alt="logo"
          className="h-100 w-auto"
          layout="responsive"
          width={450}
          height={150}
        />
      </div>
      <InputSearch mobile={false} />
      <div>
        <ButtonPrimary label="Se connecter" color="primary" />
        <ButtonPrimary label="S'inscrire" color="secondary" />
      </div>
    </header>
  );
}
