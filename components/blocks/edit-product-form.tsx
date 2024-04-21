"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { FormProductSchema } from "@models/schemas";
import { X } from "lucide-react";

import { useFormState } from "react-dom";
import { addProductClient } from "@/services/client/product";

export default function EditProductForm({
  onOpenChange,
  ...props
}: React.ComponentPropsWithRef<typeof Dialog>) {
  const [formState, formAction] = useFormState(addProductClient, undefined);
  const form = useForm<z.infer<typeof FormProductSchema>>({
    resolver: zodResolver(FormProductSchema),
    // defaultValues: {
    //   image: ''
    // }
  });

  function onSubmit(values: z.infer<typeof FormProductSchema>) {
    console.log(values);
  }
  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent className="lg:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Haz cambios a los detalles del producto y luego haz click en guardar
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 items-start">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Producto</FormLabel>
                      <FormControl>
                        <Input placeholder="Resina UXC 9" {...field} />
                      </FormControl>
                      <FormDescription>
                        Un nombre descriptivo para el producto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripcion</FormLabel>
                      <FormControl>
                        <Input placeholder="Descripcion ..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Una descripcion detallada del producto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex lg:flex-row flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="priceSale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="150.00"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Precio en stock del producto
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="storageCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="150.00"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Cantidad de productos en stock
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="flex mt-4 flex-col lg:flex-row lg:items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Stock</FormLabel>
                        <FormDescription>
                          El producto esta disponible?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <div className="flex gap-2 items-center">
                          <Label htmlFor="stock">
                            {field.value ? "Sí" : "No"}
                          </Label>
                          <Switch
                            checked={Boolean(field.value)}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-72 mt-8">
                <div className="flex items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-zinc-900 dark:bg-zinc-950 hover:bg-gray-100 dark:border-zinc-800 dark:hover:border-zinc-700 "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-center px-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Haz clic para seleccionar
                        </span>{" "}
                        o arrastra y suelta una imagen
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>

                <p className="mt-5 leading-4 text-gray-500  text-xs ">
                  El archivo de imagen del producto debe ser un archivo de
                  imagen PNG, JPG con un tamaño máximo de 800x400px.
                </p>
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
