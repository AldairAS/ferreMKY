export type StateCategory =
  | {
      errors?: {
        name?: string[];
        description?: string[];
      };
      message?: string | null;
    }
  | undefined;

export type StateKind =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        idCategory?: string[];
      };
      message?: string | null;
    }
  | undefined;

export type StateSupplier =
  | {
      errors?: {
        name?: string[];
        contact?: string[];
        description?: string[];
      };
      message?: string | null;
    }
  | undefined;

export type StateProduct =
  | {
      errors?: {
        code?: string[];
        description?: string[];
        priceSale?: string[];
        storageCost?: string[];
        unit?: string[];
        quantity?: string[];
        idKind?: string[];
      };
      message?: string | null;
    }
  | undefined;

export type StateProductSupplier =
  | {
      errors?: {
        pricePurchase?: string[];
        quantity?: string[];
        idProduct?: string[];
        idSupplier?: string[];
      };
      message?: string | null;
    }
  | undefined;
