import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, CreditCard, Wallet, Building2, Truck, ChevronRight, Lock } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "@/context/ShopContext";
import { getProductById, formatRupiah } from "@/data/products";
import ProductImage from "@/components/ProductImage";

const STEPS = ["Alamat", "Pengiriman", "Pembayaran"];

const SHIPPING_OPTIONS = [
  { id: "regular", name: "Reguler", est: "2-3 hari", price: 35000 },
  { id: "express", name: "Ekspres", est: "1 hari", price: 80000 },
  { id: "sameday", name: "Same Day (Jabodetabek)", est: "Hari ini", price: 120000 },
];

const PAYMENT_METHODS = [
  { id: "card", name: "Kartu Kredit / Debit", icon: CreditCard, desc: "Visa, Mastercard, JCB" },
  { id: "ewallet", name: "E-Wallet", icon: Wallet, desc: "GoPay, OVO, Dana, ShopeePay" },
  { id: "transfer", name: "Transfer Bank", icon: Building2, desc: "BCA, BNI, Mandiri, BRI" },
  { id: "cod", name: "Bayar di Tempat (COD)", icon: Truck, desc: "Tunai saat pesanan tiba" },
];

const Checkout = () => {
  const { cart, cartSubtotal } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState("regular");
  const [payment, setPayment] = useState("card");

  const shippingCost = SHIPPING_OPTIONS.find((s) => s.id === shipping)?.price || 0;
  const total = cartSubtotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    toast.success("Pesanan berhasil dibuat!", {
      description: "Ini adalah demo UI. Pesanan tidak benar-benar diproses.",
    });
    setTimeout(() => navigate("/profil"), 1200);
  };

  return (
    <div data-testid="checkout-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Stepper */}
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
          Checkout
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tighter text-[#1D1D1F]">
          Selesaikan pesanan Anda
        </h1>

        <div className="mt-7 flex items-center gap-2 flex-wrap">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => setStep(i)}
                data-testid={`step-${i}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  step === i
                    ? "bg-[#1D1D1F] text-white"
                    : step > i
                    ? "bg-[#007AFF]/10 text-[#007AFF]"
                    : "bg-[#F5F5F7] text-[#86868B]"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step > i ? "bg-[#007AFF] text-white" : "bg-white/20"
                  }`}
                >
                  {step > i ? <Check size={11} /> : i + 1}
                </span>
                {s}
              </button>
              {i < STEPS.length - 1 && (
                <ChevronRight size={14} className="text-[#86868B]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          {/* Step 0: Address */}
          {step === 0 && (
            <div data-testid="address-form" className="bg-white rounded-3xl border border-[#E5E5EA] p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-xl font-semibold">Alamat Pengiriman</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nama Depan" testId="first-name" required defaultValue="Andre" />
                <Field label="Nama Belakang" testId="last-name" required defaultValue="Wijaya" />
                <Field label="Nomor HP" testId="phone" required defaultValue="0812-3456-7890" />
                <Field label="Email" testId="email" type="email" required defaultValue="andre@example.com" />
              </div>
              <Field label="Alamat Lengkap" testId="address" required defaultValue="Jl. Sudirman Kav. 21, RT 03/RW 05" />
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Provinsi" testId="province" required defaultValue="DKI Jakarta" />
                <Field label="Kota" testId="city" required defaultValue="Jakarta Selatan" />
                <Field label="Kode Pos" testId="postal" required defaultValue="12190" />
              </div>
              <Field label="Catatan (Opsional)" testId="notes" defaultValue="" placeholder="Patokan, instruksi khusus…" />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  data-testid="next-shipping"
                  className="bg-[#1D1D1F] hover:bg-[#000] text-white rounded-full px-7 py-3 font-medium"
                >
                  Lanjut ke Pengiriman
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div data-testid="shipping-form" className="bg-white rounded-3xl border border-[#E5E5EA] p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-xl font-semibold">Metode Pengiriman</h2>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    data-testid={`shipping-${opt.id}`}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      shipping === opt.id
                        ? "border-[#007AFF] bg-[#007AFF]/5"
                        : "border-[#E5E5EA] hover:border-[#1D1D1F]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      className="accent-[#007AFF]"
                    />
                    <Truck size={20} className="text-[#007AFF]" />
                    <div className="flex-1">
                      <div className="font-medium text-[#1D1D1F]">{opt.name}</div>
                      <div className="text-xs text-[#86868B]">Estimasi {opt.est}</div>
                    </div>
                    <div className="font-display font-semibold">
                      {formatRupiah(opt.price)}
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="text-sm text-[#86868B] hover:text-[#1D1D1F]"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  data-testid="next-payment"
                  className="bg-[#1D1D1F] hover:bg-[#000] text-white rounded-full px-7 py-3 font-medium"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div data-testid="payment-form" className="bg-white rounded-3xl border border-[#E5E5EA] p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-xl font-semibold">Metode Pembayaran</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    data-testid={`payment-${m.id}`}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      payment === m.id
                        ? "border-[#007AFF] bg-[#007AFF]/5"
                        : "border-[#E5E5EA] hover:border-[#1D1D1F]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="accent-[#007AFF] mt-1"
                    />
                    <div className="flex-1">
                      <m.icon size={20} className="text-[#1D1D1F] mb-2" />
                      <div className="font-medium text-[#1D1D1F] text-sm">{m.name}</div>
                      <div className="text-xs text-[#86868B] mt-0.5">{m.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              {payment === "card" && (
                <div className="space-y-3 pt-3 border-t border-[#E5E5EA]">
                  <Field label="Nomor Kartu" testId="card-number" placeholder="1234 5678 9012 3456" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Masa Berlaku" testId="card-expiry" placeholder="MM/YY" />
                    <Field label="CVV" testId="card-cvv" placeholder="123" />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-[#86868B] hover:text-[#1D1D1F]"
                >
                  ← Kembali
                </button>
                <button
                  type="submit"
                  data-testid="place-order-btn"
                  className="inline-flex items-center gap-2 bg-[#007AFF] hover:bg-[#005BB5] text-white rounded-full px-8 py-3.5 font-medium"
                >
                  <Lock size={14} />
                  Bayar {formatRupiah(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <aside>
          <div className="bg-[#F5F5F7] rounded-3xl p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-semibold mb-5">Ringkasan</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto thin-scrollbar pr-1">
              {cart.map((c) => {
                const p = getProductById(c.id);
                if (!p) return null;
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 relative">
                      <ProductImage category={p.category} size="sm" />
                      <span className="absolute -top-1 -right-1 bg-[#1D1D1F] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                        {c.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                      <div className="text-xs text-[#86868B]">{c.color}</div>
                    </div>
                    <div className="text-sm font-semibold">
                      {formatRupiah(p.price * c.qty)}
                    </div>
                  </div>
                );
              })}
            </div>
            <dl className="space-y-2 text-sm mt-5 pt-5 border-t border-[#E5E5EA]">
              <div className="flex justify-between">
                <dt className="text-[#86868B]">Subtotal</dt>
                <dd>{formatRupiah(cartSubtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#86868B]">Ongkir</dt>
                <dd>{formatRupiah(shippingCost)}</dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#E5E5EA]">
                <dt className="font-display font-semibold">Total</dt>
                <dd className="font-display font-bold text-xl">{formatRupiah(total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </form>
    </div>
  );
};

const Field = ({ label, testId, type = "text", required, defaultValue, placeholder }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-[0.15em] text-[#86868B] font-semibold mb-1.5">
      {label}{required && <span className="text-[#FF3B30] ml-0.5">*</span>}
    </span>
    <input
      type={type}
      required={required}
      defaultValue={defaultValue}
      placeholder={placeholder}
      data-testid={`field-${testId}`}
      className="w-full bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-xl px-4 py-3 outline-none transition-all text-[#1D1D1F]"
    />
  </label>
);

export default Checkout;