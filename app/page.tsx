"use client";
import { Button } from "@components/ui/button";
import FeaturesHero from "@assets/images/features-hero-dark.png";
import FeaturesHeroLight from "@assets/images/features-hero-light.png";
import GradientHeroDark from "@assets/images/gradient-hero-dark.png";
import GradientHero from "@assets/images/gradient-hero.png";
import logo from "@assets/logos/logo.svg";
import { Moon, MoveRight, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Kalam, Oswald } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const oswald = Oswald({
  subsets: ["latin-ext"],
  weight: ["700"],
  style: ["normal"],
});

const kalam = Kalam({
  subsets: ["latin-ext"],
  weight: ["700"],
  style: ["normal"],
});

export default function Page() {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");

  const background = currentTheme === "dark" ? GradientHeroDark : GradientHero;

  const handleTheme = () => {
    if (currentTheme === "light") {
      setTheme("dark");
      setCurrentTheme("dark");
    } else {
      setTheme("light");
      setCurrentTheme("light");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-white dark:bg-transparent"
    >
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <Link href="#" className=" gap-2 flex items-center">
            <img src={logo.src} alt="Ferre" className="h-8 w-8 dark:invert" />
            <span
              className={` ${oswald.className} font-bold tracking-tighter text-3xl`}
            >
              Synergy.
            </span>
          </Link>
          <button
            onClick={handleTheme}
            className="active:rotate-90 duration-500"
          >
            {currentTheme === "dark" ? (
              <Moon className="h-6 w-6" />
            ) : (
              <Sun className="h-6 w-6" />
            )}
          </button>
        </nav>
      </header>

      <div className="relative isolate h-screen justify-center flex lg:gap-20 lg:flex-row flex-col items-center  lg:pl-8">
        <div className="max-w-2xl pt-36 lg:pt-0 px-4 ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-blue-600 dark:text-blue-300 ring-1 dark:ring-blue-300 ring-blue-500 ">
              Anuncio exitoso del release 1.0 🚀
              <Link
                href="#"
                className="font-semibold text-blue-500 hover:opacity-80"
              >
                <span className="absolute inset-0" aria-hidden="true" /> Demo{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
              Software para la gestión de tu{" "}
              <span className={`${kalam.className} uppercase`}>negocio</span>
            </h1>
            <p className="mt-6 leading-6 text-gray-600 dark:text-gray-300">
              El sistema te permite gestionar tus ventas, compras, inventario,
              clientes y proveedores de manera eficiente y sencilla.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/sign-in">
                <Button>Iniciar Sesión</Button>
              </Link>
              <Link href="/dashboard" className="group">
                <Button variant="ghost">
                  Ver Demo
                  <MoveRight className="h-5 w-5 ml-2 inline-block group-hover:translate-x-1 duration-300 ease-in-out" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <img
          src={
            currentTheme === "dark" ? FeaturesHero.src : FeaturesHeroLight.src
          }
          alt="Features Hero"
          className=" rounded-lg pt-10 lg:pt-0 px-6 lg:px-0 shadow-sm sm:rounded-xl sm:shadow-2xl dark:shadow-white/20 dark:rounded-xl "
          width={700}
          height={700}
        />
      </div>
    </div>
  );
}
