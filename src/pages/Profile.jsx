import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Edit3,
  ChevronRight,
} from "lucide-react";
import { dummyOrders, formatRupiah } from "@/data/products";
import { useShop } from "@/context/ShopContext";

const TABS = [
  { id: "orders", label: "Pesanan", icon: Package },
  { id: "profile", label: "Profil", icon: User },
  { id: "address", label: "Alamat", icon: MapPin },
  { id: "settings", label: "Pengaturan", icon: Settings },
];

const STATUS_COLOR = {
  Selesai: "bg-[#34C759]/10 text-[#34C759]",
  Dikirim: "bg-[#007AFF]/10 text-[#007AFF]",
  Diproses: "bg-[#FFB800]/10 text-[#B8860B]",
};

const Profile = () => {
  const [tab, setTab] = useState("orders");
  const { wishlist } = useShop();

  return (
    <div data-testid="profile-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
        Akun Saya
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tighter text-[#1D1D1F]">
        Halo, Andre 👋
      </h1>
      <p className="text-[#86868B] mt-2">Kelola pesanan, profil, dan preferensi Anda.</p>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 mt-10">
        {/* Sidebar */}
        <aside data-testid="profile-sidebar" className="space-y-2">
          <div className="bg-[#F5F5F7] rounded-3xl p-5 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center font-display text-lg font-semibold">
                AW
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#1D1D1F] truncate">Andre Wijaya</div>
                <div className="text-xs text-[#86868B] truncate">andre@example.com</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#E5E5EA] text-center">
              <Stat label="Pesanan" value={dummyOrders.length} />
              <Stat label="Wishlist" value={wishlist.length} />
              <Stat label="Poin" value="2.4K" />
            </div>
          </div>

          {TABS.map((t) => (
            <button
              key={t.id}
              data-testid={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-[#1D1D1F] text-white"
                  : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
          <Link
            to="/wishlist"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F5F5F7]"
          >
            <Heart size={16} /> Wishlist
          </Link>
          <button
            data-testid="logout-btn"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-[#FF3B30] hover:bg-[#FF3B30]/10"
          >
            <LogOut size={16} /> Keluar
          </button>
        </aside>

        {/* Content */}
        <div>
          {/* Tab: Orders */}
          {tab === "orders" && (
            <div data-testid="orders-tab">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold">Riwayat Pesanan</h2>
                <div className="text-sm text-[#86868B]">{dummyOrders.length} pesanan</div>
              </div>
              <div className="space-y-4">
                {dummyOrders.map((o) => (
                  <div
                    key={o.id}
                    data-testid={`order-${o.id}`}
                    className="bg-white border border-[#E5E5EA] rounded-3xl p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.15em] text-[#86868B] font-semibold">
                          Order ID
                        </div>
                        <div className="font-mono text-sm text-[#1D1D1F]">{o.id}</div>
                        <div className="text-xs text-[#86868B] mt-1">{o.date}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[o.status]}`}>
                        {o.status}
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E5E5EA]">
                      <ul className="text-sm text-[#1D1D1F] space-y-1.5">
                        {o.items.map((it) => (
                          <li key={it.id} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#86868B]" />
                            <span>
                              {it.name} <span className="text-[#86868B]">×{it.qty}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E5E5EA] flex flex-wrap items-center justify-between gap-3">
                      <div className="font-display text-xl font-bold text-[#1D1D1F]">
                        {formatRupiah(o.total)}
                      </div>
                      <button className="inline-flex items-center gap-1 text-sm font-medium text-[#007AFF] hover:underline">
                        Lihat detail <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Profile */}
          {tab === "profile" && (
            <div data-testid="profile-tab" className="bg-white border border-[#E5E5EA] rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold">Informasi Profil</h2>
                <button data-testid="edit-profile" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#007AFF]">
                  <Edit3 size={14} /> Edit
                </button>
              </div>
              <form className="grid sm:grid-cols-2 gap-5">
                <Field label="Nama Lengkap" value="Andre Wijaya" testId="p-name" />
                <Field label="Email" value="andre@example.com" testId="p-email" />
                <Field label="Nomor HP" value="0812-3456-7890" testId="p-phone" />
                <Field label="Tanggal Lahir" value="14 Agustus 1995" testId="p-dob" />
                <div className="sm:col-span-2 flex justify-end gap-3 mt-3">
                  <button type="button" className="px-6 py-2.5 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-sm font-medium">
                    Batal
                  </button>
                  <button type="button" data-testid="save-profile" className="px-6 py-2.5 rounded-full bg-[#007AFF] hover:bg-[#005BB5] text-white text-sm font-medium">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab: Address */}
          {tab === "address" && (
            <div data-testid="address-tab" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-2xl font-semibold">Alamat Tersimpan</h2>
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-[#007AFF]">
                  + Tambah Alamat
                </button>
              </div>
              {[
                {
                  label: "Rumah",
                  primary: true,
                  address: "Jl. Sudirman Kav. 21, RT 03/RW 05, Jakarta Selatan, DKI Jakarta 12190",
                },
                {
                  label: "Kantor",
                  primary: false,
                  address: "Menara BCA Lt. 35, Jl. M.H. Thamrin No. 1, Jakarta Pusat 10310",
                },
              ].map((a, i) => (
                <div key={i} className="bg-white border border-[#E5E5EA] rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{a.label}</span>
                    {a.primary && (
                      <span className="px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[10px] font-semibold uppercase tracking-wider">
                        Utama
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#86868B] leading-relaxed">{a.address}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Settings */}
          {tab === "settings" && (
            <div data-testid="settings-tab" className="bg-white border border-[#E5E5EA] rounded-3xl p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-2xl font-semibold">Preferensi</h2>
              {[
                { t: "Notifikasi Email", d: "Promo, penawaran, dan update produk" },
                { t: "Notifikasi WhatsApp", d: "Update status pesanan via WA" },
                { t: "Newsletter Mingguan", d: "Tren tech terbaru langsung ke inbox" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#E5E5EA] last:border-0">
                  <div>
                    <div className="font-medium">{s.t}</div>
                    <div className="text-xs text-[#86868B]">{s.d}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={i !== 2}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E5EA] peer-checked:bg-[#007AFF] rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <div className="font-display font-bold text-[#1D1D1F]">{value}</div>
    <div className="text-[10px] uppercase tracking-wider text-[#86868B] mt-0.5">{label}</div>
  </div>
);

const Field = ({ label, value, testId }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-[0.15em] text-[#86868B] font-semibold mb-1.5">
      {label}
    </span>
    <input
      defaultValue={value}
      data-testid={testId}
      className="w-full bg-[#F5F5F7] focus:bg-white focus:ring-2 focus:ring-[#007AFF]/30 rounded-xl px-4 py-3 outline-none transition-all"
    />
  </label>
);

export default Profile;