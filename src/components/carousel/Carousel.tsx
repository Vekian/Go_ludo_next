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
  imgs: [];
  width: number;
  height: number;
  thumbs?: boolean;
  autoPlay?: boolean;
}) {
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
                  src={img.src}
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                ></Image>
              </div>
            )
        )
      }
    >
      {imgs.map((img) => (
        <div key={img.id} className="flex justify-center">
          <div
            style={{
              position: "relative",
              height: `${height}px`,
              width: `${width}px`,
            }}
          >
            <Image
              alt="Mountains"
              src={img.src}
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
