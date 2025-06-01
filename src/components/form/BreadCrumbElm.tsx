"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import ButtonPrimary from "../ui/button/ButtonPrimary";
import { theme } from "@/theme/theme";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "@/lib/game";
import { Game } from "@/interfaces";

export default function BreadCrumbElm({
  step,
  game,
  label,
  first = false,
  active,
}: {
  step: number;
  game: Game;
  label: string;
  first?: boolean;
  active: boolean;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const setStep = (step: number) => {
    router.push(`/${getBaseUrl(game)}edit/${game.id}/${step}`);
  };

  useEffect(() => {
    if (active && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active]);

  return (
    <div ref={ref} className="flex gap-x-2 items-center">
      {!first && <FontAwesomeIcon icon={faChevronRight} />}
      <ButtonPrimary
        label={label}
        color={active ? theme.colors.primary[500] : theme.colors.primary[900]}
        onClick={() => setStep(step)}
      />
    </div>
  );
}
