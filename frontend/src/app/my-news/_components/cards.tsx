import DeleleteButton from "@/components/dellbtn";
import EditButton from "@/components/editbtn";
import Image from "next/image";
import React from "react";

interface CardsProps {
  img: string;
  alt: string;
  title: string;
  desc: string;
  _id: string;
}

const Cards: React.FC<CardsProps> = ({ title, img, alt, desc, _id }) => {
  return (
    <main
      className="
    w-full flex justify-center 
    shadow-xl shadow-black/40
    rounded-xl
    "
    >
      <div
        id="card"
        className="bg-white rounded-xl text-center flex flex-row justify-center items-center gap-3 w-full grow "
      >
        <div className="h-full flex flex-col justify-center border-r-1 border-r-black">
          {" "}
          <p className="underline font-bold grow-0">Imagem:</p>
          <Image
            className="rounded-xl w-40 h-40 object-cover  "
            src={img}
            alt={alt}
            width={200}
            height={200}
            objectFit="cover"
          />
        </div>

        <div className="h-full flex flex-col justify-center border-r-1 border-r-black">
          <p className="underline font-bold grow-0">Título da Notícia</p>
          <h1
            id="title"
            className="text-bold w-40 pr-3 grow flex justify-center items-center"
          >
            {title}
          </h1>
        </div>

        <div className="h-full flex flex-col justify-center border-r-1 border-r-black">
          <p className="underline font-bold grow-0">Descrição da Notícia</p>
          <p id="desc" className="w-100 grow flex justify-center items-center">
            {desc}
          </p>
        </div>
        <div className="flex flex-col gap-5 pr-5">
          <EditButton newsId={_id} />
          <DeleleteButton newsId={_id} />
        </div>
      </div>
    </main>
  );
};

export default Cards;
