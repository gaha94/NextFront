interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  
  export default function ProductCard({ id, name, price, image }: ProductProps) {
    return (
      <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl shadow">
        <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
          Imagen
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold">{product.name}</span>
              <p className="text-xs text-gray-700">ID: {product.id}</p>
            </div>
            <span className="font-bold text-red-600">S/. {product.price}</span>
          </div>
          <button
            onClick={() => onAddToCart?.(product)}
            className="hover:bg-sky-700 text-white bg-sky-800 py-2 rounded-md"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    );
  }
  