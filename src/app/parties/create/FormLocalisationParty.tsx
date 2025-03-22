"use client";
import React, { useState } from "react";

import dynamic from "next/dynamic";
import SelectCity from "./SelectCity";

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

export default function FormLocalisationParty({
  errors,
}: {
  errors: Record<string, string[]> | null;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  return (
    <div className="bg-white rounded-lg px-36 py-6 w-full flex flex-col gap-y-6">
      <h3>Choisis un lieu de rencontre </h3>

      <SelectCity setPosition={setPosition} />
      {errors?.city && <p className="text-red-500">{errors.city[0]}</p>}
      <DynamicMap position={position} />
    </div>
  );
}
