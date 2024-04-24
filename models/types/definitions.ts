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

export type Movement = {
  id: string;
  category_name: string;
  product_description: string;
  created_at: string;
  supplier_name: string;
  quantity: number;
  price_purchase: number;
  total: number;
}

export type ValueCategory = {
  idcategory: string;
  name_category: string;
  quantity: number;
  total_value: number;
}

export type ValueKind = {
  idkind: string;
  name_kind: string;
  quantity: number;
  total_value: number;
}

export type User = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  dni: string;
  phone_number: string;
  email: string;
  image: string;
  id_image: string;
  id_role: string;
  id_store: string;
}
