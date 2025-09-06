"use client";
import FormInput from "@/components/formInput";
import Btn from "@/components/button";
import SuccessDialog from "@/components/sucessdialog";
import ErrorDialog from "@/components/errordialog";
import { useState } from "react";

export default function FormLogIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      email: formData.get("email"),
      pword: formData.get("pword"),
    };

    try {
      const response = await fetch("http://localhost:4200/users/LogIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.token;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("email", data.email as string);
        
        setLoading(false);
        setShowSuccessDialog(true);
        
        setTimeout(() => {
          setShowSuccessDialog(false);
          window.location.href = "/news";
        }, 2000);
      } else {
        setLoading(false);
        setErrorMessage("Email ou senha incorretos. Tente novamente.");
        setShowErrorDialog(true);
        setTimeout(() => setShowErrorDialog(false), 3000);
      }
    } catch (error) {
      setLoading(false);
      console.error("Erro ao realizar o login:", error);
      setErrorMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      setShowErrorDialog(true);
      setTimeout(() => setShowErrorDialog(false), 3000);
    }
  };

  return (
    <>
      <form
        className="not-visited:flex flex-col bg-white gap-4 w-150 
        max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-xl"
        onSubmit={HandleSubmit}
      >
        <FormInput name="email" label="Email" placeholder="Digite seu E-mail" />
        <FormInput name="pword" type="password" label="Senha" placeholder="Digite sua Senha" />
        <Btn type="submit" title={loading ? "Entrando..." : "Entrar"} />
      </form>

      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Login realizado!"
        message="Você será redirecionado em instantes."
      />

      <ErrorDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title="Erro no login!"
        message={errorMessage}
      />
    </>
  );
}