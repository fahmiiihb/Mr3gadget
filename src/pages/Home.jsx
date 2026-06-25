import { Link } from "react-router-dom";
import {
  ArrowRight,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";
import {
  categories,
  products,
  getBestSellers,
  formatRupiah,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";

const CATEGORY_ICONS = {
  smartphone: Smartphone,
  laptop: Laptop,
  smartwatch: Watch,
  aksesoris: Headphones,
};

const Home = () => {
  const bestSellers = getBestSellers().slice(0, 4);
  const featured = products[1]; // MacBook Pro M3
  const newArrival = products[3]; // Apple Watch Ultra

  return (
    <div data-testid="home-page">
      {/* HERO — DARK PREMIUM */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,122,255,0.25),_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,122,255,0.15),_transparent_55%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 mb-7">
                <Sparkles size={12} className="text-[#007AFF]" />
                <span className="uppercase tracking-[0.18em] font-medium">
                  Koleksi Februari 2026
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.02]">
                Teknologi premium.
                <br />
                <span className="text-white/40">Disusun untuk</span>{" "}
                <span className="text-[#007AFF]">Anda.</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
                Jelajahi koleksi gadget pilihan — dari iPhone 15 Pro hingga
                MacBook Pro M3. Garansi resmi, pengiriman ekspres se-Indonesia.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/katalog"
                  data-testid="hero-shop-btn"
                  className="group inline-flex items-center gap-2 bg-[#007AFF] hover:bg-[#005BB5] text-white font-medium rounded-full px-7 py-3.5 transition-colors"
                >
                  Belanja Sekarang
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/katalog?cat=smartphone"
                  data-testid="hero-explore-btn"
                  className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-medium rounded-full px-7 py-3.5 transition-colors"
                >
                  Lihat Smartphone
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                <Stat value="50K+" label="Pelanggan" />
                <Stat value="100%" label="Original" />
                <Stat value="4.9★" label="Rating Toko" />
              </div>
            </div>

            {/* Hero showcase card */}
            <div
              className="lg:col-span-5 fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden">
                  <ProductImage category="smartphone" size="xl" tone="dark" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white text-[#1D1D1F] rounded-2xl p-5 shadow-2xl max-w-[220px]">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#86868B] font-semibold">
                    Trending
                  </div>
                  <div className="mt-1 font-display text-base font-semibold">
                    iPhone 15 Pro
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold text-[#007AFF]">
                      {formatRupiah(18999000)}
                    </span>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-[#007AFF] text-white rounded-full px-4 py-2 text-xs font-semibold shadow-xl">
                  -14% OFF
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-t border-white/10 py-5 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-white/30 text-sm font-medium">
            {[
              "Apple",
              "Samsung",
              "Xiaomi",
              "ASUS",
              "Lenovo",
              "Sony",
              "JBL",
              "Logitech",
              "Apple",
              "Samsung",
              "Xiaomi",
              "ASUS",
              "Lenovo",
              "Sony",
              "JBL",
              "Logitech",
            ].map((b, i) => (
              <span key={i} className="font-display tracking-tight text-2xl">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES — Bento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
              Kategori
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1D1D1F]">
              Telusuri berdasarkan kategori
            </h2>
          </div>
          <Link
            to="/katalog"
            data-testid="cat-view-all"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#1D1D1F] hover:text-[#007AFF] transition-colors"
          >
            Lihat semua <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, idx) => {
            const Icon = CATEGORY_ICONS[c.id];
            return (
              <Link
                key={c.id}
                to={`/katalog?cat=${c.id}`}
                data-testid={`category-card-${c.id}`}
                className={`group relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all hover:-translate-y-1 ${
                  idx === 0
                    ? "bg-[#0A0A0A] text-white lg:row-span-2 lg:min-h-[400px]"
                    : "bg-[#F5F5F7] text-[#1D1D1F]"
                }`}
              >
                <div className="flex items-start justify-between mb-12">
                  <Icon
                    size={idx === 0 ? 36 : 28}
                    strokeWidth={1.5}
                    className={idx === 0 ? "text-[#007AFF]" : "text-[#1D1D1F]"}
                  />
                  <ArrowRight
                    size={18}
                    className={`opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
                      idx === 0 ? "text-white" : "text-[#1D1D1F]"
                    }`}
                  />
                </div>
                <div>
                  <div
                    className={`text-xs uppercase tracking-[0.2em] mb-2 ${
                      idx === 0 ? "text-white/40" : "text-[#86868B]"
                    }`}
                  >
                    {c.count} Produk
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                    {c.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      idx === 0 ? "text-white/60" : "text-[#86868B]"
                    }`}
                  >
                    {c.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED — Split banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-5">
          <Link
            to={`/produk/${featured.id}`}
            data-testid="featured-banner-1"
            className="group relative overflow-hidden rounded-3xl bg-[#F5F5F7] p-8 sm:p-10 min-h-[360px] flex flex-col justify-between hover:-translate-y-1 transition-transform"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
                Performa Pro
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] max-w-xs">
                {featured.name}
              </h3>
              <p className="mt-3 text-sm text-[#86868B] max-w-sm">
                Chip M3 Pro, layar Liquid Retina XDR, dan baterai 18 jam.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F] group-hover:text-[#007AFF]">
                Pelajari lebih lanjut <ArrowRight size={14} />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-2/3 opacity-90">
              <ProductImage category="laptop" size="xl" />
            </div>
          </Link>

          <Link
            to={`/produk/${newArrival.id}`}
            data-testid="featured-banner-2"
            className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-white p-8 sm:p-10 min-h-[360px] flex flex-col justify-between hover:-translate-y-1 transition-transform"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(0,122,255,0.3),_transparent_60%)]" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
                Baru Datang
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight max-w-xs">
                {newArrival.name}
              </h3>
              <p className="mt-3 text-sm text-white/60 max-w-sm">
                Jam paling tangguh dari Apple. Bezel titanium, 3000 nits.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium group-hover:text-[#007AFF]">
                Lihat detail <ArrowRight size={14} />
              </div>
            </div>
            <div className="absolute right-4 bottom-4 w-40 h-40 rounded-2xl bg-white/5 border border-white/10 backdrop-blur overflow-hidden">
              <ProductImage category="smartwatch" size="lg" tone="dark" />
            </div>
          </Link>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3 flex items-center gap-2">
              <TrendingUp size={12} /> Best Seller
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1D1D1F]">
              Yang paling diminati
            </h2>
          </div>
          <Link
            to="/katalog"
            data-testid="bs-view-all"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#1D1D1F] hover:text-[#007AFF]"
          >
            Semua produk <ArrowRight size={14} />
          </Link>
        </div>

        <div
          data-testid="bestseller-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
              Mengapa Mr.3Gadget
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1D1D1F] max-w-lg">
              Tempat terbaik untuk gadget impian Anda.
            </h2>
            <p className="mt-5 text-[#86868B] max-w-md leading-relaxed">
              Mr.3Gadget hanya menjual produk 100% original dengan garansi resmi
              distributor. Dukungan pelanggan responsif & pengiriman cepat ke
              seluruh Indonesia.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Shield,
                t: "Original 100%",
                d: "Setiap produk dijamin asli dengan garansi resmi.",
              },
              {
                icon: TrendingUp,
                t: "Harga Kompetitif",
                d: "Promo, cashback & cicilan 0% setiap minggu.",
              },
              {
                icon: Sparkles,
                t: "Layanan Personal",
                d: "Konsultasi 1-on-1 untuk pilihan terbaik.",
              },
              {
                icon: ArrowRight,
                t: "Pengiriman Cepat",
                d: "Same-day Jabodetabek, 2-3 hari nasional.",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="bg-white rounded-2xl p-5 border border-[#E5E5EA]"
              >
                <f.icon size={20} className="text-[#007AFF] mb-3" />
                <div className="font-display font-semibold text-[#1D1D1F]">
                  {f.t}
                </div>
                <div className="text-sm text-[#86868B] mt-1">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ value, label }) => (
  <div>
    <div className="font-display text-2xl sm:text-3xl font-semibold text-white">
      {value}
    </div>
    <div className="text-xs text-white/40 uppercase tracking-[0.15em] mt-1">
      {label}
    </div>
  </div>
);

export default Home;
