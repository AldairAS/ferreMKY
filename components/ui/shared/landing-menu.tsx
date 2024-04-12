import React from "react";
import { Button } from "@components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { MenuIcon, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Empresa", href: "/empresa" },
  { name: "Features", href: "/features" },
  { name: "Desarrolladores", href: "/desarrolladores" },
  { name: "Contacto", href: "/contacto" },
];

export default function LandingMenu() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex  gap-2 tracking-tighter">
            <Image
              className="h-8 w-auto"
              src="https://avatars.githubusercontent.com/u/83354843?s=200&v=4"
              alt=""
              width={32}
              height={32}
            />
            <span className="text-3xl font-bold">MYK Corp.</span>
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
  );
}
