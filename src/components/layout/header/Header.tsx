"use client";
import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Link from "next/link";
import UserButton from "./UserButton";
import SidemenuButton from "./SidemenuButton";
import { AppBar } from "@mui/material";
import { theme } from "@/theme/theme";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.colors.white,
        boxShadow: "none",
      }}
    >
      <div
        className={`${styles.imageWrapper} order-1 flex items-center justify-around`}
      >
        <div className={`${styles.imageWrapper} order-1 flex items-center`}>
          <SidemenuButton />
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={200} height={50} />
          </Link>
        </div>
        <SearchBar />
        <UserButton />
      </div>
    </AppBar>
  );
}
