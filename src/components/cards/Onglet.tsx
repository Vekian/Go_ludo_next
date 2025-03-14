import React from "react";
import styles from "./Onglet.module.scss";
function Onglet({
  label,
  color,
  angle,
  active = false,
}: {
  label: string;
  color: string;
  angle: number;
  active?: boolean;
}) {
  return (
    <div
      className={`${
        styles.onglet
      } xl:p-5 p-3 text-white font-semibold rounded-t-lg min-w-36 ${
        angle === 1 ? "rotate-2" : "-rotate-2"
      } xl:hover:-translate-y-6 hover:-translate-y-5 ${
        active ? "xl:-translate-y-6 -translate-y-5" : "-translate-y-0"
      }  transition border-white border-4 h-24  z-10 -mb-8 text-center xl:ml-3 xl:mr-3`}
      style={{
        backgroundColor: color,
      }}
    >
      {label}
    </div>
  );
}

export default Onglet;
