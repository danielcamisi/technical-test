"use client";
import React, { useState } from "react";
import FormInput from "@/components/formInput";
import Btn from "@/components/button";
import SuccessDialog from "@/components/sucessdialog";
import ErrorDialog from "@/components/errordialog";
import Link from "next/link";

export default function FormSignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      nUser: formData.get("nUser"),
      email: formData.get("email"),
      pword: formData.get("pword"),
      confirmPword: formData.get("confirmPword"),
    };


    if (data.pword !== data.confirmPword) {
      setLoading(false);
      setErrorMessage("As senhas não coincidem. Verifique e tente novamente.");
      setShowErrorDialog(true);
      setTimeout(() => setShowErrorDialog(false), 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:4200/users/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Usuário cadastrado com Sucesso:", result);

        setLoading(false);
        setShowSuccessDialog(true);

        setTimeout(() => {
          setShowSuccessDialog(false);
          window.location.href = "/LogIn";
        }, 2000);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setErrorMessage(
          errorData.msg || "Erro ao cadastrar usuário. Tente novamente."
        );
        setShowErrorDialog(true);
        setTimeout(() => setShowErrorDialog(false), 3000);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      setErrorMessage(
        "Erro ao conectar ao servidor. Tente novamente mais tarde."
      );
      setShowErrorDialog(true);
      setTimeout(() => setShowErrorDialog(false), 3000);
    }
  };

  return (
    <>
      <form
        className="not-visited:flex flex-col bg-white gap-4 w-150 max-w-md mx-auto mt-10 p-6 shadow-xl shadow-black/40 rounded-xl"
        onSubmit={HandleSubmit}
      >
        <FormInput
          name="nUser"
          label="Nome de usuário"
          placeholder="Digite seu Nome"
        />
        <FormInput name="email" label="Email" placeholder="Digite seu E-mail" />
        <FormInput name="pword" label="Senha" placeholder="Digite sua Senha" />
        <FormInput
          name="confirmPword"
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
        />
        <Btn type="submit" title={loading ? "Cadastrando..." : "Cadastrar"} />
        <Link href="/LogIn">
          <p className="transition-all text-gray-400 hover:text-indigo-500">
            Já possuo uma conta
          </p>
        </Link>
      </form>

      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Cadastro realizado!"
        message="Usuário cadastrado com sucesso. Redirecionando para o login..."
      />

      <ErrorDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title="Erro no cadastro!"
        message={errorMessage}
      />
    </>
  );
}
