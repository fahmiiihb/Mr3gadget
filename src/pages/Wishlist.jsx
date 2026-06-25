import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useShop();
  const items = wishlist.map((id) => getProductById(id)).filter(Boolean);

  return (
    <div data-testid="wishlist-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
        Wishlist
      </div>
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tighter text-[#1D1D1F]">
            Produk Favorit Anda
          </h1>
          <p className="text-[#86868B] mt-2">
            {items.length} produk tersimpan di wishlist
          </p>
        </div>
        {items.length > 0 && (
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#007AFF] hover:underline"
          >
            Telusuri produk lain <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div
          data-testid="wishlist-empty"
          className="mt-10 bg-[#F5F5F7] rounded-3xl py-20 px-6 flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <Heart size={28} className="text-[#86868B]" />
          </div>
          <h2 className="font-display text-2xl font-semibold mt-6">
            Wishlist Anda kosong
          </h2>
          <p className="text-[#86868B] mt-2 max-w-sm">
            Simpan produk favorit Anda di sini untuk dilihat nanti.
          </p>
          <Link
            to="/katalog"
            className="mt-6 inline-flex items-center gap-2 bg-[#1D1D1F] hover:bg-[#007AFF] text-white rounded-full px-6 py-3 text-sm font-medium transition-colors"
          >
            Mulai Belanja <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div
          data-testid="wishlist-grid"
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;