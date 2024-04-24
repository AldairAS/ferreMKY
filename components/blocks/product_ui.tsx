"use client";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
  Dispatch,
  JSX,
  SVGProps,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useModal from "../hooks/useModal";
import { Input } from "@components/ui/input";
import { Product } from "@/models/types";
import Link from "next/link";
import {
  getAllProductByRange,
  getAllProductOutOfStockByRange,
  getAllProductStockByRange,
  getCountProduct,
  getCountProductOutOfStock,
  getCountProductStock,
} from "@/services/server/product";
import { SearchIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { generatePagination, showToast } from "@/libs/utils";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../ui/modal";
import { deleteProductClient } from "@/services/client/product";
import { TypeToast } from "@/models/enums";
import {
  ROWS_PER_PAGE,
  STATES_PRODUCT,
  WAIT_BETWEEN_CHANCE,
} from "@/models/constants";
import clsx from "clsx";

export default function ProductView() {
  const [products, setProducts] = useState<Product[] | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [rows, setRows] = useState<number>(10);
  const [state, setState] = useState<string>(STATES_PRODUCT[0]);

  const [loading, setLoading] = useState(true);

  const pagination = generatePagination(currentPage, totalPages);

  const getProducts = async () => {
    setLoading(true);
    let data: Product[] = [];
    if (state == STATES_PRODUCT[0]) {
      data = await getAllProductByRange(currentPage, query, rows);
    }
    if (state == STATES_PRODUCT[1]) {
      data = await getAllProductStockByRange(currentPage, query, rows);
    }
    if (state == STATES_PRODUCT[2]) {
      data = await getAllProductOutOfStockByRange(currentPage, query, rows);
    }
    // console.log(data);
    setProducts(data);
    setLoading(false);
  };

  const getTotalPage = async () => {
    let total: number = 0;

    if (state == STATES_PRODUCT[0]) {
      total = await getCountProduct(query);
    }
    if (state == STATES_PRODUCT[1]) {
      total = await getCountProductStock(query);
    }
    if (state == STATES_PRODUCT[2]) {
      total = await getCountProductOutOfStock(query);
    }

    setTotalProducts(total);
    setTotalPages(Math.ceil(total / rows));
  };

  useEffect(() => {
    getProducts();
    getTotalPage();
  }, [currentPage, rows, query, state]);

  const refreshData = () => {
    getProducts();
    getTotalPage();
  };

  const handleQuery = useDebouncedCallback((e: any) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  }, WAIT_BETWEEN_CHANCE);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs value={state}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value={state} className="sm:hidden flex">
              {state == STATES_PRODUCT[0] && "Todos"}
              {state == STATES_PRODUCT[1] && "En stock"}
              {state == STATES_PRODUCT[2] && "Agotado"}
            </TabsTrigger>
            <TabsTrigger
              value={STATES_PRODUCT[0]}
              onClick={() => {
                setState(STATES_PRODUCT[0]);
                setCurrentPage(1);
              }}
              className="hidden sm:flex"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger
              value={STATES_PRODUCT[1]}
              onClick={() => {
                setState(STATES_PRODUCT[1]);
                setCurrentPage(1);
              }}
              className="hidden sm:flex"
            >
              En stock
            </TabsTrigger>
            <TabsTrigger
              value={STATES_PRODUCT[2]}
              onClick={() => {
                setState(STATES_PRODUCT[2]);
                setCurrentPage(1);
              }}
              className="hidden sm:flex"
            >
              Agotado
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] max-w-[336px]"
                placeholder="Buscar..."
                type="search"
                onChange={handleQuery}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 gap-1" size="sm" variant="outline">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filas
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Total de Filas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {ROWS_PER_PAGE.map((v, i) => (
                  <DropdownMenuCheckboxItem
                    key={i}
                    checked={v == rows}
                    onClick={() => {
                      setRows(v);
                      setCurrentPage(1);
                    }}
                  >
                    {v}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 gap-1" size="sm" variant="outline">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filtrar
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={state == STATES_PRODUCT[0]}
                  onClick={() => {
                    setState(STATES_PRODUCT[0]);
                    setCurrentPage(1);
                  }}
                >
                  Todos
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={state == STATES_PRODUCT[1]}
                  onClick={() => {
                    setState(STATES_PRODUCT[1]);
                    setCurrentPage(1);
                  }}
                >
                  En stock
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={state == STATES_PRODUCT[2]}
                  onClick={() => {
                    setState(STATES_PRODUCT[2]);
                    setCurrentPage(1);
                  }}
                >
                  Agotado
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="h-8 gap-1" size="sm" variant="outline">
              <FileIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button>
            <Link href={"/dashboard/product/add"}>
              <Button className="h-8 gap-1" size="sm">
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar Producto
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value={STATES_PRODUCT[0]}>
          <ProductCardTable
            currentPage={currentPage}
            loading={loading}
            products={products}
            rows={rows}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
            pagination={pagination}
            refreshData={refreshData}
          />
        </TabsContent>
        <TabsContent value={STATES_PRODUCT[1]}>
          <ProductCardTable
            currentPage={currentPage}
            loading={loading}
            products={products}
            rows={rows}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
            pagination={pagination}
            refreshData={refreshData}
          />
        </TabsContent>
        <TabsContent value={STATES_PRODUCT[2]}>
          <ProductCardTable
            currentPage={currentPage}
            loading={loading}
            products={products}
            rows={rows}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
            pagination={pagination}
            refreshData={refreshData}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function ProductCardTable({
  loading,
  products,
  rows,
  currentPage,
  totalPages,
  totalProducts,
  setCurrentPage,
  pagination,
  refreshData,
}: {
  loading: boolean;
  products: Product[] | null;
  rows: number;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pagination: any[];
  refreshData: () => void;
}) {
  const [productSelect, setProductSelect] = useState<Product | undefined>(
    undefined
  );
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const deleteProduct = async () => {
    // console.log(productSelect?.id)

    if (!productSelect) {
      closeModal();
      return;
    }

    const res = await deleteProductClient(productSelect);

    closeModal();

    if (res?.message) showToast("Error", res.message, TypeToast.ERROR);

    if (res?.success) {
      showToast(
        "Producto eliminado",
        `Producto ${productSelect.code} eliminado`,
        TypeToast.SUCCESS
      );
      refreshData();
    }
  };

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>
          Administra tus productos y visualiza su desempeño de ventas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=""></TableHead>
              <TableHead>Código</TableHead>
              <TableHead className="hidden lg:table-cell">
                Descripción
              </TableHead>
              <TableHead className="hidden md:table-cell">Unidad</TableHead>
              <TableHead className="hidden md:table-cell">Cantidad</TableHead>
              <TableHead className="hidden md:table-cell">Precio</TableHead>
              <TableHead className="hidden lg:table-cell">Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Estado</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading &&
              products?.map((product, idx) => (
                <TableRow key={idx}>
                  <TableCell className="">
                    <img
                      src={product.url_image}
                      alt={product.code}
                      className="aspect-square rounded-md object-cover max-w-[64px] max-h-[64px]"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.code}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {product.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.unit}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.price_sale}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {product.name_kind}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <p
                      className={clsx("font-semibold",
                        { "text-green-500": product.quantity > 0 },
                        { "text-red-500": product.quantity == 0 }
                      )}
                    >
                      {product.quantity > 0 ? "En stock" : "Agotado"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Colapsar Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="p-0">
                          <Link
                            href={`/dashboard/product/detail?id=${product.id}`}
                            className="w-full h-full px-2 py-1.5"
                          >
                            Detalles
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                          <Link
                            href={`/dashboard/product/edit?id=${product.id}`}
                            className="w-full h-full px-2 py-1.5"
                          >
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setProductSelect(product);
                            openModal();
                          }}
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {loading ? (
          <div className="text-xs text-center font-semibold my-5">
            Cargando Datos ...
          </div>
        ) : (
          (!products || products?.length == 0) && (
            <div className="text-xs text-center font-semibold my-5">
              No results
            </div>
          )
        )}
        <Modal
          isOpen={isOpenModal}
          handleClose={closeModal}
          title={`Eliminar Producto "${productSelect?.code}"`}
        >
          <div className="font-medium">
            Esta acción no se puede deshacer. Esto eliminará el producto y sus
            vinculaciones con el proveedor.
          </div>
          <div className="flex justify-around mt-8">
            <Button type="button" onClick={deleteProduct} variant="destructive">
              Eliminar Producto
            </Button>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
          </div>
        </Modal>
      </CardContent>
      <CardFooter className="block">
        <div className="text-xs text-muted-foreground">
          Mostrando
          <strong>
            {" "}
            {rows * (currentPage - 1) + 1}-
            {products && products?.length < rows
              ? rows * (currentPage - 1) + products?.length
              : rows * currentPage}
          </strong>{" "}
          de <strong>{totalProducts} </strong>
          productos
        </div>
        <Pagination>
          <PaginationContent className="flex-wrap border">
            {totalPages > 1 && currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              </PaginationItem>
            )}
            {pagination.map((v, i) => (
              <PaginationItem key={i}>
                {v != "..." ? (
                  <PaginationLink
                    isActive={currentPage == v}
                    onClick={() => setCurrentPage(Number(v))}
                  >
                    {v}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            ))}
            {totalPages > 1 && currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

function ListFilterIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function PlusCircleIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

function MoreHorizontalIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
