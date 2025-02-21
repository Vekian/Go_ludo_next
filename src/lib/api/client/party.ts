import { PartyCard } from "@/interfaces/party.interface";
import { handleAuth } from "../authServer";

export async function getParties(data: unknown) {
  const headers = await handleAuth();
  const response = await fetch("/api/party", {
    body: JSON.stringify(data),
    method: "POST",
    headers: headers,
  });
  if (response.ok) {
    const parties: PartyCard[] = await response.json();
    return parties;
  }
}
