import { useEffect, useState } from "react";
import { collections, type Collection } from "@/data/collections";

const STORAGE_KEY = "livin:cart";
const CART_EVENT = "livin:cart:change";

export type CartItem = { slug: string; qty: number };

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        typeof i === "object" &&
        i !== null &&
        typeof (i as CartItem).slug === "string" &&
        typeof (i as CartItem).qty === "number",
    );
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
  } catch {
    // storage full or unavailable — silently ignore
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
    const onChange = () => setItems(loadCart());
    window.addEventListener(CART_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CART_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const add = (slug: string) => {
    const cur = loadCart();
    const existing = cur.find((i) => i.slug === slug);
    const next = existing
      ? cur.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i))
      : [...cur, { slug, qty: 1 }];
    saveCart(next);
  };

  const remove = (slug: string) => {
    saveCart(loadCart().filter((i) => i.slug !== slug));
  };

  const setQty = (slug: string, qty: number) => {
    if (qty <= 0) {
      remove(slug);
      return;
    }
    saveCart(loadCart().map((i) => (i.slug === slug ? { ...i, qty } : i)));
  };

  const bump = (slug: string, delta: number) => {
    const cur = loadCart();
    const existing = cur.find((i) => i.slug === slug);
    if (!existing) return;
    const newQty = existing.qty + delta;
    if (newQty <= 0) {
      saveCart(cur.filter((i) => i.slug !== slug));
      return;
    }
    saveCart(
      cur.map((i) => (i.slug === slug ? { ...i, qty: newQty } : i)),
    );
  };

  const clear = () => saveCart([]);

  const count = items.reduce((s, i) => s + i.qty, 0);

  const lines = items
    .map((i) => {
      const product = collections.find((c) => c.slug === i.slug);
      return product ? { item: i, product } : null;
    })
    .filter(
      (l): l is { item: CartItem; product: Collection } => l !== null,
    );

  const subtotal = lines.reduce(
    (s, l) => s + l.product.priceValue * l.item.qty,
    0,
  );

  return { items, lines, count, subtotal, add, remove, setQty, bump, clear, hydrated };
}
