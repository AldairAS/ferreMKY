"use client";
import { productos } from "@/data";
import { Badge } from "@components/ui/badge";
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
  Archive,
  ArrowDownIcon,
  ArrowUpDown,
  ArrowUpIcon,
  EyeOff,
  PackageSearch,
  PencilRuler,
} from "lucide-react";
import Image from "next/image";
import { JSX, SVGProps, useState } from "react";
import { EmptyPlaceholder } from "../ui/shared/empty-placeholder";
import AddProductForm from "./add-product-form";
import EditProductForm from "./edit-product-form";
import { DeleteProductDialog } from "./delete=product-dialog";
export function InventaryView() {
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [showDeleteProductDialog, setShowDeleteProductDialog] = useState(false);
  const [filterIcon, setFilterIcon] = useState("");
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
            <AddProductForm
              formTrigger={
                <Button className="h-8 gap-1" size="sm">
                  <PlusCircleIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Agregar Producto
                  </span>
                </Button>
              }
            />
          </div>
        </div>
        <TabsContent value="all">
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
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Imagen</span>
                    </TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                          >
                            <span>Estado</span>
                            {filterIcon === "asc" ? (
                              <ArrowUpIcon
                                className="ml-2 h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            ) : filterIcon === "desc" ? (
                              <ArrowDownIcon
                                className="ml-2 h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArrowUpDown
                                className="ml-2 h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem
                            onClick={() => setFilterIcon("asc")}
                            aria-label="Sort ascending"
                          >
                            <ArrowUpIcon
                              className="mr-2 size-3.5 text-muted-foreground/70"
                              aria-hidden="true"
                            />
                            Asc
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setFilterIcon("desc")}
                            aria-label="Sort descending"
                          >
                            <ArrowDownIcon
                              className="mr-2 size-3.5 text-muted-foreground/70"
                              aria-hidden="true"
                            />
                            Desc
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Precio
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Ventas Totales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Creado en
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Acciones</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productos.map((producto, index) => (
                    <TableRow key={index}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={producto.imagen}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {producto.nombre}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            producto.estado === "Stock"
                              ? "secondary"
                              : producto.estado === "Agotado"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {producto.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        S/. {producto.precio}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {producto.ventasTotal}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {producto.creado}
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
                              onSelect={() => setShowEditProductForm(true)}
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => setShowDeleteProductDialog(true)}
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
              <DeleteProductDialog
                open={showDeleteProductDialog}
                onOpenChange={setShowDeleteProductDialog}
              />
              <EditProductForm
                open={showEditProductForm}
                onOpenChange={setShowEditProductForm}
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
        <TabsContent value="active">
          <EmptyPlaceholder
            icon={<PackageSearch size={80} className="text-muted-foreground" />}
            messageTitle="No hay productos activos"
            description="Los productos con estado activo se mostrarán aquí, por el momento no hay productos activos."
          />
        </TabsContent>
        <TabsContent value="draft">
          <EmptyPlaceholder
            icon={<PencilRuler size={80} className="text-muted-foreground" />}
            messageTitle="No hay productos en borrador"
            description="Los productos que aún no han sido publicados se mostrarán aquí, por el momento no hay productos en borrador."
          />
        </TabsContent>
        <TabsContent value="archived">
          <EmptyPlaceholder
            icon={<Archive size={80} className="text-muted-foreground" />}
            messageTitle="No hay productos archivados"
            description="Los productos archivados se mostrarán aquí, por el momento no hay productos archivados."
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
