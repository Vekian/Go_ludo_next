import React from "react";
import Carousel from "@/components/ui/carousel/Carousel";
import Form from "./Form";
function MainContent() {
  const imgs: string[] = [
    "/images/banniere/banniere.webp",
    "/images/banniere/banniere2.jpg",
  ];
  return (
    <div className="flex">
      <div className="w-2/3">
        <Carousel imgs={imgs} height={300} width={1000} />
      </div>
      <Form />
    </div>
  );
}

export default MainContent;
