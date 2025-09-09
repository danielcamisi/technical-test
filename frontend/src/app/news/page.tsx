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
      
      const response = await fetch("http://localhost:4200/news", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Endpoint não encontrado. Verifique se o servidor está rodando.");
        } else if (response.status === 500) {
          throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
        } else if (response.status >= 400) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        throw new Error("Erro ao buscar dados do servidor");
      }
      
      const jsonData: NewsItem[] = await response.json();
      
      if (!Array.isArray(jsonData)) {
        throw new Error("Formato de dados inválido recebido do servidor");
      }

      console.log("Notícias carregadas:", jsonData);
      setNews(jsonData);
      
    } catch (error: any) {
      console.error("Erro ao carregar as notícias:", error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError("Erro de conexão com o servidor. Verifique se o servidor está rodando na porta 4200.");
      } else if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        setError("Tempo limite excedido. Verifique sua conexão com a internet.");
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Erro desconhecido ao carregar as notícias. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-xl shadow-lg">
          <ClockLoader size={60} color="#3B82F6" />
          <div className="text-center">
            <p className="text-gray-700 text-lg font-medium mb-2">Carregando notícias...</p>
            <p className="text-gray-500 text-sm">Aguarde um momento</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ops! Algo deu errado</h3>
          <p className="text-red-600 text-base mb-6 leading-relaxed">{error}</p>
          
          <div className="space-y-3">
            <button 
              onClick={loadCards}
              className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Tentar novamente
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Recarregar página
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (news.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
            <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Nenhuma notícia encontrada</h3>
          <p className="text-gray-600 text-base mb-6">
            Não há notícias disponíveis no momento. Tente novamente mais tarde.
          </p>
          
          <button 
            onClick={loadCards}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Atualizar
          </button>
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
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fique por dentro das principais notícias e acontecimentos
          </p>
          
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            {news.length} {news.length === 1 ? 'notícia encontrada' : 'notícias encontradas'}
          </div>
        </div>

       
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {news.map((item, index) => (
            <div key={item._id} className="w-full max-w-sm">
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

        <div className="text-center mt-12">
          <button 
            onClick={loadCards}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar notícias
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;