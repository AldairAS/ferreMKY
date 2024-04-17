"use client";
import { Supplier } from "@models/types";
import React, { createContext, useState } from "react";

type SupplierContextType = {
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  deleteSupplier: (id: string) => void;
  setSuppliersData: (suppliers: Supplier[]) => void;
};

export const SupplierContext = createContext<SupplierContextType>({
  suppliers: [],
  addSupplier: () => {},
  deleteSupplier: () => {},
  setSuppliersData: () => {},
});

export const SupplierProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const setSuppliersData = (suppliers: Supplier[]) => {
    setSuppliers(suppliers);
  };

  const addSupplier = (supplier: Supplier) => {
    setSuppliers((prevSuppliers) => [...prevSuppliers, supplier]);
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.filter((supplier) => supplier.id !== id)
    );
  };

  return (
    <SupplierContext.Provider
      value={{ suppliers, setSuppliersData, addSupplier, deleteSupplier }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

//export const useSupplierContext = () => {
// return useContext(SupplierContext);
//};
