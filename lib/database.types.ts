// Tipo para una fila en la tabla "usuarios"
interface Database {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

// Tipo para una fila en la tabla "productos"
interface User {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

// Exporta los tipos de datos para su uso en otras partes de tu aplicación
export type { Database, User};