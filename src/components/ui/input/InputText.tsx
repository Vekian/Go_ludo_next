import React from "react";

export default function InputText({
  value,
  id,
  onChange,
  type = "text",
  required = false,
}: {
  value?: string;
  id: string;
  onChange?: (value: string | null) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      name={id}
      id={id}
      className="bg-primary-50 rounded-full px-3 py-1"
      defaultValue={value}
      required={required}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
}
