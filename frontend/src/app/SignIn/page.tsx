'use client'
import BackBtn from "@/components/backbtn";
import FormSignIn from "./_components/formSignIn";

export default function Register() {
  return (
    <div>
      <main className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-center p-6 text-3xl font-bold">Cadastrar</h1>
        <hr className="w-30" />
        <div>
          <FormSignIn />
        </div>
        <BackBtn />
      </main>
    </div>
  );
}
