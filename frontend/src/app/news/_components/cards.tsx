import { Fullscreen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardsProps {
  img: string;
  alt: string;
  title: string;
  desc: string;
  _id: string;
}

const Cards: React.FC<CardsProps> = ({ title, img, alt, desc, _id }) => {
  const limitText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <main
      className="
    w-full flex justify-center 
   sm:flex-col-1
    rounded-xl
    "
    >
      <div
        id="card"
        className="bg-white rounded-xl text-center flex flex-col h-120 max-h-120 items-center gap-3 pb-5 w-400 max-w-400 border border-black/20 shadow-xl shadow-black/20 justify-between"
      >
        <div className="flex flex-col items-center gap-3 flex-1">
          <Image
            className="rounded-tl-xl rounded-tr-xl w-full h-50 object-cover"
            src={img}
            alt={alt}
            width={400}
            height={1}
          />

          <h1 id="title" className="text-bold text-xl text-black px-3">
            {title}
          </h1>

          <p id="desc" className="w-100 px-3 flex-1">
            {limitText(desc,110)}
          </p>
        </div>

        <div className="w-30 px-3 flex flex-row justify-center">
          <Link href={`/news/${_id}`}>
            <div className="pb-[2px] transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-[0px_25px_20px_-20px] hover:shadow-black hover:-translate-y-1">
              <button className="bg-white px-5 w-30 h-full text-blue-500 py-1 cursor-pointer poppins-thin">
                Ver Mais
              </button>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cards;
