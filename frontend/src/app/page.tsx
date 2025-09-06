"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    router.push("/news");
  }, [router]);

  return <h1>Redirecionando para News...</h1>;
}
