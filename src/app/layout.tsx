import type { Metadata } from "next";
import Header from "@/components/header/Header";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { farro, nunito } from "../fonts/fonts";

export const metadata: Metadata = {
  title: "Go Ludo",
  description: "Ludothèque et rencontre de joueurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${nunito.variable} ${farro.variable} bg-neutral-50  min-h-screen`}
      >
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
