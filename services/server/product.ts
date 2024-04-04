"use server";

import { supabase } from "@/config/supabase";

export type Product = {
  id: string;
  code: string;
  unit: number;
  description: string;
  price_sale: number;
  quantity: number;
  name_kind: string;
};

export async function searchItemsInventory(
  currentPage: number,
  query: string,
  rows?: number
) {
  const initialPosition = (rows ?? 10) * (currentPage - 1);
  const lastPosition = (rows ?? 10) * currentPage - 1;

  const { data: products } = await supabase
    .rpc("get_products_kind_query", { query })
    .select("id, code, unit, description, price_sale, quantity, name_kind")
    .range(initialPosition, lastPosition);

  return products as Product[];
}
