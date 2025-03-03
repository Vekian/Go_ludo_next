"use client";
import React from "react";
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
      <div className={` order-1 flex items-center min-h-16`}>
        <div className="flex w-full justify-around">
          <div className={` order-1 flex items-center`}>
            <SidemenuButton />
            <Link href="/" className=" lg:block hidden">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={200}
                height={50}
              />
            </Link>
          </div>
          <SearchBar />
          <UserButton />
        </div>
      </div>
    </AppBar>
  );
}
