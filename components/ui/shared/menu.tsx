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
import { useTheme } from "next-themes";
import {
  HomeIcon,
  LayoutDashboard,
  Moon,
  LineChartIcon,
  ListCollapse,
  LogOut,
  Package2Icon,
  PackageIcon,
  PanelLeftIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  Sun,
  Users2Icon,
  PcCase,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import FerreMYKLogo from "/public/icon.png";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Panel de Control",
    href: "/ferremyk",
  },
  {
    icon: ShoppingCartIcon,
    label: "Pedidos",
    href: "/ferremyk/pedidos",
  },
  {
    icon: PackageIcon,
    label: "Inventario",
    href: "/ferremyk/inventario",
  },
  {
    icon: Users2Icon,
    label: "Clientes",
    href: "/ferremyk/clientes",
  },
  {
    icon: LineChartIcon,
    label: "Estadísticas",
    href: "/ferremyk/estadisticas",
  },
];

export default function NavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link href="/ferremyk">
              <Image
                className="transition-all group-hover:scale-110 rounded-sm"
                src={FerreMYKLogo}
                alt="FerreMYK"
                height={60}
                width={60}
              />
              <span className="sr-only">Ferre MYK</span>
            </Link>
            {menuItems.map(({ icon: Icon, label, href }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      pathname === href
                        ? "bg-accent-foreground dark:hover:text-black dark:text-black text-white rounded-sm hover:text-white"
                        : ""
                    }`}
                    href={href}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2.5" asChild>
              <Button variant="ghost">
                <SettingsIcon className="h-5 w-5" />
                <span className="sr-only">Configuración</span>
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
              <DropdownMenuItem>
                <ListCollapse className="h-4 w-4 mr-1" />
                Collapsar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
