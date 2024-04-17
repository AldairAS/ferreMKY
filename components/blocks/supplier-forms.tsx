"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";

import { FormSupplierSchema } from "@models/schemas";
import { Supplier } from "@models/types";
import Modal from "../ui/modal";
import { addSupplierClient, editSupplierClient } from "@client/supplier";

export function AddSupplierForm({
  isOpenModal,
  closeModal,
}: {
  isOpenModal: boolean;
  closeModal: () => void;
}) {
  const form = useForm<z.infer<typeof FormSupplierSchema>>({
    resolver: zodResolver(FormSupplierSchema),
    defaultValues: {
      name: "",
      contact: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSupplierSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("contact", values.contact);
    formData.append("description", values.description);

    const res = await addSupplierClient(undefined, formData);
    // console.log(res);
  }

  return (
    <Modal
      isOpen={isOpenModal}
      handleClose={closeModal}
      title="Agregar Proveedor"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Proveedor</FormLabel>
                <FormControl>
                  <Input placeholder="Resina UXC 9" {...field} />
                </FormControl>
                <FormDescription>Un nombre para el proveedor</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción del Proveedor</FormLabel>
                <FormControl>
                  <Input placeholder="Descripcion ..." {...field} />
                </FormControl>
                <FormDescription>
                  Una descripcion detallada del proveedor
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contacto</FormLabel>
                <FormControl>
                  <Input placeholder="Contacto ..." {...field} />
                </FormControl>
                <FormDescription>Un contacto para el proveedor</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between w-full">
            <Button type="submit">Crear Proveedor</Button>
            <Button
              type="reset"
              onClick={() => form.reset()}
              variant="destructive"
            >
              Limpiar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}

export function EditSupplierForm({
  supplier,
  isOpenModal,
  closeModal,
}: {
  isOpenModal: boolean;
  closeModal: () => void;
  supplier: Supplier;
}) {
  const form = useForm<z.infer<typeof FormSupplierSchema>>({
    resolver: zodResolver(FormSupplierSchema),
    defaultValues: {
      name: "",
      contact: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSupplierSchema>) {
    const formData = new FormData();
    formData.append("id", supplier.id);
    formData.append("name", values.name);
    formData.append("contact", values.contact);
    formData.append("description", values.description);

    const res = await editSupplierClient(undefined, formData);
    // console.log(values, supplier.id);
  }

  useEffect(() => {
    // console.log(supplier);
    // form.reset(supplier);

    form.setValue("name", supplier.name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("description", supplier.description, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("contact", supplier.contact, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [supplier]);

  // console.log(form.formState.defaultValues, supplier);
  return (
    <Modal
      isOpen={isOpenModal}
      handleClose={closeModal}
      title="Editar Proveedor"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Proveedor</FormLabel>
                <FormControl>
                  <Input placeholder="Resina UXC 9" {...field} />
                </FormControl>
                <FormDescription>
                  Un nuevo nombre para el proveedor
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
                <FormLabel>Descripcion del Proveedor</FormLabel>
                <FormControl>
                  <Input placeholder="Descripcion ..." {...field} />
                </FormControl>
                <FormDescription>
                  Una nueva descripción detallada del proveedor
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contacto del Proveedor</FormLabel>
                <FormControl>
                  <Input placeholder="Contacto ..." {...field} />
                </FormControl>
                <FormDescription>
                  Un nuevo contacto para el proveedor
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between w-full">
            <Button type="submit">Editar Proveedor</Button>
            <Button
              type="reset"
              onClick={() => form.reset()}
              variant="destructive"
            >
              Limpiar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
