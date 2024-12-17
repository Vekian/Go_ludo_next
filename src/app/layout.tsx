import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { farro, nunito } from "../fonts/fonts";
import MobileHeader from "@/components/Header/MobileHeader";

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
      <body className={`${nunito.variable} ${farro.variable}`}>
        <Header />
        <MobileHeader />
        {children}
      </body>
    </html>
  );
}
