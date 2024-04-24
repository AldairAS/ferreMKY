"use client";
import {
  // getAllSuppliersClient,
  // getSuppliersByValueOfDatabase,
} from "@client/supplier";
import { Supplier } from "@models/types";
import React, { createContext, useEffect, useState } from "react";

type SupplierContextType = {
  n: number;
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  readSuppliers: (suppliers: Supplier[]) => void;
  updateSupplier: (supplier: Supplier) => void;
  deleteSupplier: (id: string) => void;
};

export const SupplierContext = createContext<SupplierContextType>({
  n: 0,
  suppliers: [],
  addSupplier: () => {},
  readSuppliers: () => {},
  updateSupplier: () => {},
  deleteSupplier: () => {},
});

export const SupplierProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [n, setN] = useState<number>(0);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const addSupplier = (supplier: Supplier) => {
    setSuppliers((prevSuppliers) => [supplier, ...prevSuppliers]);
  };

  const readSuppliers = (suppliers: Supplier[]) => {
    setSuppliers(() => suppliers);
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

  // // console.log(suppliers);
  // useEffect(() => {
  //   // console.log(suppliers);
  //   if (suppliers.length > 0) return;
  //   const getSuppliers = async () => {
  //     const data = await getSuppliersByValueOfDatabase("", 1);
  //     console.log(data);
  //     setSuppliers(data);
  //     //setN(() => data.count);
  //   };

  //   // console.log("first");
  //   // fetch suppliers

  //   getSuppliers();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <SupplierContext.Provider
      value={{
        n,
        suppliers,
        addSupplier,
        readSuppliers,
        updateSupplier,
        deleteSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
