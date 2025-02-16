"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loaders
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import Image from "next/image";

function Carousel({
  imgs,
  width,
  height,
  thumbs = false,
  autoPlay = true,
}: {
  imgs: string[];
  width: number;
  height: number;
  thumbs?: boolean;
  autoPlay?: boolean;
}) {
  const url = process.env.NEXT_PUBLIC_API_SYMFONY_URL;
  return (
    <ReactCarousel
      autoPlay={autoPlay}
      showArrows={false}
      showStatus={false}
      showThumbs={thumbs}
      dynamicHeight={true}
      swipeable={true}
      infiniteLoop
      className="text-center"
      renderThumbs={() =>
        imgs.map(
          (img, idx) =>
            thumbs && (
              <div key={idx} className="w-full h-20 relative">
                <Image
                  src={`${url}${img}`}
                  layout="fill"
                  objectFit="contain"
                  alt="carousel"
                ></Image>
              </div>
            )
        )
      }
    >
      {imgs.map((img, index) => (
        <div key={`img${index}`} className="flex justify-center">
          <div
            style={{
              position: "relative",
              height: `${height}px`,
              width: `${width}px`,
            }}
          >
            <Image
              alt="Carousel"
              src={`${url}${img}`}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "10px",
                textAlign: "center", // cover, contain, none
              }}
            />
          </div>
        </div>
      ))}
    </ReactCarousel>
  );
}

export default Carousel;
