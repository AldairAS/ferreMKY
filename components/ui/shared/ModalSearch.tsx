// Crea una búsqueda que se active con el ctrl + k y muestre las rutas y sus explicaciones
import React, { use, useEffect, useState } from "react";
import {
  LayoutDashboard,
  LineChartIcon,
  PackageIcon,
  SearchIcon,
  ShoppingCartIcon,
  PersonStandingIcon,
  Users2Icon,
} from "lucide-react";
import { Input } from "../input";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Panel de Control",
    href: "/dashboard",
    description: "Vista general de la tienda",
  },
  {
    icon: ShoppingCartIcon,
    label: "Pedidos",
    href: "/dashboard/orders",
    description: "Historial de pedidos",
  },
  {
    icon: PackageIcon,
    label: "Inventario",
    href: "/dashboard/inventory",
    description: "Gestión de productos",
  },
  {
    icon: PersonStandingIcon,
    label: "Proveedores",
    href: "/dashboard/suppliers",
    description: "Gestión de proveedores",
  },
  {
    icon: Users2Icon,
    label: "Clientes",
    href: "/dashboard/clients",
    description: "Gestión de clientes",
  },
  {
    icon: LineChartIcon,
    label: "Estadísticas",
    href: "/dashboard/statistics",
    description: "Información de ventas",
  },
];

const ModalSearch = ({
  closeModalSearch,
}: {
  closeModalSearch: () => void;
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState(menuItems);

  const handleSearch = () => {
    // Crea una búsqueda a las rutas y sus explicaciones
    const results = menuItems.filter((item) =>
      item.label.toLowerCase().includes(searchText.toLowerCase())
    );
    setResults(results);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key === "k") {
      handleSearch();
    }
    if (event.key === "Escape") {
      closeModalSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className="bg-white dark:bg-black outline-neutral-800">
      <div className="relative ml-auto flex-1 md:grow-0 mb-4">
        <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground black text-nuetral-900 dark:text-neutral-100" />
        <Input
          className="w-full rounded-lg bg-background pl-8 border-neutral-900 dark:border-neutral-100 placeholder-neutral-900 dark:placeholder-neutral-100"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar en la app..."
          id="searchModal"
        />
      </div>
      <ul className="border-t-2 dark:border-white ">
        {results.map((item) => (
          <li
            onClick={() => {
              router.push(item.href);
              closeModalSearch();
            }}
            key={item.label}
            className="border-b-2 p-2 flex items-center justify-between cursor-pointer hover:bg-primary dark:hover:bg-white dark:hover:text-black dark:border-primary dark:border-opacity-50 transition-colors duration-200 ease-in-out
           text-black dark:text-white hover:text-white hover:dark:text-black"
          >
            <div className="pl-2">
              <span className="font-semibold">{item.label}</span>
              <p className="font-normal">{item.description}</p>
            </div>
            <div className="pr-2">
              {item.icon ? <item.icon className="h-6 w-6 " /> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalSearch;
