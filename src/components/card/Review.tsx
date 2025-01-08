import Image from "next/image";
import React from "react";
import Rating from "../rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

function Review() {
  return (
    <div className="bg-white rounded-lg pt-5 pb-5 pl-10 pr-10">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image alt="avatar" src="/images/avatar.png" width={50} height={50} />
          <div className="ml-8">
            <h3>Vekian</h3>
            <h5>Il y a 6 semaines</h5>
          </div>
          <div className="ml-20">
            <Rating value={3.5} />
          </div>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFlag} fontSize={26} />
        </div>
      </div>
      <p className="mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nemo
        aliquam quidem minima aspernatur, dolorem, adipisci at voluptas commodi
        quisquam, sint maxime dolorum nam quod cumque inventore doloribus? Rem
        facere unde ex harum sapiente numquam labore illo fuga dolores
        perspiciatis officia ea, ipsa voluptatem aspernatur exercitationem
        porro. Consequatur aut quod qui similique rerum eos ullam voluptas ipsa
        illum? Voluptatem enim nemo ab eveniet in earum laudantium aliquam amet
        deleniti tempora magnam repellat nihil autem debitis dolores sunt,
        adipisci nostrum vitae aut? Rerum, libero quo nulla eveniet pariatur
        nesciunt fuga non consequuntur ipsa inventore velit voluptas dolore
        voluptatibus recusandae obcaecati omnis excepturi delectus optio et
        officia. Eveniet, cupiditate inventore, obcaecati voluptates, officia
        doloremque cumque totam commodi dolorem minima eaque esse. Tempore animi
        mollitia numquam, nisi quibusdam assumenda. Perferendis maiores delectus
        nisi earum excepturi sapiente dignissimos fuga tenetur? Nobis sint,
        nihil voluptates autem dolor similique incidunt vero perspiciatis
        reiciendis, ad culpa a.
      </p>
    </div>
  );
}

export default Review;
