"use client";
import { useEffect, useState } from "react";
import Cards from "./_components/cards";
import ClockLoader from "react-spinners/ClockLoader";

interface NewsItem {
  _id: string;
  img: string;
  title: string;
  desc: string;
}

const Home: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCards = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("http://localhost:4200/news");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      
      const jsonData: NewsItem[] = await response.json();
      console.log(jsonData);
      setNews(jsonData);
    } catch (error) {
      console.error("Erro ao carregar as notícias:", error);
      setError("Erro ao carregar as notícias. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);


  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <ClockLoader size={50} color="#3B82F6" />
          <p className="text-gray-600 text-lg">Carregando notícias...</p>
        </div>
      </main>
    );
  }


  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={loadCards}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }


  if (news.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Nenhuma notícia encontrada.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 bg-gray-50 py-8">
     
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
  
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Últimas Notícias
          </h1>
          <p className="text-gray-600 text-lg">
            Fique por dentro das principais notícias
          </p>
        </div>

        <div className="grid gap-18 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {news.map((item) => (
            <div key={item._id} className="w-full">
              <Cards
                img={item.img}
                alt={item.title}
                title={item.title}
                desc={item.desc}
                _id={item._id}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;