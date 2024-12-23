"use client";

import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loaders
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import Image from "next/image";

function Carousel(props) {
  return (
    <ReactCarousel
      autoPlay={true}
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      dynamicHeight={true}
      infiniteLoop
    >
      <div>
        <Image
          src="/images/banniere.webp"
          alt="banniere"
          fill
          className="rounded-lg"
        />
      </div>
      <div>
        <Image
          src="/images/banniere2.jpg"
          alt="banniere"
          width={1000}
          height={230}
          className="rounded-lg"
        />
      </div>
    </ReactCarousel>
  );
}

export default Carousel;
