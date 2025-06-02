import React, { forwardRef } from "react";

interface CustomTabProps {
  label: React.ReactNode;
  classChild: string;
  onClick: () => void;
}

const CustomTab = forwardRef<HTMLDivElement, CustomTabProps>(
  ({ label, classChild, onClick }, ref) => {
    return (
      <div
        ref={ref}
        className={`${classChild} w-full flex justify-center`}
        style={{ userSelect: "none" }}
        onClick={onClick}
      >
        {label}
      </div>
    );
  }
);

CustomTab.displayName = "CustomTab";

export default CustomTab;
