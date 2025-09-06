"use client";
import { useEffect, useState } from "react";
import Cards from "./_components/cards";
import BackBtn from "@/components/backbtn";

interface NewsItem {
  _id: string;
  img: string;
  title: string;
  desc: string;
  authorEmail: string;
}

const MyNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    setUserEmail(email);
    loadCards(email);
  }, []);

  const loadCards = async (email: string | null) => {
    if (!email) return;

    try {
      const response = await fetch("http://localhost:4200/news");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      const jsonData: NewsItem[] = await response.json();

      const userNews = jsonData.filter((item) => item.authorEmail === email);
      setNews(userNews);
    } catch (error) {
      console.error("Erro ao carregar as notícias:", error);
    }
  };

  return (
    <main className="p-15 pt-40 h-screen flex flex-col justify-center items-center gap-10">
      <div className="grid grid-cols-1 gap-25 ">
        {news.length > 0 ? (
          news.map((item) => (
            <Cards
              key={item._id}
              img={item.img}
              alt={item.title}
              title={item.title}
              desc={item.desc}
              _id={item._id}
            />
          ))
        ) : (
          <p>Nenhuma notícia encontrada.</p>
        )}
      </div>
      <BackBtn />
    </main>
  );
};

export default MyNews;
