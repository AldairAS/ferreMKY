"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HomeIcon,
  LineChartIcon,
  LogOut,
  Package2Icon,
  PackageIcon,
  PanelLeftIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  Users2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FerreMYKLogo from "/public/icon.png";
import { useRouter } from "next/navigation";

export default function NavigationMenu() {
  const router = useRouter();

  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link href="/ferremyk">
              <Image
                className="transition-all group-hover:scale-110 rounded-lg"
                src={FerreMYKLogo}
                alt="FerreMYK"
                height={60}
                width={60}
              />
              <span className="sr-only">Ferre MYK</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href="#"
                >
                  <HomeIcon className="h-5 w-5" />
                  <span className="sr-only">Panel de Control</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Panel de Control</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href="/ferremyk/pedidos"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span className="sr-only">Pedidos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Pedidos</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href="/ferremyk/inventario"
                >
                  <PackageIcon className="h-5 w-5" />
                  <span className="sr-only">Inventario</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Inventario</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href="#"
                >
                  <Users2Icon className="h-5 w-5" />
                  <span className="sr-only">Clientes</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Clientes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href="#"
                >
                  <LineChartIcon className="h-5 w-5" />
                  <span className="sr-only">Estadísticas</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Estadísticas</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href="#"
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Configuración</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Configuración</TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                <Link
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  href="#"
                >
                  <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  <HomeIcon className="h-5 w-5" />
                  Panel de Control
                </Link>
                <Link
                  className="flex items-center gap-4 px-2.5 text-foreground"
                  href="#"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Pedidos
                </Link>
                <Link
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  href="/inventario"
                >
                  <PackageIcon className="h-5 w-5" />
                  Inventario
                </Link>
                <Link
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  <Users2Icon className="h-5 w-5" />
                  Clientes
                </Link>
                <Link
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  <LineChartIcon className="h-5 w-5" />
                  Configuración
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="home">Panel de Control</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Pedidos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pedidos Recientes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              placeholder="Buscar..."
              type="search"
            />
          </div>
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
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Soporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/");
                }}
                className="text-red-500 "
              >
                <LogOut className="h-4 w-4 mr-1" />
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
    </div>
  );
}
