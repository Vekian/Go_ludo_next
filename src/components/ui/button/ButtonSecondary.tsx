import React from "react";

function ButtonSecondary({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`hover:opacity-75 bg-white text-neutral-950 rounded-md font-semibold  px-3 py-1 m-2.5`}
      style={{ border: `2px solid ${color}` }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ButtonSecondary;
