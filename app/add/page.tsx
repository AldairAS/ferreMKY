import AddCategoryForm from '@/components/add-category';
import AddKindForm from '@/components/add-kind';
import AddSupplierForm from '@/components/add-supplier';
import AddProductForm from '@/components/add-product';
import AddQuantityForm from '@/components/add-quantity-product';
import { getAllCategories } from '@/services/server/category';
import { getAllKinds } from '@/services/server/kind';
import { getAllProducts } from '@/services/server/product';
import { getAllSuppliers } from '@/services/server/supplier';

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
