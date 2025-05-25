import React from "react";
import FormPassword from "./FormPassword";

export default async function page({ params }: { params: { token: string } }) {
  const token = (await params).token;
  return (
    <div className="p-3">
      <div className="bg-white rounded-lg p-6 flex justify-center">
        <FormPassword token={token} />
      </div>
    </div>
  );
}
