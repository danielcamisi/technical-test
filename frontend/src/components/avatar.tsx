import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function avatar() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    setToken(storedToken);
  }, []);

  const [isClicked, setIsClicked] = useState<boolean>(false);
  function profile() {
    setIsClicked(!isClicked);
  }
  function Logout() {
    console.log("saiu");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    setToken(null);
  }
  if (!token) {
    return (
      <div
        onClick={profile}
        className="group relative w-10 h-10 rounded-full cursor-pointer bg-gray-300 flex items-center justify-center"
      >
        <span className="fixed text-gray-700 font-semibold ">
          <User className="cursor-pointer" />
        </span>
        <div
          className={cn(
            `
              cursor-pointer
              gap-3
              flex
              flex-col
              absolute
              bg-white
              transition-all
              left-0
              h-fit
              rounded
              justify-center
              items-center
              mr-15 
           `,
            isClicked
              ? "opacity-100 translate-y-full w-[150px] left-[-50px] bottom-0 "
              : "opacity-100 top-[-2000px]"
          )}
        >
          <Link
            href="/LogIn"
            className="transition py-4 cursor-pointer rounded font-bold w-full flex flex-row 
            justify-center h-full hover:bg-black/10"
          >
            Entrar
          </Link>
          <div className="bg-black/30 h-px w-3/4 block mx-10 "></div>
          <Link
            href="/SignIn"
            className="transition py-4 cursor-pointer rounded font-bold w-full flex flex-row 
            justify-center h-full hover:bg-black/10"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={profile}
        className="group relative w-10 h-10 rounded-full bg-cyan-100/50 flex items-center justify-center border-2 border-indigo-400"
      >
        <span className="fixed text-indigo-400 font-semibold ">
          <User />
        </span>
        <div
          className={cn(
            `
              group-hover:translate-y-full transition-all duration-150 
              flex flex-col absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32
              h-fit bg-white opacity-0 group-hover:opacity-100 justify-center items-center 
              rounded shadow-sm gap-1
            `,
            isClicked ? "translate-y-full opacity-100" : ""
          )}
        >
          <Link
            href="/my-news"
            className="transition py-4 cursor-pointer rounded font-bold w-full flex flex-row 
            justify-center h-full hover:bg-black/10"
          >
            Minhas Notícias
          </Link>
          <div className="bg-black/30 h-px w-3/4 block mx-10 "></div>
          <button
            onClick={Logout}
            className="transition flex flex-row justify-center gap-2 cursor-pointer w-full py-4 rounded 
            text-red-500 hover:bg-red-200 font-bold"
          >
            Sair <LogOut />
          </button>
        </div>
      </div>
    );
  }
}
