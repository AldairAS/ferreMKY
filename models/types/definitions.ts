export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  code: string;
  unit: number;
  description: string;
  price_sale: number;
  quantity: number;
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
