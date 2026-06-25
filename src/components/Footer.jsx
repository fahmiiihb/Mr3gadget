import { Link } from "react-router-dom";
import {
    Mail,
    ShieldCheck,
    Truck,
    RotateCcw,
    CreditCard,
    Share2,
    MessageCircle,
    Radio,
    Rss,
  } from "lucide-react";

const features = [
  { icon: Truck, title: "Gratis Ongkir", desc: "Minimal Rp 1.500.000" },
  {
    icon: ShieldCheck,
    title: "Garansi Resmi",
    desc: "100% original & bergaransi",
  },
  {
    icon: RotateCcw,
    title: "Pengembalian 7 hari",
    desc: "Tanpa pertanyaan tambahan",
  },
  {
    icon: CreditCard,
    title: "Pembayaran aman",
    desc: "Bank, e-wallet & paylater",
  },
];

export const Footer = () => {
  return (
    <footer
      data-testid="main-footer"
      className="bg-[#0a0a0a] text-[#f5f5f7] mt-24"
    >
      {/* Feature Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex- items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#007aff shrink-0]">
                <f.icon size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold">{f.title}</div>
                <div className="text-xs text-white/50">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#007AFF] flex items-center justify-center">
              <span className="font-display text-white font-bold text-xl leading-none">
                M
              </span>
            </div>
            <div>
              <div className="font-display font-bold text-lg">
                Mr.<span className="text-[#007AFF]">3Gadget</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Premium Tech Store
              </div>
            </div>
          </Link>
          <p className="text-sm text-white/60 max-w-sm leading-relaxed">
            Destinasi gadget premium di Indonesia. Smartphone, laptop,
            smartwatch, dan aksesoris terbaik dengan layanan profesional.
          </p>
          <div className="flex items-center gap-2">
            {[Share2, MessageCircle, Radio, Rss].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#007aff] flex items-center justify-center transition-colors"
                aria-label="Social"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        <FooterCol
          title="Belanja"
          items={[
            { label: "Smartphone", to: "/katalog?cat=smartphone" },
            { label: "Laptop", to: "/katalog?cat=laptop" },
            { label: "Smartwatch", to: "/katalog?cat=smartwatch" },
            { label: "Aksesoris", to: "/katalog?cat=aksesoris" },
          ]}
        />
        <FooterCol
          title="Bantuan"
          items={[
            { label: "Cara Pemesanan", to: "#" },
            { label: "Pengiriman", to: "#" },
            { label: "Pengembalian", to: "#" },
            { label: "FAQ", to: "#" },
          ]}
        />

        <div className="space-y-4">
          <h4 className="font-display font-semibold text-sm">Newsletter</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Diskon eksklusif & info produk baru langsung ke email Anda.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2"
            data-testid="newsletter-form"
          >
            <div className="relative flex-1">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="email"
                required
                placeholder="email@anda.com"
                className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-3 py-2.5 text-xs placeholder:text-white/30 outline-none focus:border-[#007AFF]"
                data-testid="newsletter-email"
              />
            </div>
            <button
              type="submit"
              className="bg-[#007AFF] hover:bg-[#005BB5] text-white text-xs font-medium rounded-full px-4 transition-colors"
              data-testid="newsletter-submit"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© 2026 Mr.3Gadget. Semua hak dilindungi.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">
              Syarat & Ketentuan
            </a>
            <a href="#" className="hover:text-white">
              Kebijakan Privasi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, items }) => {
  <div className="space-y-3">
    <h4 className="font-display font-semibold text-sm">{title}</h4>
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.label}>
          <Link
            to={it.to}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            {it.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>;
};

export default Footer;
