"use client";

import { Switch } from "@/components/ui/switch"
import { logout } from "@/services/client/auth";
import Logo from "@assets/logos/logo.svg";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import ProfileSheet from "@/components/profile-config-sheet";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import {
  Container,
  LayoutDashboard,
  LineChartIcon,
  ListCollapse,
  LogOut,
  Moon,
  PackageIcon,
  PanelLeftIcon,
  PcCase,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  Sun,
  Users2Icon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@assets/logos/logo_f.png";
import ProfileSheet from "@/components/profile-config-sheet";
import { useContext, useEffect, useState } from "react";

import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import { FormSearchSchema } from "@/models/schemas";
import { Form, FormField } from "../form";
// import { SupplierContext } from "@/context/SupplierContext";
import useQueryParams from "@components/hooks/useQuery";
import useModal from "@/components/hooks/useModal";
import ModalSearch from "./ModalSearch";
import Modal from "../modal";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/dashboard",
  },
  {
    icon: ShoppingCartIcon,
    label: "Pedidos",
    href: "/dashboard/orders",
  },
  {
    icon: PackageIcon,
    label: "Inventario",
    href: "/dashboard/inventory",
  },
  {
    icon: Users2Icon,
    label: "Clientes",
    href: "/dashboard/clients",
  },
  {
    icon: LineChartIcon,
    label: "Estadísticas",
    href: "/dashboard/statistics",
  },
  {
    icon: Container,
    label: "Proveedores",
    href: "/dashboard/supplier",
  },
];

type TBreadcrumb = {
  label: string;
  href: string;
};

export default function NavigationMenu() {
  const router = useRouter();
  const { form } = useQueryParams();
  const pathname = usePathname();
  const [collapse, setCollapse] = useState(false);
  //const { setTheme } = useTheme();
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[]>([]);
  const [activePage, setActivePage] = useState("");
  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const [isModalSearchOpen, openModalSearch, closeModalSearch] =
    useModal(false);
  // const { suppliers, readSuppliers } = useContext(SupplierContext);
  const [formState, formAction] = useFormState(logout, undefined);


  const { theme, setTheme } = useTheme();

  // Función para cambiar el tema a "light"
  const handleLightTheme = () => {
      setTheme("light");
  };

  // Función para cambiar el tema a "dark"
  const handleDarkTheme = () => {
      setTheme("dark");

  const search = form.watch("search");
  // console.log(search);
  const handleSearchInputFocus = () => {
    const otherInput = document.querySelector(
      "#searchModal"
    ) as HTMLInputElement;
    // console.log(!otherInput);
    if (otherInput) {
      setTimeout(() => {
        otherInput.focus();
      }, 200);
    }

  };

  useEffect(() => {
    if (router) {
      const linkPath = pathname
        .split("/")
        .filter((path) => path !== "/dashboard")
        .slice(1);

      const pathArray = linkPath.map((path, index) => {
        return {
          label: path.charAt(0).toUpperCase() + path.slice(1),
          href: `/${linkPath.slice(0, index + 1).join("/")}`,
        };
      });

      setBreadcrumbs(pathArray);
      setActivePage(linkPath.pop() || "/dashboard");
    }
  }, [router, pathname]);

  return (
    <div>

      <aside
        className={`fixed inset-y-0 duration-300 left-0 z-10 hidden flex-col border-r bg-card sm:flex  ${
          collapse ? "w-44 z-50" : "w-14"
        }`}
      >
        <nav
          className="
          flex flex-col items-center gap-4 px-2 sm:py-5
          "
        >
          <TooltipProvider>
            <Link
              className={`
              ${collapse ? "md:w-36 pl-2" : "w-14 pl-3"}

              `}
              href="/dashboard"
            >
              <img
                className="transition-all group-hover:scale-110 rounded-lg dark:invert"
                src={Logo.src}
                alt="FerreMYK"
                height={30}
                width={30}
              />
              <span className="sr-only">Ferre MYK</span>
            </Link>
            {menuItems.map(({ icon: Icon, label, href }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 ${
                      collapse
                        ? "md:w-36 pl-2 justify-start"
                        : "w-9 justify-center"
                    } items-center  rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-9  ${
                      pathname === href
                        ? "bg-accent-foreground dark:hover:text-black dark:text-black text-white rounded-sm hover:text-white"
                        : ""
                    }`}
                    href={href}
                  >

                    <div className="flex gap-2 items-center justify-start">
                      <Icon className="h-5 w-5" />
                      {collapse && <span>{label}</span>}
                      <span className="sr-only">{label}</span>
                    </div>

                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {/* <DropdownMenu>

            <DropdownMenuTrigger asChild>
              <Button
                className={`
                ${collapse ? "md:w-36 ml-0 pl-2" : " px-2"}`}
                variant="ghost"
              >
                <div className={`flex gap-2 ${collapse ? "pl-2" : "pl-0"}`}>
                  <SettingsIcon className="h-5 w-5 text-muted-foreground" />
                  {collapse && <span className="">Configuración</span>}
                  <span className="sr-only">Configuración</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-5" align="center">
              <DropdownMenuLabel>Preferencias</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="h-4 w-4 mr-1" />
                Modo Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="h-4 w-4 mr-1" />
                Modo Oscuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <PcCase className="h-4 w-4 mr-1" />
                Modo del Sistema
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setCollapse(!collapse);
                }}
              >
                <ListCollapse className="h-4 w-4 mr-1" />
                Collapsar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="sm:hidden" size="icon" variant="outline">
                <PanelLeftIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xs" side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <div className="flex items-end gap-2">
                  <Image
                    className=" w-auto rounded-sm"
                    src="https://avatars.githubusercontent.com/u/83354843?s=200&v=4"
                    alt="logo"
                    width={32}
                    height={32}
                  />
                  <span className="font-bold text-2xl mt-2">MYK Ferre</span>
                </div>
                <hr className="mb-4 mt-1 dark:border-gray-800 border-gray-200" />

                {menuItems.map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    className={`flex gap-2  items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground  ${
                      pathname === href
                        ? " dark:hover:text-white font-bold dark:text-white text-black rounded-sm hover:text-black"
                        : ""
                    }`}
                    href={href}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                ))}
              </nav>
              <hr className="my-10 dark:border-gray-800 border-gray-200" />
              <nav className="mt-auto flex   gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex gap-2  items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                    asChild
                  >
                    <Button variant="ghost" className="p-0 mt-10 text-lg">
                      <SettingsIcon className="h-5 w-5" />
                      <span>Configuración</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="ml-5 w-56" align="center">
                    <DropdownMenuLabel>Preferencias</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem>
                      <ListCollapse className="h-4 w-4 mr-1" />
                      Collapsar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {breadcrumbs.map(
                (breadcrumb, i) =>
                  i !== breadcrumbs.length - 1 && (
                    <BreadcrumbItem key={i}>
                      <BreadcrumbLink asChild>
                        <Link
                          href={breadcrumb.href}
                          onClick={() => setActivePage(breadcrumb.label)}
                        >
                          {breadcrumb.label}
                        </Link>
                      </BreadcrumbLink>
                      {i < breadcrumbs.length - 2 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                  )
              )}
              {breadcrumbs.length > 1 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {activePage}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              onClick={openModalSearch}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] focus:outline-transparent focus:border-transparent focus:outline-none"
              placeholder="Buscar..."
              onFocus={handleSearchInputFocus}
              type="search"
              readOnly
            />
            <Modal
              title="Reciente"
              isOpen={isModalSearchOpen}
              handleClose={closeModalSearch}
            >
              <ModalSearch closeModalSearch={closeModalSearch} />
            </Modal>
          </div>
          <Switch  onClick={() => theme === "light" ? handleDarkTheme() : handleLightTheme()} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="overflow-hidden rounded-full"
                size="icon"
                variant="outline"
              >
                <Image
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                  height={36}
                  src="https://mighty.tools/mockmind-api/content/human/41.jpg"
                  style={{
                    aspectRatio: "36/36",
                    objectFit: "cover",
                  }}
                  width={36}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setShowProfileSheet(true);
                }}
              >
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>Soporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  formAction();
                }}
                className="text-red-500 "
              >
                <LogOut className="h-4 w-4 mr-1" />
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ProfileSheet
            open={showProfileSheet}
            onOpenChange={setShowProfileSheet}
          />
        </header>
      </div>
    </div>
  );
}
