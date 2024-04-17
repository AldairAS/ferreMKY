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
import { JSX, SVGProps, useState } from "react";
import { AddSupplierForm, EditSupplierForm } from "./supplier-forms";
import useModal from "../hooks/useModal";
import { Supplier } from "@/models/types";

const suppliers = [
  {
    id: "1",
    name: "Proveedor 1",
    contact: "123456789",
    description: "Proveedor 1",
  },
  {
    id: "2",
    name: "Proveedor 2",
    contact: "987654321",
    description: "Proveedor 2",
  },
  {
    id: "3",
    name: "Proveedor 3",
    contact: "123456789",
    description: "Proveedor 3",
  },
  {
    id: "4",
    name: "Proveedor 4",
    contact: "987654321",
    description: "Proveedor 4",
  },
  {
    id: "5",
    name: "Proveedor 5",
    contact: "123456789",
    description: "Proveedor 5",
  },
  {
    id: "6",
    name: "Proveedor 6",
    contact: "987654321",
    description: "Proveedor 6",
  },
  {
    id: "7",
    name: "Proveedor 7",
    contact: "123456789",
    description: "Proveedor 7",
  },
];

export function SupplierView() {
  const [supplier, setSupplier] = useState<Supplier>(suppliers[0]);
  const [isOpenAddModal, openAddModal, closeAddModal] = useModal(false);
  const [isOpenEditModal, openEditModal, closeEditModal] = useModal(false);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="draft">Borradores</TabsTrigger>
            <TabsTrigger className="hidden sm:flex" value="archived">
              Archivados
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
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
                <DropdownMenuCheckboxItem checked>
                  Activo
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Borrador</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archivado</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                            <DropdownMenuItem className="text-red-500">
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <EditSupplierForm
                supplier={supplier}
                isOpenModal={isOpenEditModal}
                closeModal={closeEditModal}
              />
              <AddSupplierForm
                isOpenModal={isOpenAddModal}
                closeModal={closeAddModal}
              />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Mostrando
                <strong> 1-10</strong> de <strong>32 </strong>
                productos
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function ListFilterIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
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
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
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
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
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
