'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Filtros sincronizados con la URL
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  

  // Actualizar la URL al cambiar filtros o página
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (inStock) params.set('inStock', 'true');
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sort) params.set('sort', sort);
    params.set('page', page.toString());
  
    router.replace(`/catalog?${params.toString()}`);
  }, [search, category, inStock, minPrice, maxPrice, sort, page, router]);  

  // Obtener productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        if (inStock) params.append('inStock', 'true');
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (sort) params.append('sort', sort);
        params.append('page', page.toString());

        const res = await fetch(`http://localhost:5000/api/products?${params.toString()}`);
        const { products: rawData, totalPages } = await res.json(); // <-- adaptado para backend paginado

        type RawProduct = {
          id: number;
          name: string;
          price: string; // viene como string desde el backend
          stock: number;
          category: string;
        };
        
        const parsedProducts: Product[] = rawData.map((p: RawProduct) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price), // convertimos a número
          stock: p.stock,
          category: p.category,
          quantity: 1,
        }));

        setProducts(parsedProducts);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, [search, category, inStock, minPrice, maxPrice, sort, page]);

  // Obtener categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('❌ Error al cargar categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-8">
      {/* Sidebar de filtros */}
      <aside className="w-64 bg-white shadow rounded p-4 h-fit">
        <h2 className="text-xl font-semibold mb-4 text-black">Filtros</h2>

        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-gray-800"
        />

        <select
          title="Selecciona una categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-gray-800"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 mb-4 text-sm text-gray-800">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          Solo productos en stock
        </label>

        <div className="flex flex-col gap-2 mb-4 text-gray-800">
          <input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <select
          title="Selecciona un orden"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full p-2 border rounded text-gray-800"
        >
          <option value="">Ordenar por</option>
          <option value="asc">Precio: Menor a mayor</option>
          <option value="desc">Precio: Mayor a menor</option>
        </select>
        <button
          onClick={() => {
            setSearch('');
            setCategory('');
            setInStock(false);
            setMinPrice('');
            setMaxPrice('');
            setSort('');
            setPage(1);
          }}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-black py-2 rounded"
        >
          Limpiar filtros
        </button>
      </aside>

      {/* Productos + paginación */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {/* Botón Anterior */}
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-sky-800 text-white rounded disabled:opacity-50 cursor-pointer"
            >
              Anterior
            </button>

            {/* Números de página */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`cursor-pointer px-3 py-1 rounded ${
                  num === page
                    ? 'bg-sky-800 text-white font-semibold'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {num}
              </button>
            ))}

            {/* Botón Siguiente */}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-sky-800 text-white rounded disabled:opacity-50 cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
