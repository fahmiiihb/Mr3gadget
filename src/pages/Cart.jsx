import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { getProductById, formatRupiah } from "@/data/products";
import ProductImage from "@/components/ProductImage";

const Cart = () => {
  const { cart, cartSubtotal, updateQty, removeFromCart } = useShop();

  const shipping = cart.length > 0 ? (cartSubtotal >= 1500000 ? 0 : 35000) : 0;
  const discount = cart.length > 1 ? 100000 : 0;
  const total = cartSubtotal + shipping - discount;

  if (cart.length === 0) {
    return (
      <div
        data-testid="cart-empty"
        className="max-w-3xl mx-auto px-4 py-24 text-center"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-[#F5F5F7] flex items-center justify-center">
          <ShoppingBag size={28} className="text-[#86868B]" />
        </div>
        <h1 className="font-display text-3xl font-semibold mt-6">
          Keranjang Anda kosong
        </h1>
        <p className="text-[#86868B] mt-2">
          Mulai jelajahi koleksi gadget premium kami.
        </p>
        <Link
          to="/katalog"
          className="mt-6 inline-flex items-center gap-2 bg-[#007AFF] hover:bg-[#005BB5] text-white rounded-full px-7 py-3 font-medium"
        >
          Mulai Belanja <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
        Keranjang
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tighter text-[#1D1D1F]">
        Keranjang Belanja
      </h1>
      <p className="text-[#86868B] mt-2">
        {cart.length} produk dalam keranjang Anda
      </p>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 mt-10">
        {/* Items */}
        <div className="space-y-4">
          {cart.map((c) => {
            const p = getProductById(c.id);
            if (!p) return null;
            return (
              <div
                key={`${c.id}-${c.variant}-${c.color}`}
                data-testid={`cart-item-${c.id}`}
                className="bg-white border border-[#E5E5EA] rounded-3xl p-4 sm:p-5 flex gap-4"
              >
                <Link
                  to={`/produk/${p.id}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#F5F5F7] shrink-0"
                >
                  <ProductImage category={p.category} size="md" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-[#86868B] font-semibold">
                        {p.brand}
                      </div>
                      <Link
                        to={`/produk/${p.id}`}
                        className="font-display font-semibold text-[#1D1D1F] hover:text-[#007AFF] block leading-snug line-clamp-2"
                      >
                        {p.name}
                      </Link>
                      <div className="flex flex-wrap gap-2 mt-1.5 text-xs text-[#86868B]">
                        {c.color && <span>Warna: {c.color}</span>}
                        {c.variant && <span>· {c.variant}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(c.id)}
                      data-testid={`remove-${c.id}`}
                      aria-label="Hapus"
                      className="w-9 h-9 rounded-full hover:bg-[#FF3B30]/10 hover:text-[#FF3B30] flex items-center justify-center transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center bg-[#F5F5F7] rounded-full">
                      <button
                        onClick={() => updateQty(c.id, c.qty - 1)}
                        data-testid={`dec-${c.id}`}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#E5E5EA] rounded-full"
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        className="w-8 text-center text-sm font-semibold"
                        data-testid={`qty-${c.id}`}
                      >
                        {c.qty}
                      </span>
                      <button
                        onClick={() => updateQty(c.id, c.qty + 1)}
                        data-testid={`inc-${c.id}`}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#E5E5EA] rounded-full"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="font-display font-bold text-lg text-[#1D1D1F]">
                      {formatRupiah(p.price * c.qty)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <aside className="space-y-4">
          <div
            data-testid="cart-summary"
            className="bg-[#F5F5F7] rounded-3xl p-6 lg:sticky lg:top-28"
          >
            <h2 className="font-display text-xl font-semibold mb-5">
              Ringkasan Pesanan
            </h2>

            {/* Promo input */}
            <div className="relative mb-5">
              <Tag size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" />
              <input
                type="text"
                placeholder="Kode promo"
                data-testid="promo-input"
                className="w-full bg-white rounded-full pl-10 pr-24 py-3 text-sm outline-none focus:ring-2 focus:ring-[#007AFF]/30"
              />
              <button
                data-testid="promo-apply"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#1D1D1F] text-white text-xs font-medium rounded-full px-4 py-1.5"
              >
                Terapkan
              </button>
            </div>

            <dl className="space-y-3 text-sm">
              <Row label="Subtotal" value={formatRupiah(cartSubtotal)} />
              <Row
                label="Ongkos kirim"
                value={shipping === 0 ? "GRATIS" : formatRupiah(shipping)}
                valueClass={shipping === 0 ? "text-[#34C759] font-semibold" : ""}
              />
              {discount > 0 && (
                <Row
                  label="Diskon multi-item"
                  value={`- ${formatRupiah(discount)}`}
                  valueClass="text-[#FF3B30]"
                />
              )}
              <div className="border-t border-[#E5E5EA] pt-3 flex justify-between items-center">
                <span className="font-display text-base font-semibold">Total</span>
                <span
                  data-testid="cart-total"
                  className="font-display text-2xl font-bold text-[#1D1D1F]"
                >
                  {formatRupiah(total)}
                </span>
              </div>
            </dl>

            <Link
              to="/checkout"
              data-testid="checkout-btn"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#007AFF] hover:bg-[#005BB5] text-white font-medium rounded-full py-3.5 transition-colors"
            >
              Lanjut ke Checkout <ArrowRight size={14} />
            </Link>
            <Link
              to="/katalog"
              className="mt-2 w-full inline-flex items-center justify-center text-sm text-[#86868B] hover:text-[#007AFF] py-2"
            >
              Lanjut Belanja
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

const Row = ({ label, value, valueClass = "" }) => (
  <div className="flex justify-between">
    <dt className="text-[#86868B]">{label}</dt>
    <dd className={`text-[#1D1D1F] ${valueClass}`}>{value}</dd>
  </div>
);

export default Cart;