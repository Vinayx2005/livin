import { useEffect, useState } from "react";
import type { Collection } from "@/data/collections";

const STORAGE_KEY = "livin:cart";
const CART_EVENT = "livin:cart:change";

/**
 * Cart lines are self-contained — each item snapshots the product info it
 * needs to render (name/image/price). That way the cart page doesn't need
 * a runtime lookup into the collections table.
 */
export type CartItem = {
  slug: string;
  qty: number;
  name: string;
  tag: string;
  image: string;
  price: string;
  priceValue: number;
};

function snapshot(product: Collection): Omit<CartItem, "qty"> {
  return {
    slug: product.slug,
    name: product.name,
    tag: product.tag,
    image: product.image,
    price: product.price,
    priceValue: product.priceValue,
  };
}

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
        typeof (i as CartItem).qty === "number" &&
        typeof (i as CartItem).name === "string" &&
        typeof (i as CartItem).priceValue === "number",
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

  const add = (product: Collection) => {
    const cur = loadCart();
    const existing = cur.find((i) => i.slug === product.slug);
    const snap = snapshot(product);
    const next = existing
      ? cur.map((i) =>
          i.slug === product.slug ? { ...snap, qty: i.qty + 1 } : i,
        )
      : [...cur, { ...snap, qty: 1 }];
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
  const subtotal = items.reduce((s, i) => s + i.priceValue * i.qty, 0);

  return { items, count, subtotal, add, remove, setQty, bump, clear, hydrated };
}
