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
import { useState, useEffect } from "react";
import {
  valueInventory,
  recentMovements,
  kindValue,
  categoryValue,
} from "@/services/server/product_supplier";
import { Movement, ValueCategory, ValueKind } from "@/models/types";
export default function DashboardView() {
  const [valueTotal, setValueTotal] = useState([]);
  const [rMovements, setRMovements] = useState<Movement[]|[]>([]);
  const [kValue, setKValue] = useState<ValueKind[]|[]>([]);
  const [cValue, setCValue] = useState<ValueCategory[]|[]>([]);
  const [loading, setLoading] = useState(true);

  const getValueInventory = async () => {
    setLoading(true);
    const data = await valueInventory();
    setValueTotal(data[0].total_value);
    setLoading(false);
  };
  const getMovements = async () => {
    setLoading(true);
    const data = await recentMovements();
    setRMovements(data);
    setLoading(false);
  };
  const getValueCategory = async () => {
    setLoading(true);
    const data = await categoryValue();
    setCValue(data);
    setLoading(false);
  };
  const getValueKind = async () => {
    setLoading(true);
    const data = await kindValue();
    setKValue(data);
    setLoading(false);
  };

  useEffect(() => {
    getValueInventory();
    getMovements();
    getValueCategory();
    getValueKind();
  }, []);

  return (
    <div className="m-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <p key={1}>{valueTotal}</p>
          </CardTitle>
          <CardDescription>Valor total del inventario</CardDescription>
        </CardHeader>
      </Card>
      <h1 className="text-xl py-4">Valor de productos por Categoría</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoría</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Valor total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cValue.map((movement, idx) => (
            <TableRow key={idx}>
              <TableCell>{movement.name_category}</TableCell>
              <TableCell>{movement.quantity}</TableCell>
              <TableCell>${movement.total_value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1 className="text-xl py-4">Valor de productos por Tipo de producto</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Valor total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kValue.map((movement, idx) => (
            <TableRow key={idx}>
              <TableCell>{movement.name_kind}</TableCell>
              <TableCell>{movement.quantity}</TableCell>
              <TableCell>${movement.total_value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1 className="text-xl py-4">Movimientos recientes</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoría</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Fecha de Movimiento</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio de compra</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rMovements.map((movement, idx) => (
            <TableRow key={idx}>
              <TableCell>{movement.category_name}</TableCell>
              <TableCell>{movement.product_description}</TableCell>
              <TableCell>{movement.created_at}</TableCell>
              <TableCell>{movement.supplier_name}</TableCell>
              <TableCell>{movement.quantity}</TableCell>
              <TableCell>${movement.price_purchase}</TableCell>
              <TableCell>${movement.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
