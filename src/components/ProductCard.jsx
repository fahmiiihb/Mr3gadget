import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatRupiah } from "@/data/products";
import ProductImage from "@/components/ProductImage";

const BADGE_STYLE = {
  "best-seller": "bg-[#1D1D1F] text-white",
  discount: "bg-[#ff3b30] text-white",
  new: "bg-[#007aff] text-white",
};

const BADGE_LABEL = {
  "best-seller": "Best Seller",
  discount: "Discount",
  new: "Baru",
};

export const ProductCard = ({ product, compact = false }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const wished = isInWishlist(product.id);

  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-[#e5e5ea] hover:border-[#007AFF]/30 hover:shadow-[0_20px_50px_-15px_rgba(0,122,255,0.15)] transition-all duration-500 hover:-translate-y-1"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        {product.badges?.slice(0.2).map((b) => (
          <span
            key={b}
            className={`${BADGE_STYLE[b]} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full`}
          >
            {b === "discount" && discountPct > 0
              ? `-${discountPct}%`
              : BADGE_LABEL[b]}
          </span>
        ))}
      </div>

      {/* wishlist */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        data-testid={`wishlist-toggle-${product.id}`}
        aria-label="Tambah ke wishlist"
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur border border-[#e5e5ea] flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
      >
        <Heart
          size={16}
          className={
            wished ? "fill-[#ff3b30] text-[#ff3b30]" : "text-[#1d1d1f]"
          }
        />
      </button>

      <Link
        to={`/produk/${product.id}`}
        className={`block ${compact ? "aspect-square" : "aspect-[4/3]"}`}
        data-testid={`product-image-link-${product.id}`}
      >
        <ProductImage
          category={product.category}
          size="lg"
          label={product.name}
        />
      </Link>

      {/* Details */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#86868b] font-medium">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#1d1d1f]">
            <Star size={12} className="fill-[#ffb800] text-[#ffb800]" />
            <span className="font-medium">{product.rating}</span>
            <span className="text=[#86868b]">{product.reviews}</span>
          </div>
        </div>

        <Link to={`/produk/${product.id}`} className="block group/title">
          <h3 className="font-display font-semibold text-[#1d1d1f] text-base sm:text-lg leading-tight line-clamp-2 group-hover/title:text-[#007AFF] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between pt-3 gap-3">
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#86868b] line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
            <span className="font-display text-lg sm:text-xl font-bold text-[#1d1d1f]">
              {formatRupiah(product.price)}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, {
                qty: 1,
                variant: product.variants?.[0],
                color: product.colors?.[0]?.name,
              });
            }}
            data-testid={`add-to-cart-${product.id}`}
            aria-label="Tambah ke keranjang"
            className="w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center hover:bg-[#007Aff] transition-all hover:scale-110 shrink-0"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
