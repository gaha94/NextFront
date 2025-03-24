// src/app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types/Product';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();

        setProduct({ ...data, quantity: 1 });
      } catch (error) {
        console.error('❌ Error al obtener producto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="p-8">Cargando...</p>;
  if (!product) return <p className="p-8">Producto no encontrado</p>;

  return (
    <div className="p-8 flex flex-col md:flex-row gap-10 min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 h-80 bg-gray-300 rounded-lg" />

      <div className="flex flex-col gap-4 w-full md:w-1/2 text-black">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">Categoría: {product.category}</p>
        <p className="text-xl font-semibold text-sky-800">S/.{product.price.toFixed(2)}</p>
        <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
          Stock: {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
        </p>

        <button
          className="bg-sky-800 hover:bg-sky-700 text-white py-2 px-4 rounded-md w-fit mt-4"
          disabled={product.stock <= 0}
          onClick={() => addToCart(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
