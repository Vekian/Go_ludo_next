import type { Metadata } from "next";
import Header from "@/components/layout/header/Header";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { farro, nunito } from "../fonts/fonts";
import AuthProvider from "@/components/provider/AuthProvider";
import SnackbarProvider from "@/components/provider/SnackbarProvider";
import SidemenuProvider from "@/components/provider/SidemenuProvider";
import Sidemenu from "@/components/layout/sidemenu/Sidemenu";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { muiTheme } from "@/theme/muiTheme";
import { ThemeProvider } from "@mui/material";
import InstallPwaBanner from "@/components/ui/button/InstallPwaBanner";
import MobileNavigation from "@/components/layout/mobileNavigation/MobileNavigation";

export const metadata: Metadata = {
  title: "Go Ludo",
  description: "Ludothèque et rencontre de joueurs",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  appleWebApp: {
    title: "Go Ludo",
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${nunito.variable} ${farro.variable} bg-neutral-100  `}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={muiTheme}>
            <SnackbarProvider>
              <AuthProvider>
                <SidemenuProvider>
                  <Header />
                  <div className="pt-12 md:pt-16 h-screen lg:flex md:pb-0 pb-14">
                    <Sidemenu />
                    <div className=" w-full h-full overflow-y-auto">
                      {children}
                    </div>
                    <MobileNavigation />
                  </div>

                  <InstallPwaBanner />
                </SidemenuProvider>
              </AuthProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
