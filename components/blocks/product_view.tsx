'use client';

export function ProductCard({ product }: { product: any }) {

  return (
    <div className="md:flex justify-around p-5 gap-x-5 my-10">
      <div className="border p-3 md:w-[350px] sm:w-[60%] w-[70%] max-md:m-auto">
        <img
          src={product?.url_image}
          alt={product?.code}
          className="w-full m-auto h-full object-contain"
        />
      </div>
      <div className=" p-3 md:w-[650px] w-full md:mt-0 mt-10 space-y-6 border">
        <div>
          <h2 className="text-2xl font-semibold tracking-wider">
            {product?.code}
          </h2>
          <p className="mb-2">{product?.description}</p>
          <hr />
        </div>
        <div>
          <span className="font-semibold text-sm">Precio</span>
          <p>$ {product?.price_sale}</p>
        </div>
        <div>
          <span className="font-semibold text-sm">
            Precio de Almacenamiento
          </span>
          <p>$ {product?.storage_cost}</p>
        </div>
        <div>
          <span className="font-semibold text-sm">Unidad</span>
          <p>{product?.unit}</p>
        </div>
        <div>
          <span className="font-semibold text-sm">Cantidad</span>
          <p>{product?.quantity}</p>
        </div>
        <div>
          <span className="font-semibold text-sm">Tipo</span>
          <p>{product?.name_kind}</p>
        </div>
      </div>
    </div>
  );
}
