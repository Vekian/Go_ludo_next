"use client";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { theme } from "@/theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faDice,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function SideMenu() {
  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "16px",
    },
    bmBurgerBars: {
      background: theme.colors.primary[800],
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: theme.colors.black,
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: theme.colors.white,
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: theme.colors.black,
      padding: "0.8em",
    },
    bmItem: {
      display: "block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <>
      <Menu styles={styles} width={350}>
        <h4 className="font-medium text-2xl mb-2">
          <FontAwesomeIcon icon={faDice} className="mr-3" />
          Collection
        </h4>
        <Link href={""}>Tous les jeux</Link>
        <Link href={""}>Recherche avancée</Link>
        <Link href={""}>Voir votre collection</Link>
        <Link href={""}>Ajouter un jeu à votre collection</Link>

        <div className="border-t-2 mt-5 mb-5"></div>
        <h4 className="font-medium text-2xl mb-2">
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Parties
        </h4>
        <Link href={""}>Trouver une partie</Link>
        <Link href={""}>Vos parties en cours</Link>
        <Link href={""}>Parties terminées</Link>
        <div className="border-t-2 mt-5 mb-5"></div>
        <h4 className="font-medium text-2xl mb-2">
          <FontAwesomeIcon icon={faCircleQuestion} className="mr-3" />
          Assistance
        </h4>
        <Link href={""}>Aide</Link>
        <Link href={""}>Contactez-nous</Link>
        <Link href={""}>Mentions légales</Link>
      </Menu>
    </>
  );
}

export default SideMenu;
