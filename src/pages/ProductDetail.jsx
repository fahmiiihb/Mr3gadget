import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Star,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { getProductById, formatRupiah, products } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="font-display text-3xl">Produk tidak ditemukan</h1>
        <Link to="/katalog" className="text-[#007AFF] mt-4 inline-block">
          Kembali ke katalog
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const wished = isInWishlist(product.id);
  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    addToCart(product.id, { qty, variant: selectedVariant, color: selectedColor });
    toast.success("Berhasil ditambahkan ke keranjang", {
      description: `${qty}× ${product.name}`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product.id, { qty, variant: selectedVariant, color: selectedColor });
    navigate("/checkout");
  };

  return (
    <div data-testid="product-detail-page" className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-[#86868B]">
          <Link to="/" className="hover:text-[#007AFF]">Beranda</Link>
          <ChevronRight size={12} />
          <Link to="/katalog" className="hover:text-[#007AFF]">Katalog</Link>
          <ChevronRight size={12} />
          <Link to={`/katalog?cat=${product.category}`} className="hover:text-[#007AFF] capitalize">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1D1D1F] truncate">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#F5F5F7] relative">
            {product.badges?.[0] && (
              <span className="absolute top-5 left-5 z-10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#007AFF] text-white">
                {product.badges[0] === "best-seller"
                  ? "Best Seller"
                  : product.badges[0] === "discount"
                  ? `Diskon ${discountPct}%`
                  : "Baru"}
              </span>
            )}
            <ProductImage
              category={product.category}
              size="xl"
              tone={selectedImage === 1 ? "dark" : "light"}
            />
          </div>
          <div className="grid grid-cols-4 gap-3" data-testid="thumbnail-strip">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                data-testid={`thumb-${i}`}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === i
                    ? "border-[#007AFF]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <ProductImage
                  category={product.category}
                  size="sm"
                  tone={i === 1 ? "dark" : "light"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
              {product.brand}
            </div>
            <h1
              data-testid="product-name"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-tight"
            >
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-[#FFB800] text-[#FFB800]" />
                <span className="font-semibold text-[#1D1D1F]">{product.rating}</span>
                <span className="text-[#86868B]">({product.reviews} ulasan)</span>
              </div>
              <span className="text-[#86868B]">•</span>
              <span className="text-[#34C759] font-medium flex items-center gap-1">
                <Check size={14} />
                Stok tersedia ({product.stock})
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 py-2">
            <span
              data-testid="product-price"
              className="font-display text-4xl sm:text-5xl font-bold text-[#1D1D1F]"
            >
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-lg text-[#86868B] line-through">
                  {formatRupiah(product.originalPrice)}
                </span>
                <span className="bg-[#FF3B30]/10 text-[#FF3B30] text-xs font-semibold px-2 py-1 rounded-full">
                  -{discountPct}%
                </span>
              </>
            )}
          </div>

          <p className="text-[#86868B] leading-relaxed">{product.description}</p>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#86868B] font-semibold">
                  Warna
                </span>
                <span className="text-sm text-[#1D1D1F]">{selectedColor}</span>
              </div>
              <div className="flex gap-2 flex-wrap" data-testid="color-options">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    data-testid={`color-${c.name.replace(/\s+/g, "-").toLowerCase()}`}
                    aria-label={c.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                      selectedColor === c.name
                        ? "border-[#007AFF] scale-110"
                        : "border-[#E5E5EA]"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor === c.name && (
                      <Check
                        size={14}
                        className="absolute inset-0 m-auto text-white mix-blend-difference"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#86868B] font-semibold">
                  Varian
                </span>
              </div>
              <div className="flex flex-wrap gap-2" data-testid="variant-options">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    data-testid={`variant-${v.replace(/\s+/g, "-")}`}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      selectedVariant === v
                        ? "border-[#007AFF] bg-[#007AFF]/5 text-[#007AFF]"
                        : "border-[#E5E5EA] text-[#1D1D1F] hover:border-[#1D1D1F]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center bg-[#F5F5F7] rounded-full" data-testid="qty-selector">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                data-testid="qty-decrease"
                className="w-11 h-11 flex items-center justify-center hover:bg-[#E5E5EA] rounded-full transition-colors"
                aria-label="Kurangi"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-semibold" data-testid="qty-value">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                data-testid="qty-increase"
                className="w-11 h-11 flex items-center justify-center hover:bg-[#E5E5EA] rounded-full transition-colors"
                aria-label="Tambah"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              data-testid="detail-wishlist"
              className="w-11 h-11 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] flex items-center justify-center transition-colors"
              aria-label="Wishlist"
            >
              <Heart
                size={16}
                className={wished ? "fill-[#FF3B30] text-[#FF3B30]" : ""}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              data-testid="add-to-cart-btn"
              className="inline-flex items-center justify-center gap-2 bg-[#1D1D1F] hover:bg-[#000] text-white font-medium rounded-full px-6 py-3.5 transition-colors"
            >
              <ShoppingBag size={16} />
              Tambah ke Keranjang
            </button>
            <button
              onClick={handleBuyNow}
              data-testid="buy-now-btn"
              className="inline-flex items-center justify-center gap-2 bg-[#007AFF] hover:bg-[#005BB5] text-white font-medium rounded-full px-6 py-3.5 transition-colors"
            >
              Beli Sekarang
            </button>
          </div>

          {/* Trust line */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E5EA]">
            {[
              { i: Truck, t: "Gratis Ongkir" },
              { i: ShieldCheck, t: "Garansi Resmi" },
              { i: RotateCcw, t: "Retur 7 Hari" },
            ].map((f) => (
              <div key={f.t} className="flex flex-col items-center gap-1.5 text-center">
                <f.i size={18} className="text-[#007AFF]" />
                <span className="text-[11px] text-[#86868B] font-medium">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
            Spesifikasi
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-8">
            Detail teknis lengkap
          </h2>
          <div
            data-testid="specs-table"
            className="bg-white rounded-3xl border border-[#E5E5EA] overflow-hidden"
          >
            <dl className="divide-y divide-[#E5E5EA]">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4">
                  <dt className="text-sm font-medium text-[#86868B]">{k}</dt>
                  <dd className="sm:col-span-2 text-sm text-[#1D1D1F]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
            Anda mungkin juga suka
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;