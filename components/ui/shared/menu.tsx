"use client";
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
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
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
import Logo from "@assets/logos/logo.svg";
import ProfileSheet from "@components/profile-config-sheet";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { logout } from "@client/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSearchSchema } from "@/models/schemas";
import { Form, FormField } from "../form";
import { getSuppliersByValueOfDatabase } from "@/services/client/supplier";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Panel de Control",
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
];

type TBreadcrumb = {
  label: string;
  href: string;
};

export default function NavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[]>([]);
  const [activePage, setActivePage] = useState("");
  const [formState, formAction] = useFormState(logout, undefined);
  const form = useForm<z.infer<typeof FormSearchSchema>>({
    resolver: zodResolver(FormSearchSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSearchSchema>) {
    console.log(activePage);
    if (activePage === "supplier") {
      const data = await getSuppliersByValueOfDatabase(values.search, 1);
      console.log(data);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log(e.target === document.querySelector('input[type="search"]'));
      if (
        e.key === "Enter" &&
        e.target === document.querySelector('input[type="search"]')
      ) {
        form.handleSubmit(onSubmit)();
      }
    });
  }, []);

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
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link href="/dashboard">
              <img
                className="transition-all group-hover:scale-110 rounded-lg"
                src={Logo.src}
                alt="FerreMYK"
                height={50}
                width={50}
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
            <DropdownMenuTrigger asChild>
              <Button className="px-2" variant="ghost">
                <SettingsIcon className="h-5 w-5 text-muted-foreground" />
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative ml-auto flex-1 md:grow-0"
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <>
                    <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                      placeholder="Buscar..."
                      type="search"
                    />
                  </>
                )}
              />
            </form>
          </Form>
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
              <DropdownMenuItem>Perfil</DropdownMenuItem>
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
        </header>
      </div>
    </div>
  );
}
