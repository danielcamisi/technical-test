"use client";
import BackBtn from "@/components/backbtn";
import SuccessDialog from "@/components/sucessdialog";
import ErrorDialog from "@/components/errordialog";
import { useEffect, useState } from "react";
import { use } from "react";

interface NewsItem {
  img: string;
  title: string;
  desc: string;
  details: string;
  createAt: string;
}

export default function NewsDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsById = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:4200/news/${id}`, {
          cache: "no-store",
        });
        
        if (res.ok) {
          const data = await res.json();
          setNewsItem(data);
          setShowSuccessDialog(true);
          setTimeout(() => setShowSuccessDialog(false), 2000);
        } else {
          console.error("Erro ao buscar detalhes da notícia");
          setShowErrorDialog(true);
          setTimeout(() => setShowErrorDialog(false), 3000);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        setShowErrorDialog(true);
        setTimeout(() => setShowErrorDialog(false), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsById();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Notícia não encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            A notícia que você está procurando não existe ou foi removida.
          </p>
          <BackBtn />
        </div>
        
        <ErrorDialog
          isOpen={showErrorDialog}
          onClose={() => setShowErrorDialog(false)}
          title="Erro ao carregar!"
          message="Não foi possível carregar os detalhes da notícia."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-slate-50 to-indigo-50">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {newsItem.img && (
            <div className="w-full h-64 md:h-80 overflow-hidden">
              <img
                src={newsItem.img}
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {newsItem.title}
              </h1>

              <div className="flex items-center text-sm text-gray-500 mb-6">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Publicado em:{" "}
                {new Date(newsItem.createAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {newsItem.desc}
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Detalhes
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {newsItem.details}
              </p>
            </div>
          </div>
        </div>
        <BackBtn />
      </main>

      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Carregado com sucesso!"
        message="Detalhes da notícia carregados."
      />

      <ErrorDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title="Erro ao carregar!"
        message="Não foi possível carregar os detalhes da notícia."
      />
    </div>
  );
}