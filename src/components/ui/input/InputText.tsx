import React from "react";

export default function InputText({
  value,
  id,
  onChange,
}: {
  value: string;
  id: string;
  onChange?: (value: string | null) => void;
}) {
  return (
    <input
      type="text"
      name={id}
      id={id}
      className="bg-primary-50 rounded-full px-3 py-1"
      defaultValue={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
}
