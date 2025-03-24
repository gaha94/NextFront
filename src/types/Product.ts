export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  quantity: number;
  image_url?: string; // 👈 nueva propiedad opcional
}
