import { AddProductForm } from "@/components/blocks/product-forms";
import { Kind } from "@/models/types";
import { getAllKinds } from "@/services/server/kind";

export default async function AddProductPage() {
  const kinds: Kind[] = await getAllKinds();

  return (
    <div>
      <AddProductForm kinds={kinds} />
    </div>
  );
}
