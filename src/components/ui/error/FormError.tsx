import React from "react";

export default function FormError({
  errors,
  name,
}: {
  errors: string[];
  name: string;
}) {
  return (
    <div>
      {errors.map((error: string, index: number) => (
        <p key={`${index}${name}`} className="text-red-500 ">
          {error}
        </p>
      ))}
    </div>
  );
}
