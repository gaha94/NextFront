'use client';

import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-black">Carrito de compras</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const atMin = item.quantity <= 1;

            return (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                  <div className="relative group">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-sky-800 disabled:opacity-50 cursor-pointer"
                      disabled={atMin}
                      title="Disminuir cantidad"
                    >
                      <Minus size={16} />
                    </button>
                      {item.quantity <= 1 && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Mínimo 1 unidad
                        </span>
                        )}
                  </div>
                    <span>{item.quantity}</span>
                    <div className="relative group">
                    <button
                        onClick={() => increaseQuantity(item.id)}
                        className="text-sky-800 disabled:opacity-50 cursor-pointer"
                        disabled={item.quantity >= item.stock}
                        title="Stock máximo alcanzado"
                    >
                      <Plus size={16} />
                    </button>
                    {item.quantity >= item.stock && (
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                        Stock máximo
                    </span>
                    )}
                    </div>
                  </div>
                  <p className="text-sm text-black mt-2">
                    {item.quantity} x S/.{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-black">
                    S/.{(item.quantity * item.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mt-6 text-right text-xl font-bold text-black">
            Total: S/.{total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
