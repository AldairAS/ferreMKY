import React from "react";
import { Button } from "@components/ui/button";
import LandingMenu from "@components/ui/shared/landing-menu";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { MenuIcon, MoveRight } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Empresa", href: "/empresa" },
  { name: "Features", href: "/features" },
  { name: "Desarrolladores", href: "/desarrolladores" },
  { name: "Contacto", href: "/contacto" },
];

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FerreMYK",
  description: "Sistema semi ERP para control de gestion de tiendas",
  icons: [
    {
      rel: "icon",
      url: "https://avatars.githubusercontent.com/u/83354843?s=200&v=4",
    },
  ],
};
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 flex  gap-2 tracking-tighter"
            >
              <Image
                className="h-8 w-auto"
                src="https://avatars.githubusercontent.com/u/83354843?s=200&v=4"
                alt=""
                width={32}
                height={32}
              />
              <span className="text-3xl font-bold text-gray-900">
                MYK Corp.
              </span>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="sm:hidden" size="icon" variant="ghost">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Abrir Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xs" side="left">
              <div className="flex items-end gap-2">
                <Image
                  className=" w-auto rounded-lg"
                  src="https://avatars.githubusercontent.com/u/83354843?s=200&v=4"
                  alt="logo"
                  width={32}
                  height={32}
                />
                <span className="font-bold text-2xl mt-2">MYK Corp</span>
              </div>
              <hr className="mb-6 mt-3 border-gray-200" />
              <nav className="grid gap-6 text-lg font-medium mt-10">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-5">
                <Link
                  href="/login"
                  className=" flex text-lg rounded-lg px-3 py-2.5  font-semibold gap-2 items-center bg-gradient-to-tr from-black to-slate-700 text-white"
                >
                  Iniciar sesión
                  <MoveRight />
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/login">
              <Button>
                Inicia Sesión
                <MoveRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <LandingMenu />
        <div className="mx-auto  py-32 sm:py-48 lg:py-36">{children}</div>
      </div>
    </div>
  );
}
