import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import ButtonPrimary from "../button/ButtonPrimary";
import InputSearch from "./InputSearch";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className={`${styles.header} flex flex-wrap  items-center justify-around bg-white fixed z-50`}
    >
      <div className={`${styles.imageWrapper} order-1`}>
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={200} height={50} />
        </Link>
      </div>
      <InputSearch />
      <div className="order-3">
        <ButtonPrimary label="Se connecter" color="primary-600" />
        <ButtonPrimary label="S'inscrire" color="primary-900" />
      </div>
    </header>
  );
}
