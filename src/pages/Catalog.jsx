import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { products, categories, brands, formatRupiah } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const SORT_OPTIONS = [
  { value: "relevance", label: "Paling Relevan" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "rating", label: "Rating Tertinggi" },
  { value: "newest", label: "Terbaru" },
];

const PRICE_RANGES = [
  { id: "all", label: "Semua Harga", min: 0, max: Infinity },
  { id: "under-2", label: "Di bawah Rp 2 Juta", min: 0, max: 2000000 },
  { id: "2-5", label: "Rp 2 Juta - Rp 5 Juta", min: 2000000, max: 5000000 },
  { id: "5-15", label: "Rp 5 Juta - Rp 15 Juta", min: 5000000, max: 15000000 },
  { id: "above-15", label: "Di atas Rp 15 Juta", min: 15000000, max: Infinity },
];

const Catalog = () => {
  const [params, setParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("relevance");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [search, setSearch] = useState(params.get("q") || "");

  const selectedCat = params.get("cat") || "all";

  useEffect(() => {
    setSearch(params.get("q") || "");
  }, [params]);

  const filtered = useMemo(() => {
    let arr = [...products];
    if (selectedCat !== "all") arr = arr.filter((p) => p.category === selectedCat);
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    const range = PRICE_RANGES.find((r) => r.id === priceRange);
    if (range) arr = arr.filter((p) => p.price >= range.min && p.price < range.max);
    if (selectedBrands.length > 0)
      arr = arr.filter((p) => selectedBrands.includes(p.brand));

    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")
      arr.sort((a, b) => (b.badges?.includes("new") ? 1 : 0) - (a.badges?.includes("new") ? 1 : 0));
    return arr;
  }, [selectedCat, search, priceRange, selectedBrands, sort]);

  const toggleBrand = (b) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );

  const resetFilters = () => {
    setPriceRange("all");
    setSelectedBrands([]);
    setParams({});
    setSearch("");
  };

  const activeCount =
    (selectedCat !== "all" ? 1 : 0) +
    (priceRange !== "all" ? 1 : 0) +
    selectedBrands.length;

  return (
    <div data-testid="catalog-page" className="bg-white">
      {/* Header */}
      <section className="border-b border-[#E5E5EA] bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
            Katalog
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter text-[#1D1D1F]">
            Semua Produk
          </h1>
          <p className="mt-3 text-[#86868B] max-w-2xl">
            Temukan gadget premium dengan filter lengkap dan harga terbaik.
          </p>

          {/* Category pills */}
          <div className="mt-7 flex flex-wrap gap-2">
            <button
              onClick={() => setParams({})}
              data-testid="cat-pill-all"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCat === "all"
                  ? "bg-[#1D1D1F] text-white"
                  : "bg-white text-[#1D1D1F] hover:bg-[#E5E5EA]"
              }`}
            >
              Semua
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                data-testid={`cat-pill-${c.id}`}
                onClick={() => setParams({ cat: c.id })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCat === c.id
                    ? "bg-[#1D1D1F] text-white"
                    : "bg-white text-[#1D1D1F] hover:bg-[#E5E5EA]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              data-testid="filter-toggle"
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-sm font-medium"
            >
              <SlidersHorizontal size={14} />
              Filter
              {activeCount > 0 && (
                <span className="bg-[#007AFF] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
            <div className="text-sm text-[#86868B]" data-testid="product-count">
              <span className="text-[#1D1D1F] font-semibold">{filtered.length}</span> produk ditemukan
            </div>
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              data-testid="sort-select"
              className="appearance-none bg-[#F5F5F7] hover:bg-[#E5E5EA] pl-4 pr-10 py-2.5 rounded-full text-sm font-medium cursor-pointer outline-none focus:ring-2 focus:ring-[#007AFF]/30"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  Urutkan: {s.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#86868B]"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside
            className={`${
              filterOpen ? "block" : "hidden"
            } lg:block fixed lg:static inset-0 lg:inset-auto bg-white lg:bg-transparent z-40 overflow-y-auto`}
            data-testid="filter-sidebar"
          >
            <div className="lg:sticky lg:top-28 p-6 lg:p-0 space-y-7">
              <div className="lg:hidden flex items-center justify-between pb-4 border-b">
                <span className="font-display font-semibold text-lg">Filter</span>
                <button onClick={() => setFilterOpen(false)} className="p-2">
                  <X size={18} />
                </button>
              </div>

              <FilterGroup title="Cari">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    data-testid="filter-search"
                    placeholder="Nama produk…"
                    className="w-full bg-[#F5F5F7] rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#007AFF]/30"
                  />
                </div>
              </FilterGroup>

              <FilterGroup title="Rentang Harga">
                <div className="space-y-2">
                  {PRICE_RANGES.map((r) => (
                    <label
                      key={r.id}
                      className="flex items-center gap-2 cursor-pointer text-sm text-[#1D1D1F] hover:text-[#007AFF]"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={r.id}
                        checked={priceRange === r.id}
                        onChange={() => setPriceRange(r.id)}
                        data-testid={`price-${r.id}`}
                        className="accent-[#007AFF]"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Brand">
                <div className="space-y-2">
                  {brands.map((b) => (
                    <label
                      key={b}
                      className="flex items-center gap-2 cursor-pointer text-sm text-[#1D1D1F] hover:text-[#007AFF]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleBrand(b)}
                        data-testid={`brand-${b}`}
                        className="accent-[#007AFF] w-4 h-4 rounded"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <button
                type="button"
                onClick={resetFilters}
                data-testid="reset-filters"
                className="w-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Reset Filter
              </button>
            </div>
          </aside>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div
              data-testid="empty-state"
              className="flex flex-col items-center justify-center py-20 text-center bg-[#F5F5F7] rounded-3xl"
            >
              <Search size={36} className="text-[#86868B] mb-4" />
              <div className="font-display text-xl font-semibold text-[#1D1D1F]">
                Tidak ada produk ditemukan
              </div>
              <p className="text-sm text-[#86868B] mt-2 max-w-xs">
                Coba ubah filter atau kata kunci pencarian Anda.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 bg-[#1D1D1F] hover:bg-[#007AFF] text-white rounded-full px-5 py-2.5 text-sm"
              >
                Reset filter
              </button>
            </div>
          ) : (
            <div
              data-testid="catalog-grid"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterGroup = ({ title, children }) => (
  <div>
    <div className="text-xs uppercase tracking-[0.2em] text-[#86868B] font-semibold mb-3">
      {title}
    </div>
    {children}
  </div>
);

export default Catalog;