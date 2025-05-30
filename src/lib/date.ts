import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.extend(relativeTime);
dayjs.locale("fr");

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Extraire les composants de la date
  const jour = date.getDate(); // Jour
  const mois = date.toLocaleString("fr-FR", { month: "long" }); // Mois en toutes lettres
  const annee = date.getFullYear(); // Année

  // Retourner la chaîne formatée
  return `${jour} ${mois} ${annee}`;
}

export function getDateFormated(createdAt: string, updatedAt: string) {
  const date = updatedAt;
  const updated = updatedAt === createdAt ? false : true;
  const formatedDate = getRelativeTime(date, !updated);
  return `${updated ? "Modifié" : ""} ${formatedDate}`;
}

export function getRelativeTime(date: string, uppercase: boolean = true) {
  const relativeTime = dayjs(date).fromNow();
  if (uppercase) {
    return relativeTime.charAt(0).toUpperCase() + relativeTime.slice(1);
  }
  return relativeTime;
}

export const formatGameDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes} min`
      : `${hours}h`;
  }
};

export function joinDateTime(date: string, time: string) {
  const [day, month, year] = date.split("/").map(Number);

  // Séparer l'heure et les minutes
  const [hours, minutes] = time.split(":").map(Number);

  // Créer un objet Date au format ISO
  const dateTime = new Date(year, month - 1, day, hours, minutes);
  return dateTime.toISOString();
}
