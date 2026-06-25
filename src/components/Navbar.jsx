import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu, X, Zap } from "lucide-react";
import { useShop } from "@/context/ShopContext";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/katalog", label: "Katalog" },
  { to: "/katalog?cat=smarthphone", label: "Smartphone" },
  { to: "/katalog?cat=laptop", label: "Laptop" },
  { to: "/katalog?cat=smartwatch", label: "Smartwatch" },
  { to: "/katalog?cat=aksesoris", label: "Aksesoris" },
];

export const Navbar = () => {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/katalog?q=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  return (
    <header
      data-testid="main-navbar"
      className="sticky top-0 z-50 bg-white/75 backdrop-blur-xl border-b border-black/5"
    >
      {/*Top promo strip */}
      <div className="bg-[#0a0a0a] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2">
          <Zap size={12} className="text-[#007Aff]" />
          <span className="opacity-60">
            Gratis ongkir untuk pesanan di atas RP 1.500.000 - berlaku
            se-Indonesia
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            data-testid="nav-logo"
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0a0a0a] flex items-center justify-center group-hover:bg-[#007AFF] transition-colors">
              <span className="font-display text-white font-bold text-lg leading-none">
                M
              </span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-[15px] tracking-tight">
                Mr.<span className="text-[#007aff]">3Gadget</span>
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#86868b] -mt-0.5">
                Premium Tech Store
              </div>
            </div>
          </Link>
          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md relateive"
            data-testid="search-from-desktop"
          >
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="search-input"
              placeholder="Cari iPhone, Macbook, AirPods..."
              className="w-full bg-[#f5f5f7] border border-transparent focus:bg-white focus:border-[#007aff] rounded-full pl-11 pr-4 py-2.5 text-sm outline-none transition-none"
            />
          </form>
          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/wishlist"
              data-testid="nav-wishlist"
              aria-label="Wishlist"
              className="relative w-10 h-10 rounded-full hover:bg-[#f5f5f7] flex items-center justify-center transition-colors"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ff3b30] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/keranjang"
              data-testid="nav-cart"
              aria-label="Keranjang"
              className="relative w-10 h-10 rounded-full hover:bg-[#f5f5f7] flex items-center justify-center transition-colors"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-[#007aff] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/profil"
              data-testid="nav-profile"
              aria-label="Akun saya"
              className="hidden sm:flex w-10 h-10 rounded-full hover:bg-[#F5F5F7] items-center justify-center transition-colors"
            >
              <User size={18} />
            </Link>
            <Link
              to="/login"
              data-testid="nav-login"
              className="hidden lg:inline-flex bg-[#007AFF] text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-[#005BB5] transition-colors"
            >
              Masuk
            </Link>
            <button
              type="button"
              data-testid="nav-mobile-toggle"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-full hover:bg-[#F5F5F7] flex items-center justify-center"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {/* Desktop nav row */}
        <nav className="hidden md:flex items-center gap-1 -mt-1 pb-3 overflow-x-auto thin-scrollbar">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#1D1D1F] text-white"
                    : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-black/5 bg-white"
          data-testid="mobile-menu"
        >
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk…"
                data-testid="search-input-mobile"
                className="w-full bg-[#F5F5F7] rounded-full pl-11 pr-4 py-2.5 text-sm outline-none"
              />
            </form>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-xl bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F]"
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-[#007AFF] text-white rounded-full py-2.5 text-sm font-medium"
            >
              Masuk / Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
