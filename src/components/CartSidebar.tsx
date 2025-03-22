'use client';

import { X, Trash2, Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-black">Carrito</h2>
        <button 
            onClick={onClose}  
            title="Cerrar carrito"
            className='cursor-pointer hover:text-black'>
          <X />
        </button>
      </div>

      <div className="p-4 flex flex-col justify-between h-[calc(100%-4rem)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b pb-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-black">{item.name}</p>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="text-sky-800 cursor-pointer"
                    disabled={item.quantity <= 1}
                    title="Disminuir cantidad"
                    >
                    <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                    onClick={() => increaseQuantity(item.id)}
                    className="text-sky-800 cursor-pointer"
                    disabled={item.quantity >= item.stock}
                    title="Aumentar cantidad"
                    >
                    <Plus size={16} />
                </button>
                  </div>
                  <p className="text-sm text-black">
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
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between font-semibold mb-4 text-black">
              <span>Total:</span>
              <span>S/.{total.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-sky-800 hover:bg-sky-700 text-white py-2 rounded-md cursor-pointer"
              onClick={() => {
                onClose();
                router.push('/cart');
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
