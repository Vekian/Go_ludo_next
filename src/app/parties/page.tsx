import React from "react";
import FormLocalisation from "./FormLocalisation";

export default function page() {
  return (
    <main>
      <div className="flex gap-x-10 p-10">
        <FormLocalisation />
        <div className="flex-1"></div>
      </div>
    </main>
  );
}
