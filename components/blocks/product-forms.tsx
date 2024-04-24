"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";

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
import { Button } from "@components/ui/button";

import { FormProductSchema } from "@/models/schemas";
import {
  addProductClient,
  updateProductClient,
  validateProductClient,
} from "@client/product";
import { useState } from "react";
import { Kind } from "@/models/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "../ui/modal";
import useModal from "../hooks/useModal";
import { showToast } from "@/libs/utils";
import { TypeToast } from "@/models/enums";

export function AddProductForm({ kinds }: { kinds: Kind[] }) {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<any>(null);
  const [fileImage, setFileImage] = useState<File | undefined>(undefined);

  const [isOpenModal, openModal, closeModal] = useModal(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString();
      const regex = /^data:image\/([a-zA-Z+]+);base64/;
      let match = result?.match(regex);

      if (match && match[1]) {
        setImagePreview(reader.result);
      } else {
        showToast(
          "Advertencia",
          "Por favor ingrese SOLO imagenes",
          TypeToast.WARNING
        );
        setImagePreview(null);
        setFileImage(undefined);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const form = useForm<z.infer<typeof FormProductSchema>>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: {
      code: "",
      description: "",
      priceSale: 0,
      storageCost: 0,
      unit: "",
      quantity: 0,
      idKind: kinds[0]?.id,
    },
  });

  const generateFormData = (values: z.infer<typeof FormProductSchema>) => {
    const formData = new FormData();
    formData.append("code", values.code);
    formData.append("description", values.description);
    formData.append("priceSale", values.priceSale.toString());
    formData.append("storageCost", values.storageCost.toString());
    formData.append("unit", values.unit);
    formData.append("quantity", values.quantity.toString());
    formData.append("idKind", values.idKind);

    if (fileImage) formData.append("image", fileImage);

    return formData;
  };

  async function validateForm(values: z.infer<typeof FormProductSchema>) {
    const formData = generateFormData(values);

    const res = await validateProductClient(undefined, formData);
    if (!res) openModal();
  }

  async function onSubmit(values: z.infer<typeof FormProductSchema>) {
    const formData = generateFormData(values);

    const res = await addProductClient(undefined, formData);

    closeModal();

    if (res?.message) showToast("Error", res.message, TypeToast.ERROR);

    if (res?.success) {
      showToast(
        "Producto añadido",
        `Producto ${values.code} añadido`,
        TypeToast.SUCCESS
      );

      router.push("/dashboard/product");
    }
  }

  return (
    <div className="md:flex w-full my-10 px-10">
      <ImageFormProduct
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:w-[70%] w-full px-5 py-4 border "
        >
          <InputsFormProduct form={form} kinds={kinds} />
          <div className="flex justify-end gap-4 w-full">
            <Button type="submit" onClick={form.handleSubmit(validateForm)}>
              Crear Producto
            </Button>
            <Button
              type="reset"
              onClick={() => form.reset()}
              variant="destructive"
            >
              Limpiar
            </Button>
          </div>
          <Modal
            isOpen={isOpenModal}
            handleClose={closeModal}
            title="Agregar Producto"
          >
            <div className="font-medium">
              ¿Está seguro?. Esto añadirá un producto al inventario.
            </div>
            <div className="flex justify-around mt-8">
              <Button type="submit">Crear Producto</Button>
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
            </div>
          </Modal>
        </form>
      </Form>
    </div>
  );
}

export function EditProductForm({
  product,
  kinds,
}: {
  product: any;
  kinds: Kind[];
}) {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<any>(product.url_image);
  const [fileImage, setFileImage] = useState<File | undefined>(undefined);

  const [isOpenModal, openModal, closeModal] = useModal(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString();
      const regex = /^data:image\/([a-zA-Z+]+);base64/;
      let match = result?.match(regex);

      if (match && match[1]) {
        setImagePreview(reader.result);
      } else {
        showToast(
          "Advertencia",
          "Por favor ingrese SOLO imagenes",
          TypeToast.WARNING
        );
        setImagePreview(product.url_image);
        setFileImage(undefined);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(product.url_image);
    }
  };

  const form = useForm<z.infer<typeof FormProductSchema>>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: {
      code: product.code,
      description: product.description,
      priceSale: product.price_sale,
      storageCost: product.storage_cost,
      unit: product.unit,
      quantity: product.quantity,
      idKind: product.id_kind,
    },
  });

  const generateFormData = (values: z.infer<typeof FormProductSchema>) => {
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("code", values.code);
    formData.append("description", values.description);
    formData.append("priceSale", values.priceSale.toString());
    formData.append("storageCost", values.storageCost.toString());
    formData.append("unit", values.unit);
    formData.append("quantity", values.quantity.toString());
    formData.append("idKind", values.idKind);
    formData.append("idImage", product.id_image);
    formData.append("urlImage", product.url_image);

    if (fileImage) formData.append("image", fileImage);

    return formData;
  };

  async function validateForm(values: z.infer<typeof FormProductSchema>) {
    const formData = generateFormData(values);

    const res = await validateProductClient(undefined, formData);
    if (!res) openModal();
  }

  async function onSubmit(values: z.infer<typeof FormProductSchema>) {
    const formData = generateFormData(values);

    const res = await updateProductClient(undefined, formData);

    closeModal();

    if (res?.message) showToast("Error", res.message, TypeToast.ERROR);

    if (res?.success) {
      showToast(
        "Producto actualizado",
        `Producto ${values.code} actualizado`,
        TypeToast.SUCCESS
      );

      router.push("/dashboard/product");
    }
  }

  return (
    <div className="md:flex w-full my-10 px-10">
      <ImageFormProduct
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:w-[70%] w-full px-5 py-4 border "
        >
          <InputsFormProduct form={form} kinds={kinds} />
          <div className="flex justify-around w-full">
            <Button type="button" onClick={form.handleSubmit(validateForm)}>
              Actualizar Producto
            </Button>
            <Button
              type="reset"
              onClick={() => form.reset()}
              variant="destructive"
            >
              Limpiar
            </Button>
          </div>
          <Modal
            isOpen={isOpenModal}
            handleClose={closeModal}
            title="Actualizar Producto"
          >
            <div className="font-medium">
              ¿Está seguro?. Esto actualizará el producto {`${product.code}`}.
            </div>
            <div className="flex justify-around mt-8">
              <Button type="submit">Actualizar Producto</Button>
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
            </div>
          </Modal>
        </form>
      </Form>
    </div>
  );
}

export function ImageFormProduct({
  imagePreview,
  handleImageChange,
}: {
  imagePreview: any;
  handleImageChange: (e: any) => void;
}) {
  return (
    <div className="lg:w-[30%] md:w-[40%] sm:w-[50%] w-[80%] m-auto flex ">
      <div className="w-[80%] h-[80%] m-auto border relative">
        {!imagePreview && <ImagePlus className="w-full h-full m-auto" />}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-contain rounded-md shadow"
          />
        )}
        <div className="w-full h-full absolute top-0 left-0">
          <Input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full h-full opacity-0"
          />
        </div>
      </div>
    </div>
  );
}

export function InputsFormProduct({
  form,
  kinds,
}: {
  form: UseFormReturn<
    {
      code: string;
      description: string;
      priceSale: number;
      storageCost: number;
      unit: string;
      quantity: number;
      idKind: string;
    },
    any,
    undefined
  >;
  kinds: Kind[];
}) {
  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-8 gap-x-7 w-full">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input placeholder="0002849" {...field} />
              </FormControl>
              <FormDescription>Código del producto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
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
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-y-8 gap-x-7  ">
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unidad</FormLabel>
              <FormControl>
                <Input placeholder="Unidad (m²,m³,...)" {...field} />
              </FormControl>
              <FormDescription>Unidad del Producto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad del Producto" {...field} />
              </FormControl>
              <FormDescription>Cantidad del Producto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceSale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input placeholder="Precio ..." {...field} />
              </FormControl>
              <FormDescription>Precio del producto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid sm:grid-cols-2  grid-cols-1 gap-y-8 gap-x-7">
        <FormField
          control={form.control}
          name="storageCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio de Almacenamiento</FormLabel>
              <FormControl>
                <Input placeholder="Precio de Almacenamiento ..." {...field} />
              </FormControl>
              <FormDescription>
                Precio de Almacenamiento del producto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idKind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className=" w-full">
                    <SelectValue placeholder="Selecciona un Tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {kinds.map((v, i) => (
                    <SelectItem key={i} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Tipo del Producto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
