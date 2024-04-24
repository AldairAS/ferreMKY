import { EditProductForm } from "@/components/blocks/product-forms";
import { Kind } from "@/models/types";
import { getAllKinds } from "@/services/server/kind";
import { getUniqueProduct } from "@/services/server/product";

export default async function EditProductPage({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = searchParams?.id || "";
  const kinds: Kind[] = await getAllKinds();
  const product = await getUniqueProduct(id);

  return (
    <div>
      {product == null ? (
        <div className="mt-10 p-5 text-center font-bold uppercase">
          No se encontró
        </div>
      ) : (
        <EditProductForm product={product} kinds={kinds} />
      )}
    </div>
  );
}
