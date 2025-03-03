import React from "react";

export default function InputText({
  value,
  id,
}: {
  value: string;
  id: string;
}) {
  return (
    <input
      type="text"
      name={id}
      id={id}
      className="bg-primary-50 rounded-full px-3 py-1"
      defaultValue={value}
    />
  );
}
