import { getParty } from "@/lib/api/api";
import React from "react";

export default async function page({ params }: { params: { id: number } }) {
  const id = (await params).id;
  const party = await getParty(id);

  return <div>{id}</div>;
}
