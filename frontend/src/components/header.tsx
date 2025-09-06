"use client";
import Link from "next/link";
import Avatar from "./avatar";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  function menu() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <header
        className="px-5 sm:px-20 flex items-center 
      justify-between py-4 bg-white shadow fixed w-full top-0"
      >
        <Link href="/news">
          <div className="transition-all hover:border-b-2 hover:shadow-[0px_30px_20px_-20px_rgba(0,0,0,0.4)] hover:border-blue-500/40 hover:-translate-y-1 h bg-gradient-to-r  from-blue-500 to-purple-600 bg-clip-text text-transparent text-4xl font-bold antic-didone-regular">
            NewsApp
          </div>
        </Link>

        <nav className="sm:hidden md:flex gap-5 hidden ">
          <Link
            href="/news"
            className="group relative py-4 z-10 text-black/60 font-bold hover:text-white poppins-semibold px-2"
          >
            Notícias
            <div className="group-hover:top-1/2 -z-10 transition-all scale-50 group-hover:scale-100 opacity-0 ease group-hover:opacity-100 absolute w-full top-0 left-0 h-7 rounded-md bg-gradient-to-r from-blue-500/70 to-purple-600/70  -translate-y-1/2"></div>
          </Link>
          <Link
            href="/about"
            className="group relative py-4 z-10 text-black/60 font-bold hover:text-white poppins-semibold px-2"
          >
            Sobre
            <div className="group-hover:top-1/2 -z-10 transition-all scale-50 group-hover:scale-100 opacity-0 ease group-hover:opacity-100 absolute w-full top-0 left-0 h-7 rounded-md bg-gradient-to-r from-blue-500/70 to-purple-600/70  -translate-y-1/2"></div>
          </Link>
          <Link
            href="/SignIn"
            className="group relative py-4 z-10 text-black/60 font-bold hover:text-white poppins-semibold px-2"
          >
            Cadastrar
            <div className="group-hover:top-1/2 -z-10 transition-all scale-50 group-hover:scale-100 opacity-0 ease group-hover:opacity-100 absolute w-full top-0 left-0 h-7 rounded-md bg-gradient-to-r from-blue-500/70 to-purple-600/70  -translate-y-1/2"></div>
          </Link>
          <Link
            href="/add-news"
            className="group relative py-4 z-10 text-black/60 font-bold hover:text-white poppins-semibold px-2"
          >
            Publicar uma Notícia
            <div className="group-hover:top-1/2 -z-10 transition-all scale-50 group-hover:scale-100 opacity-0 ease group-hover:opacity-100 absolute w-full top-0 left-0 h-7 rounded-md bg-gradient-to-r from-blue-500/70 to-purple-600/70  -translate-y-1/2"></div>
          </Link>
        </nav>
        <div className="flex items-center space-x-4 gap-10">
          <Menu onClick={menu} className="cursor-pointer md:hidden" />
          <Avatar />
        </div>

        {/* Dropdown */}

        <div
          className={cn(
            `
              absolute
              bg-white
              transition-all
              left-0
              cursor-pointer
            `,
            isClicked
              ? "opacity-100 translate-y-full w-full bottom-0"
              : "opacity-100 top-[-2000px] "
          )}
        >
          <nav className="bg-white md:flex space-x-4 flex flex-col justify-center items-center gap-5   ">
            <Link
              onClick={menu}
              href="/news"
              className="text-black/60 transition p-5 cursor-pointer rounded font-bold w-full flex flex-row 
            justify-center h-full hover:bg-black/10"
            >
              Notícias
            </Link>
            <Link
              onClick={menu}
              href="/about"
              className="text-black/60 transition p-5 cursor-pointer rounded font-bold w-full flex flex-row 
            justify-center h-full hover:bg-black/10"
            >
              Sobre
            </Link>
            <Link
              onClick={menu}
              href="/SignIn"
              className="text-black/60 transition p-5 cursor-pointer rounded font-bold w-full flex flex-row 
            justify-center h-full hover:bg-black/10"
            >
              Cadastrar
            </Link>
            <Link
              onClick={menu}
              href="/add-news"
              className="text-black/60 transition p-5 cursor-pointer rounded font-bold w-full flex flex-row 
            justify-center h-full hover:bg-black/10"
            >
              Publicar uma Notícia
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
