export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  code: string;
  description: string;
  price_sale: number;
  storage_cost: number;
  unit: string;
  quantity: number;
  id_kind: string;
  id_image: string;
  url_image: string;
  name_kind: string;
};

export type ProductSupplier = {
  id: string;
  code: string;
  description: string;
  price_sale: number;
  quantity: number;
  name_kind: string;
  quantity_supplier: number;
  price_purchase: number;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  description: string;
};

export type Kind = {
  id: string;
  name: string;
  description: string;
  id_category: string;
};
