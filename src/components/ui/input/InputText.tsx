import React from "react";

export default function InputText({
  value,
  defaultValue,
  id,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  value?: string;
  defaultValue?: string;
  id: string;
  onChange?: (value: string | null) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      name={id}
      id={id}
      className="bg-primary-50 rounded-full px-3 py-1 placeholder-neutral-300"
      defaultValue={defaultValue}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
}
