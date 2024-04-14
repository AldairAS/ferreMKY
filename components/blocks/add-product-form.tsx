'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@components/ui/alert-dialog';

import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { FormProductSchema } from '@models/schemas';

export default function AddProductForm({
  formTrigger
}: {
  formTrigger: React.ReactNode;
}) {
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
    <AlertDialog>
      <AlertDialogTrigger>{formTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-2xl'>
            Agregar Producto
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Producto</FormLabel>
                  <FormControl>
                    <Input placeholder='Resina UXC 9' {...field} />
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input placeholder='Descripcion ...' {...field} />
                  </FormControl>
                  <FormDescription>
                    Una descripcion detallada del producto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between'>
              <FormField
                control={form.control}
                name='priceSale'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='150.00' {...field} />
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
                name='storageCost'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='150.00' {...field} />
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
              name='quantity'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Stock</FormLabel>
                    <FormDescription>
                      El producto esta disponible?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <div className='flex gap-2 items-center'>
                      <Label htmlFor='stock'>{field.value ? 'Sí' : 'No'}</Label>
                      <Switch
                        checked={Boolean(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex justify-between w-full'>
              <Button type='submit'>Crear Producto</Button>
              <Button type='reset' variant='destructive'>
                Limpiar
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
