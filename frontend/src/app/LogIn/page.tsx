"use client";
import BackBtn from "@/components/backbtn";
import FormLogIn from "./_components/formLogIn";

export default function Login() {
  return (
    <div>
      <main className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-center p-6 text-3xl font-bold ">Entrar</h1>
        <hr className="w-30" />
        <div>
          <FormLogIn />
        </div>
        <BackBtn />
      </main>
    </div>
  );
}
