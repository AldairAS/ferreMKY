"use client";
import { Supplier } from "@/models/types";
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
import { BookDashed, Newspaper, NotebookTabs } from "lucide-react";
import { EmptyPlaceholder } from "../ui/shared/empty-placeholder";
import { JSX, SVGProps, useEffect, useState } from "react";
import { AddSupplierForm, EditSupplierForm } from "./supplier-forms";
import useModal from "../hooks/useModal";
// import { getAllSuppliers } from "@client/supplier";
// import { SupplierContext } from "@/context/SupplierContext";
import useQueryParams from "../hooks/useQuery";
import { generatePagination, showToast } from "@/libs";
import { getAllSuppliersByRange, getCountSupplier } from "@server/supplier";
import { useDebouncedCallback } from "use-debounce";
import { ROWS_PER_PAGE, WAIT_BETWEEN_CHANCE } from "@models/constants";
import { deleteSupplierClient } from "@client/supplier";
import { TypeToast } from "@models/enums";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import Modal from "../ui/modal";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

export default function SupplierView() {
  // const [n, setN] = useState(0);
  // const { n, deleteSupplier, readSuppliers, suppliers } =
  //   useContext(SupplierContext);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState(10);

  const [supplier, setSupplier] = useState<Supplier | undefined>(undefined);
  const [isOpenAddModal, openAddModal, closeAddModal] = useModal(false);
  const [isOpenEditModal, openEditModal, closeEditModal] = useModal(false);
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] =
    useModal(false);
  const [loading, setLoading] = useState(true);
  // const { page } = useQueryParams();

  const pagination = generatePagination(totalPages, currentPage);

  const getSuppliers = async () => {
    setLoading(true);
    const data = await getAllSuppliersByRange(currentPage, query, rows);
    // console.log(data);
    setSuppliers(data);
    setLoading(false);
  };

  const getTotalPage = async () => {
    const total = await getCountSupplier(query);
    setTotalSuppliers(total);
    setTotalPages(Math.ceil(total / rows));
  };

  const deleteSupplier = async () => {
    if (!supplier) {
      closeDeleteModal();
      return;
    }
    const res = await deleteSupplierClient(supplier);

    closeDeleteModal();

    if (res?.message) showToast("Error", res.message, TypeToast.ERROR);

    if (res?.success) {
      showToast("Éxito", "Proveedor eliminado", TypeToast.SUCCESS);
      getSuppliers();
      getTotalPage();
    }
  };

  useEffect(() => {
    // console.log(query);
    getSuppliers();
    getTotalPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, query, rows]);

  const handleQuery = useDebouncedCallback((e: any) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  }, WAIT_BETWEEN_CHANCE);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="contracted">Contratados</TabsTrigger>
            <TabsTrigger value="processing">En Proceso</TabsTrigger>
            <TabsTrigger className="hidden sm:flex" value="news">
              Nuevos
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
            {/* <DropdownMenu> */}
            {/* <DropdownMenuTrigger asChild>
                <Button className="h-8 gap-1" size="sm" variant="outline">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filtrar
                  </span>
                </Button>
              </DropdownMenuTrigger> */}
            {/* <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Activo
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Borrador</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archivado</DropdownMenuCheckboxItem>
              </DropdownMenuContent> */}
            {/* </DropdownMenu> */}
            <Button className="h-8 gap-1" size="sm" variant="outline">
              <FileIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button>
            <Button className="h-8 gap-1" size="sm" onClick={openAddModal}>
              <PlusCircleIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar Proveedor
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Proveedores</CardTitle>
              <CardDescription>
                Administra tus productos y visualiza su desempeño de ventas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Contacto
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Acciones</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {supplier.name}
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        {supplier.description}
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        {supplier.contact}
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
                            <DropdownMenuItem
                              onClick={() => {
                                setSupplier(() => supplier);
                                openEditModal();
                              }}
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSupplier(() => supplier);
                                openDeleteModal();
                              }}
                              className="text-red-500"
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
              {supplier ? (
                <EditSupplierForm
                  supplier={supplier}
                  setSuppliers={setSuppliers}
                  isOpenModal={isOpenEditModal}
                  closeModal={closeEditModal}
                />
              ) : (
                ""
              )}
              <AddSupplierForm
                setSuppliers={setSuppliers}
                isOpenModal={isOpenAddModal}
                closeModal={closeAddModal}
              />
              <Modal
                isOpen={isOpenDeleteModal}
                handleClose={closeDeleteModal}
                title={`Eliminar Proveedor "${supplier?.id}"`}
              >
                <div className="font-medium">
                  Esta acción no se puede deshacer. Esto eliminará el proveedor
                  y sus vinculaciones con los productos asociado.
                </div>
                <div className="flex justify-around mt-8">
                  <Button
                    type="button"
                    onClick={deleteSupplier}
                    variant="destructive"
                  >
                    Eliminar Proveedor
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeDeleteModal}
                  >
                    Cancelar
                  </Button>
                </div>
              </Modal>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Mostrando
                <strong>
                  {" "}
                  {rows * (currentPage - 1) + 1}-
                  {suppliers && suppliers?.length < rows
                    ? rows * (currentPage - 1) + suppliers?.length
                    : rows * currentPage}
                </strong>{" "}
                de <strong>{totalSuppliers} </strong>
                proveedores
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
        </TabsContent>
        <TabsContent value="contracted">
          <EmptyPlaceholder
            icon={<NotebookTabs size={80} className="text-muted-foreground" />}
            messageTitle="No hay proveedores contratados"
            description="Los proveedores que ya han sido contratados se mostrarán aquí, por el momento no hay proveedores contratados."
          />
        </TabsContent>
        <TabsContent value="processing">
          <EmptyPlaceholder
            icon={<BookDashed size={80} className="text-muted-foreground" />}
            messageTitle="No hay proveedores en proceso de contratacion"
            description="Los proveedores que estén en proceso de contratación se mostrarán aquí, por el momento no hay proveedores en proceso."
          />
        </TabsContent>
        <TabsContent value="news">
          <EmptyPlaceholder
            icon={<Newspaper size={80} className="text-muted-foreground" />}
            messageTitle="No hay nuevos proveedores"
            description="Los proveedores que acaban de ser agregados se mostrarán aquí, por el momento no hay proveedores nuevos."
          />
        </TabsContent>
      </Tabs>
    </main>
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
