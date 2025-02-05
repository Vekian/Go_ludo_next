import React from "react";
import Carousel from "@/components/carousel/Carousel";
import { ImageInterface } from "@/interfaces";
import Form from "./Form";
function MainContent() {
  const imgs: ImageInterface[] = [
    {
      id: 2,
      filepath: "/images/banniere/banniere.webp",
    },
    {
      id: 3,
      filepath: "/images/banniere/banniere2.jpg",
    },
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
