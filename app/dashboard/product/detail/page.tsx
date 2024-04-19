import { ProductCard } from "@/components/blocks/product_view";
import { getUniqueProduct } from "@/services/server/product";

export default async function DetailProductPage({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = searchParams?.id || "";
  const product  = await getUniqueProduct(id);
  
  return (
    <div>
      {product == null ? (
        <div className="mt-10 p-5 text-center font-bold uppercase">
          No se encontró
        </div>
      ) : (
        <ProductCard product={product}   />
      )}
    </div>
  );
}
