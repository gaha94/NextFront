"use client";

import { useState } from "react";
import Header from "./Header";
import CartSidebar from "./CartSidebar";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main className="p-4">{children}</main>
    </>
  );
}
