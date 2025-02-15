import CustomLinearProgress from "@/components/ui/loader/CustomLoader";
import React from "react";

export default function loading() {
  return (
    <div className="pt-12 px-6">
      <CustomLinearProgress />
    </div>
  );
}
