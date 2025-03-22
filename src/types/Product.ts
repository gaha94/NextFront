// src/types/Product.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    quantity: number; // 👈 necesario para el carrito
  }
  