'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/ui/form';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@components/ui/alert-dialog';

import { FormSupplierSchema } from '@models/schemas';
import { Supplier } from '@models/types';
// import { Switch } from '../ui/switch';
// import { Label } from '../ui/label';

export function AddSupplierForm({
  formTrigger
}: {
  formTrigger: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof FormSupplierSchema>>({
    resolver: zodResolver(FormSupplierSchema)
  });

  function onSubmit(values: z.infer<typeof FormSupplierSchema>) {
    console.log(values);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>{formTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='flex flex-row justify-between'>
          <AlertDialogTitle className='text-2xl'>
            Agregar Proveedor
          </AlertDialogTitle>
          <AlertDialogCancel className='bg-red-500 rounded-full text-white'>
            X
          </AlertDialogCancel>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Proveedor</FormLabel>
                  <FormControl>
                    <Input placeholder='Resina UXC 9' {...field} />
                  </FormControl>
                  <FormDescription>Un nombre para el proveedor</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input placeholder='Descripcion ...' {...field} />
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
              name='contact'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto</FormLabel>
                  <FormControl>
                    <Input placeholder='Contacto ...' {...field} />
                  </FormControl>
                  <FormDescription>
                    Un contacto para el proveedor
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between w-full'>
              <Button type='submit'>Crear Producto</Button>
              <Button
                type='reset'
                onClick={() => form.reset()}
                variant='destructive'
              >
                Limpiar
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function EditSupplierForm({
  open,
  supplier
}: {
  //formTrigger: React.ReactNode;
  open: boolean;
  supplier: Supplier;
}) {
  const form = useForm<z.infer<typeof FormSupplierSchema>>({
    resolver: zodResolver(FormSupplierSchema),
    defaultValues: {
      ...supplier
    }
  });

  function onSubmit(values: z.infer<typeof FormSupplierSchema>) {
    console.log(values);
  }
  return (
    <AlertDialog open={open}>
      {/*<AlertDialogTrigger>{formTrigger}</AlertDialogTrigger>*/}
      <AlertDialogContent>
        <AlertDialogHeader className='flex-row justify-between'>
          <AlertDialogTitle className='text-2xl'>
            Editar Provedor
          </AlertDialogTitle>
          <AlertDialogCancel className='bg-red-500 rounded-full text-white'>
            X
          </AlertDialogCancel>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Proveedor</FormLabel>
                  <FormControl>
                    <Input placeholder='Resina UXC 9' {...field} />
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input placeholder='Descripcion ...' {...field} />
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
              name='contact'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto</FormLabel>
                  <FormControl>
                    <Input placeholder='Contacto ...' {...field} />
                  </FormControl>
                  <FormDescription>
                    Un nuevo contacto para el proveedor
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between w-full'>
              <Button type='submit'>Crear Producto</Button>
              <Button
                type='reset'
                onClick={() => form.reset()}
                variant='destructive'
              >
                Limpiar
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
