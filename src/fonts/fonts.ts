import { Nunito, Farro } from "next/font/google";

export const nunito = Nunito({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-nunito"
});

export const farro = Farro({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-farro"
})