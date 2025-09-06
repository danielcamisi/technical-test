import { useEffect, useState } from "react";
import Link from "next/link";

interface EditButtonProps {
  newsId: string;
}

const EditButton: React.FC<EditButtonProps> = ({ newsId }) => {
  const [hToken, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  if (!hToken) {
    return (
      <button
        disabled
        className="transition-all w-full hover:-translate-y-1 hover:text-white hover:bg-red-600/80 
        p-2 hover:border-2 hover:border-transparent border-2 border-red-500 text-red-500 font-bold 
        cursor-pointer rounded-xl hover:shadow-lg hover:shadow-red-500/60"
      >
        Editar Notícia
      </button>
    );
  }

  return (
    <Link href={`/my-news/editNews/${newsId}`}>
      <button
        className="transition-all hover:-translate-y-1 w-full hover:text-white hover:bg-orange-600/80 p-2
      hover:border-2 hover:border-transparent border-2 border-orange-500 text-orange-500 font-bold cursor-pointer
       rounded-xl hover:shadow-lg hover:shadow-red-500/60"
      >
        Editar Notícia
      </button>
    </Link>
  );
};

export default EditButton;
