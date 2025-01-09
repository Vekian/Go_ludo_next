import ButtonPrimary from "@/components/button/ButtonPrimary";
import ButtonSecondary from "@/components/button/ButtonSecondary";
import Review from "@/components/card/Review";
import Rating from "@/components/rating/Rating";
import React from "react";

function ReviewsList() {
  return (
    <div className="mt-4 pl-10 pr-10">
      <div className="flex items-center ">
        <div className="flex flex-1">
          <h3>5 avis</h3>
          <h3 className="ml-4">14 commentaires</h3>
        </div>
        <div className="flex flex-2 items-center">
          <ButtonPrimary label="Ajouter un avis" color="primary-500" />
          <div className="ml-20">
            <Rating />
          </div>
        </div>
      </div>
      <Review />
      <div className="flex justify-center p-5">
        <ButtonSecondary
          label="Voir plus de commentaires"
          color="primary-800"
        />
      </div>
    </div>
  );
}

export default ReviewsList;
