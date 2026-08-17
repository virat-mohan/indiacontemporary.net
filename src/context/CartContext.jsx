import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { artworks } from "@/data/artworks";

const CartContext = createContext(null);
const STORAGE_KEY = "ic_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (artworkId, qty = 1) => {
    const art = artworks.find((a) => a.id === artworkId);
    if (!art || art.stock < 1) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.artworkId === artworkId);
      const maxQty = art.stock;
      if (existing) {
        return prev.map((i) =>
          i.artworkId === artworkId
            ? { ...i, qty: Math.min(i.qty + qty, maxQty) }
            : i
        );
      }
      return [...prev, { artworkId, qty: Math.min(qty, maxQty) }];
    });
  };

  const removeItem = (artworkId) => {
    setItems((prev) => prev.filter((i) => i.artworkId !== artworkId));
  };

  const updateQty = (artworkId, qty) => {
    const art = artworks.find((a) => a.id === artworkId);
    const maxQty = art ? art.stock : 99;
    setItems((prev) =>
      prev.map((i) =>
        i.artworkId === artworkId ? { ...i, qty: Math.max(1, Math.min(qty, maxQty)) } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const lineItems = useMemo(
    () =>
      items
        .map((i) => {
          const art = artworks.find((a) => a.id === i.artworkId);
          return art ? { ...i, art } : null;
        })
        .filter(Boolean),
    [items]
  );

  const itemCount = lineItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = lineItems.reduce((sum, i) => sum + i.qty * i.art.price, 0);

  return (
    <CartContext.Provider
      value={{ items: lineItems, addItem, removeItem, updateQty, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
