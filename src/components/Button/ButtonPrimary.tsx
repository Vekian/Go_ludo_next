import React from "react";
import styles from "./Button.module.scss";

function ButtonPrimary({ label, color }: { label: string; color: string }) {
  return (
    <button
      className={`${styles.button} ${
        color === "primary" ? styles.primary : styles.secondary
      }`}
    >
      {label}
    </button>
  );
}

export default ButtonPrimary;
