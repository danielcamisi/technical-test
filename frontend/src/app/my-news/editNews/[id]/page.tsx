"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BackBtn from "@/components/backbtn";
import SuccessDialog from "@/components/sucessdialog";
import ErrorDialog from "@/components/errordialog";

const EditNews = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [newsData, setNewsData] = useState({
    title: "",
    img: "",
    desc: "",
    details: "",
    createAt: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:4200/news/${id}`);
          if (response.ok) {
            const data = await response.json();
            setNewsData({
              ...data,
              createAt: new Date().toISOString(),
            });
          } else {
            console.error("Erro ao buscar notícia");
            setShowErrorDialog(true);
            setTimeout(() => setShowErrorDialog(false), 3000);
          }
        } catch (error) {
          console.error("Erro:", error);
          setShowErrorDialog(true);
          setTimeout(() => setShowErrorDialog(false), 3000);
        }
      }
    };
    fetchNews();
  }, [id]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setNewsData({
      ...newsData,
      [e.target.name]: e.target.value,
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

  const handleSubmit = async () => {
    const formData = new FormData();
    const token = sessionStorage.getItem("token");

    for (const key in newsData) {
      formData.append(key, newsData[key as keyof typeof newsData]);
    }

    if (file) {
      formData.append("img", file);
    }

    try {
      const response = await fetch(`http://localhost:4200/news/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setShowSuccessDialog(true);

        setTimeout(() => {
          setShowSuccessDialog(false);
          router.push("/my-news");
        }, 2000);
      } else {
        setIsDialogOpen(false);
        setShowErrorDialog(true);
        setTimeout(() => setShowErrorDialog(false), 3000);
      }
    } catch (error) {
      console.error("Erro:", error);
      setIsDialogOpen(false);
      setShowErrorDialog(true);
      setTimeout(() => setShowErrorDialog(false), 3000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen pt-20">
      <h1 className="text-2xl font-bold mb-4 text-center antic-didone-regular">
        Editar Notícia
      </h1>
      <div className="p-6 max-w-lg mx-auto w-400 shadow-[3px_13px_16px_9px_rgba(0,_0,_0,_0.1)] rounded-lg bg-white">
        <form>
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
            <label className="block text-sm font-medium mb-1">Descrição</label>
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
            <label className="block text-sm font-medium mb-1">Detalhes</label>
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

            {newsData.img && !file && (
              <div className="mb-3 p-2 border border-gray-200 rounded-md bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Imagem atual:</p>
                <img
                  src={newsData.img}
                  alt="Preview atual"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            )}

            <div
              className={`relative flex flex-col border-2 border-dashed rounded-md p-6 text-center justify-center items-center cursor-pointer transition-all min-h-32 ${
                isDragging
                  ? "border-blue-400 bg-blue-50"
                  : file
                  ? "border-green-400 bg-green-50"
                  : newsData.img
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
              onClick={() =>
                document.getElementById("file-input-edit")?.click()
              }
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                id="file-input-edit"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <Upload
                className={`mb-2 ${
                  isDragging
                    ? "text-blue-500"
                    : file
                    ? "text-green-500"
                    : newsData.img
                    ? "text-orange-500"
                    : "text-gray-500"
                }`}
                size={48}
              />

              <div className="space-y-1">
                <p
                  className={`text-sm font-medium ${
                    isDragging
                      ? "text-blue-600"
                      : file
                      ? "text-green-600"
                      : newsData.img
                      ? "text-orange-600"
                      : "text-gray-600"
                  }`}
                >
                  {isDragging
                    ? "Solte a nova imagem aqui"
                    : file
                    ? "Nova imagem selecionada!"
                    : newsData.img
                    ? "Clique para alterar a imagem"
                    : "Clique ou arraste uma imagem"}
                </p>

                <p className="text-xs text-gray-500">
                  {file
                    ? file.name
                    : newsData.img
                    ? "PNG, JPG, GIF até 10MB (substituir atual)"
                    : "PNG, JPG, GIF até 10MB"}
                </p>
              </div>

              {file && (
                <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Nova imagem pronta para upload
                </div>
              )}

              {newsData.img && !file && (
                <div className="mt-3 flex items-center gap-2 text-xs text-orange-600">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Imagem atual será mantida
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2 w-auto justify-center items-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="bg-gradient-to-r from-indigo-400 to-cyan-400 min-w-full font-bold text-white transition-all duration-[0.3s] py-2 px-4 rounded-md hover:from-indigo-500 hover:to-cyan-500 cursor-pointer transform hover:scale-105 active:scale-95"
                >
                  Salvar Alterações
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-xl">
                <DialogHeader>
                  <DialogTitle>Confirmar alterações</DialogTitle>
                  <DialogDescription>
                    {file
                      ? "Você está prestes a salvar as alterações e substituir a imagem atual. Esta ação não pode ser desfeita."
                      : "Todas as alterações feitas serão salvas permanentemente."}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <button
                    onClick={handleSubmit}
                    className="transition-all bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 transform hover:scale-105"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="transition-all bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transform hover:scale-105"
                  >
                    Cancelar
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>

        <SuccessDialog
          isOpen={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
          title="Alterações salvas!"
          message="Suas alterações foram salvas com sucesso."
        />

        <ErrorDialog
          isOpen={showErrorDialog}
          onClose={() => setShowErrorDialog(false)}
          title="Erro ao salvar!"
          message="Não foi possível salvar as alterações. Tente novamente."
        />
      </div>
      <BackBtn />
    </div>
  );
};

export default EditNews;
