import AddCategoryForm from "@components/add-category";
import AddKindForm from "@components/add-kind";
import AddSupplierForm from "@components/add-supplier";
import AddProductForm from "@components/add-product";
import AddQuantityForm from "@components/add-quantity-product";
import { getAllCategories } from "@server/category";
import { getAllKinds } from "@server/kind";
import { getAllProducts } from "@server/product";
import { getAllSuppliers } from "@server/supplier";

export default async function Add() {
  const categories = await getAllCategories();
  const kinds = await getAllKinds();
  const products = await getAllProducts();
  const suppliers = await getAllSuppliers();

  return (
    <div>
      <AddCategoryForm />
      <AddKindForm categories={categories} />
      <AddSupplierForm />
      <AddProductForm kinds={kinds} />
      <AddQuantityForm products={products} suppliers={suppliers} />
    </div>
  );
}
