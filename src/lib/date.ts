import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.extend(relativeTime);
dayjs.locale("fr");

export function getDurationFromTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0"); // Formate en 2 chiffres
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const time = `${hours}h${minutes}`;

  return time;
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Extraire les composants de la date
  const jour = date.getDate(); // Jour
  const mois = date.toLocaleString("fr-FR", { month: "long" }); // Mois en toutes lettres
  const annee = date.getFullYear(); // Année

  // Retourner la chaîne formatée
  return `${jour} ${mois} ${annee}`;
}

export function getRelativeTime(date: string, uppercase: boolean = true) {
  const relativeTime = dayjs(date).fromNow();
  if (uppercase) {
    return relativeTime.charAt(0).toUpperCase() + relativeTime.slice(1);
  }
  return relativeTime;
}
