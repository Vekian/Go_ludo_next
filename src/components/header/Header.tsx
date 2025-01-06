import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import ButtonPrimary from "../button/ButtonPrimary";
import InputSearch from "./InputSearch";

export default function Header() {
  return (
    <header
      className={`${styles.header} flex flex-wrap  items-center justify-around bg-white`}
    >
      <div className={`${styles.imageWrapper} order-1`}>
        <Image src="/images/logo.png" alt="logo" width={200} height={50} />
      </div>
      <InputSearch />
      <div className="order-3">
        <ButtonPrimary label="Se connecter" color="primary" />
        <ButtonPrimary label="S'inscrire" color="secondary" />
      </div>
    </header>
  );
}
