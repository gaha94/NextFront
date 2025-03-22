// src/components/Header.tsx
'use client';

import { ShoppingCart } from 'lucide-react';

export default function Header({ onCartClick }: { onCartClick: () => void }) {
  return (
    <header className="w-full px-6 py-4 bg-white shadow flex items-center justify-between">
      <h1 className="text-xl font-bold text-black">Mi Tienda</h1>
      <button
        onClick={onCartClick}
        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <ShoppingCart className="w-6 h-6 text-gray-800" />
        {/* Opcional: contador de productos */}
        {/* <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">3</span> */}
      </button>
    </header>
  );
}
