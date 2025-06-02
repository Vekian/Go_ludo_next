import React from "react";
import Form from "./Form";
import CarouselBanniere from "@/components/ui/carousel/CarouselBanniere";
function MainContent() {
  const imgs: string[] = [
    "/images/banniere/banniere.webp",
    "/images/banniere/banniere2.jpg",
  ];
  return (
    <div className="flex flex-wrap">
      <div className="xl:w-2/3 w-full px-1">
        <CarouselBanniere imgs={imgs} />
      </div>
      <Form />
    </div>
  );
}

export default MainContent;
