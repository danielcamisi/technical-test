"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import BackBtn from "@/components/backbtn";
import SuccessDialog from "@/components/sucessdialog";
import ErrorDialog from "@/components/errordialog";

const AddNews = () => {
  const router = useRouter();
  const [newsData, setNewsData] = useState({
    title: "",
    desc: "",
    details: "",
    authorEmail: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewsData({
      ...newsData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in newsData) {
      formData.append(key, newsData[key as keyof typeof newsData]);
    }
    if (file) {
      formData.append("img", file);
    }

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:4200/news/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        setLoading(false);
        setShowSuccessDialog(true);
        
    
        setTimeout(() => {
          setShowSuccessDialog(false);
          router.push("/my-news");
        }, 2000);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setErrorMessage(errorData.msg || "Erro ao criar a notícia");
        setShowErrorDialog(true);
        setTimeout(() => setShowErrorDialog(false), 3000);
      }
    } catch (error) {
      console.error("Erro:", error);
      setLoading(false);
      setErrorMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      setShowErrorDialog(true);
      setTimeout(() => setShowErrorDialog(false), 3000);
    }
  };

  return (
    <div className="flex flex-col justify-center pt-15 items-center h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center antic-didone-regular">
        Criar uma Nova Notícia
      </h1>
      <div className="p-6 max-w-lg w-400 mx-auto shadow-[3px_13px_16px_9px_rgba(0,_0,_0,_0.1)] rounded-lg bg-white">
        <form onSubmit={handlePublish}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              name="title"
              placeholder="Digite o título da notícia"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={newsData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Resumo</label>
            <textarea
              name="desc"
              placeholder="Forneça um resumo breve da notícia"
              className="w-full border max-h-40 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              value={newsData.desc}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Corpo</label>
            <textarea
              name="details"
              placeholder="Escreva a notícia completa aqui"
              className="w-full border max-h-40 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              value={newsData.details}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Imagem de Capa
            </label>
            <div 
              className={`relative flex flex-col border-2 border-dashed rounded-md p-6 text-center justify-center items-center cursor-pointer transition-all min-h-32 ${
                isDragging 
                  ? 'border-blue-400 bg-blue-50' 
                  : file 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onClick={() => document.getElementById('file-input')?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
          
              <input 
                id="file-input"
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
            
              <Upload 
                className={`mb-2 ${
                  isDragging ? 'text-blue-500' : file ? 'text-green-500' : 'text-gray-500'
                }`} 
                size={48} 
              />
              
              <div className="space-y-1">
                <p className={`text-sm font-medium ${
                  isDragging ? 'text-blue-600' : file ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {isDragging 
                    ? 'Solte a imagem aqui' 
                    : file 
                      ? 'Imagem selecionada!' 
                      : 'Clique ou arraste uma imagem'
                  }
                </p>
                
                <p className="text-xs text-gray-500">
                  {file ? file.name : 'PNG, JPG, GIF até 10MB'}
                </p>
              </div>
              
        
              {file && (
                <div className="mt-3 flex flex-col items-center gap-2 text-xs text-green-600">
                  <span>IMPORTANTE! Somente os seguintes formatos de arquivos: .PNG .JPG .JPEG</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Arquivo pronto para upload
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              E-mail do Autor
            </label>
            <input
              type="email"
              name="authorEmail"
              placeholder="Digite o seu E-mail"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={newsData.authorEmail}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex space-x-2 w-auto justify-center items-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-indigo-400 to-cyan-400 min-w-full font-bold text-white transition-all 
              duration-[0.3s] py-2 px-4 rounded-md hover:from-indigo-500 hover:to-cyan-500 cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {loading ? "Publicando..." : "Publicar Notícia"}
            </button>
          </div>
        </form>
      </div>
      
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Notícia publicada!"
        message="Sua notícia foi criada com sucesso. Redirecionando..."
      />

      <ErrorDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title="Erro ao publicar!"
        message={errorMessage}
      />
      
      <BackBtn />
    </div>
  );
};

export default AddNews;