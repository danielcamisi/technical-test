import { useEffect, useState } from "react";

interface DeleteButtonProps {
  newsId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ newsId }) => {
  const [hToken, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  const handleDelete = async () => {
    if (!hToken) {
      console.error("Token não disponível.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4200/news/${newsId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${hToken}`,
        },
      });

      if (response.ok) {
        console.log("Notícia deletada com sucesso");
      } else {
        const errorData = await response.json();
        console.error("Erro ao deletar a notícia:", errorData.message);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  if (!hToken) {
    return (
      <button
        disabled
        className="transition-all hover:-translate-y-1 w-full hover:text-white hover:bg-red-600/80 p-2 
        hover:border-2 hover:border-transparent border-2 border-red-500 text-red-500 font-bold cursor-pointer 
        rounded-xl hover:shadow-lg hover:shadow-red-500/60"
      >
        Deletar Notícia
      </button>
    );
  }

  return (
    <button
      className="transition-all hover:-translate-y-1 hover:text-white w-full hover:bg-red-600/80 p-2 
      hover:border-2 hover:border-transparent border-2 border-red-500 text-red-500 font-bold cursor-pointer 
      rounded-xl hover:shadow-lg hover:shadow-red-500/60"
      onClick={handleDelete}
    >
      Deletar
    </button>
  );
};

export default DeleteButton;
