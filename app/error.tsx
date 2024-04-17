"use client";
import NotFound from "@assets/images/not-found.avif";
import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main className="flex justify-between items-center  place-items-center bg-white sm:px-6 lg:pl-8 lg:px-0  sm:py-32 lg:py-0 ">
      <div className="text-center">
        <p className="text-2xl font-semibold text-indigo-600 rotate-12 shadow-md">
          404
        </p>
        <p className="text-2xl font-semibold text-indigo-600 my-10 -rotate-12 shadow-md">
          <code>ERROR</code>
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Sucedió un error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Lo Sentimos no pudimos encontrar la página que buscas.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => router.back()}>Volver atrás</Button>
          <Link href="#" className="text-sm font-semibold text-gray-900">
            Contactar a Soporte <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
      <img className="h-ful w-1/2" src="" alt="Not Found" />
    </main>
  );
}
