import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Link from "next/link";
import UserButton from "./UserButton";

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
      <SearchBar />
      <UserButton />
    </header>
  );
}
