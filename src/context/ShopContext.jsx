import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { getProductById } from "../data/products";

const shopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  // Cart : [{id, qty, variant, color}]
  const [cart, setCart] = useState([
    {
      id: "iphone-15-pro",
      qty: 1,
      variant: "256GB",
      color: "Natural Titanium",
    },
    { id: "sony-wh1000xm5", qty: 2, variant: "Standard", color: "Black" },
  ]);

  const [wishlist, setWishlist] = useState([
    "macbook-pro-m3",
    "apple-watch-ultra-2",
    "rog-zephyrus-g14",
  ]);

  const addToCart = useCallback((id, opts = {}) => {
    setCart((prev) => {
      const existing = prev.find(
        (c) =>
          c.id === id && c.variant === opts.variant && c.color === opts.color
      );

      if (existing) {
        return prev.map((c) =>
          c === existing ? { ...c, qty: c.qty + (opts.qty || 1) } : c
        );
      }

      return [
        ...prev,
        {
          id,
          qty: opts.qty || 1,
          variant: opts.variant || null,
          color: opts.color || null,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c))
        .filter((c) => c.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const toggleWishList = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const isInWishlist = useCallback((id) => wishlist.includes(id), [wishlist]);

  const cartCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty, 0),
    [cart]
  );

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, c) => {
      const p = getProductById(c.id);
      return sum + (p ? p.price * c.qty : 0);
    }, 0);
  }, [cart]);

  const value = {
    cart,
    cartCount,
    cartSubtotal,
    addToCart,
    updateQty,
    removeFromCart,
    wishlist,
    toggleWishList,
    isInWishlist,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export const useShop = () => {
  const ctx = useContext(shopContext);
  if (!ctx) {
    throw new Error("useShop must be used within ShopProvider");
  }

  return ctx;
};
