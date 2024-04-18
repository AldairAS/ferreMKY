"use client";
import { Supplier } from "@models/types";
import React, { createContext, useState } from "react";

type SupplierContextType = {
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  deleteSupplier: (id: string) => void;
  readSuppliers: (suppliers: Supplier[]) => void;
};

export const SupplierContext = createContext<SupplierContextType>({
  suppliers: [],
  addSupplier: () => {},
  deleteSupplier: () => {},
  readSuppliers: () => {},
});

export const SupplierProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const addSupplier = (supplier: Supplier) => {
    setSuppliers((prevSuppliers) => [...prevSuppliers, supplier]);
  };

  const readSuppliers = (suppliers: Supplier[]) => {
    setSuppliers(suppliers);
  };

  const updateSupplier = (supplier: Supplier) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((prevSupplier) =>
        prevSupplier.id === supplier.id ? supplier : prevSupplier
      )
    );
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.filter((supplier) => supplier.id !== id)
    );
  };

  return (
    <SupplierContext.Provider
      value={{ suppliers, readSuppliers, addSupplier, deleteSupplier }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
