import { useCart } from "@/context/CartContext";

import { Product } from '@/types/Product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const {addToCart} = useCart();
  
  return (
    <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl shadow-md hover:scale-105 transition-transform">
      <div className="h-48 bg-gray-700 rounded-xl"></div>
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-black">{product.name}</span>
          </div>
          <span className="font-bold text-red-600">
            S/.{product.price.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() =>
            addToCart({
              ...product,
              price: Number(product.price), // por si viene como string
              quantity: 1
            })
          }          
          className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 cursor-pointer rounded-md">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
