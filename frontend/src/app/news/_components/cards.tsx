import { Fullscreen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface CardsProps {
  img: string;
  alt: string;
  title: string;
  desc: string;
  _id: string;
}

const Cards: React.FC<CardsProps> = ({ title, img, alt, desc, _id }) => {
  const [imageError, setImageError] = useState(false);

  const limitText = (text: string, maxLength: number = 110) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white rounded-xl text-center flex flex-col items-center gap-3 pb-5 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 w-80 h-96">
        
    
        <div className="w-full h-48 relative overflow-hidden rounded-t-xl bg-gray-100">
          {!imageError ? (
            <Image
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              src={img}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              priority={false}
            />
          ) : (
          
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-gray-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          )}
        </div>

      
        <div className="flex flex-col items-center gap-3 flex-1 px-4 justify-between">
          
    
          <h1 className="font-bold text-lg text-gray-900 leading-tight h-14 flex items-center text-center line-clamp-2">
            {title}
          </h1>

         
          <p className="text-gray-600 text-sm leading-relaxed flex-1 flex items-start h-16 overflow-hidden">
            {limitText(desc, 110)}
          </p>

    
          <div className="w-full flex justify-center mt-auto">
            <Link href={`/news/${_id}`} className="group">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-[2px] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1">
                <button className="bg-white px-6 py-2 text-blue-600 font-medium rounded-md transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white w-28">
                  Ver Mais
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>


      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Cards;