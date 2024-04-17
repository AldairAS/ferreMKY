// FIXME: Para la funcionalidad de busqueda, seria ideal utilizar solo una ventana desplegable para seleccionar la accion a realizar, en lugar de tener una pagina dedicada a la busqueda de productos.

"use client";

import { Product } from "@/models/types";
import { searchItemsInventory } from "@server/product";
import { useEffect, useState } from "react";

const WAIT_BETWEEN_CHANCE = 300;
const rowsPerPage = [2, 5, 10, 25, 50, 100, 250, 500];

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [rows, setRows] = useState<number>(10);

  const [products, setProducts] = useState<Product[] | null>(null);

  const getDataSearch = async () => {
    setLoading(true);
    /* const response = await fetch("/search/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPage, query, rows }),
    });
    const data = await response.json();
    setProducts(data); */
    const data = await searchItemsInventory(currentPage, query, rows);
    /* console.log(data); */
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getDataSearch();
  }, [currentPage, rows, query]);

  const handleQuery = (e: any) => {
    setQuery(e.target.value);
  };
  const changeRows = (e: any) => {
    setRows(Number(e.target.value));
  };

  /* const handleSearch = useDebouncedCallback((term) => {
    setQuery(term)
  }, WAIT_BETWEEN_CHANCE); */

  return (
    <div>
      <h3>Search Items</h3>
      <br />
      <div className="self-center">
        <label htmlFor="query">Search: </label>
        <input
          id="query"
          type="text"
          onChange={handleQuery}
          placeholder="Producto a buscar"
        />
        <label htmlFor="rows"> Rows per page: </label>
        <select value={rows} onChange={changeRows} id="rows">
          {rowsPerPage.map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
        >
          {"<"}
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          {">"}
        </button>
      </div>
      <br />

      <table border={1}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Unit</th>
            <th>Description</th>
            <th>Price Sale</th>
            <th>Quantity</th>
            <th>Name Kind</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            products?.map((v) => (
              <tr key={v.id}>
                <td>{v.code}</td>
                <td>{v.unit}</td>
                <td>{v.description}</td>
                <td>{v.price_sale}</td>
                <td>{v.quantity}</td>
                <td>{v.name_kind}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading && <p>Loading ...</p>}
      <div>{!products || (products?.length == 0 && "No results")}</div>
    </div>
  );
}
