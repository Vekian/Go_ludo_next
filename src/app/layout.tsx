import type { Metadata } from "next";
import Header from "@/components/layout/header/Header";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { farro, nunito } from "../fonts/fonts";
import AuthProvider from "@/components/provider/AuthProvider";
import SnackbarProvider from "@/components/provider/SnackbarProvider";
import SidemenuProvider from "@/components/provider/SidemenuProvider";
import Sidemenu from "@/components/layout/sidemenu/Sidemenu";

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
      <body className={`${nunito.variable} ${farro.variable} bg-neutral-100  `}>
        <SnackbarProvider>
          <AuthProvider>
            <SidemenuProvider>
              <Header />

              <div className="pt-16 h-screen flex">
                <Sidemenu />
                <div className=" w-full">{children}</div>
              </div>
            </SidemenuProvider>
          </AuthProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
