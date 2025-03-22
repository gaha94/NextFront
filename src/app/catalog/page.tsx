'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const rawData = await res.json();

        // ✅ Tipo temporal para lo que viene del backend
        type RawProduct = {
          id: number;
          name: string;
          price: string;
          stock: number;
          category: string;
        };

        // ✅ Convertimos los datos a tipo Product (price: number, quantity: 1)
        const parsedProducts: Product[] = rawData.map((p: RawProduct) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          stock: p.stock,
          category: p.category,
          quantity: 1,
        }));

        setProducts(parsedProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
