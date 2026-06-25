import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Phone, Zap } from "lucide-react";

const Register = () => {
  const [show, setShow] = useState(false);

  return (
    <div data-testid="register-page" className="min-h-[80vh] grid lg:grid-cols-2">
      {/* Visual side */}
      <div className="hidden lg:flex relative bg-[#0A0A0A] text-white items-center justify-center overflow-hidden p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,122,255,0.3),_transparent_60%)]" />
        <div className="relative max-w-md">
          <Zap size={32} className="text-[#007AFF] mb-6" />
          <h2 className="font-display text-4xl font-semibold tracking-tighter leading-tight">
            Bergabung dengan 50K+ pelanggan setia Mr.3Gadget.
          </h2>
          <p className="mt-4 text-white/60">
            Dapatkan voucher Rp 100.000 untuk pesanan pertama Anda.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/70">
            <li>✓ Riwayat pesanan terpusat</li>
            <li>✓ Wishlist & rekomendasi personal</li>
            <li>✓ Akses lebih dulu ke koleksi terbaru</li>
            <li>✓ Cashback eksklusif member</li>
          </ul>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center">
              <span className="font-display text-white font-bold text-lg">M</span>
            </div>
            <span className="font-display font-bold text-lg">
              Mr.<span className="text-[#007AFF]">3Gadget</span>
            </span>
          </Link>
          <div className="text-xs uppercase tracking-[0.25em] text-[#007AFF] font-semibold mb-3">
            Mulai Sekarang
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tighter text-[#1D1D1F] mb-3">
            Buat akun baru
          </h1>
          <p className="text-[#86868B] mb-8">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-[#007AFF] font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
            data-testid="register-form"
          >
            <Field label="Nama Lengkap" icon={User}>
              <input
                type="text"
                required
                data-testid="reg-name"
                placeholder="Andre Wijaya"
                className="w-full bg-[#F5F5F7] focus:bg-white focus:ring-2 focus:ring-[#007AFF]/30 rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all"
              />
            </Field>
            <Field label="Email" icon={Mail}>
              <input
                type="email"
                required
                data-testid="reg-email"
                placeholder="email@anda.com"
                className="w-full bg-[#F5F5F7] focus:bg-white focus:ring-2 focus:ring-[#007AFF]/30 rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all"
              />
            </Field>
            <Field label="Nomor HP" icon={Phone}>
              <input
                type="tel"
                required
                data-testid="reg-phone"
                placeholder="0812-3456-7890"
                className="w-full bg-[#F5F5F7] focus:bg-white focus:ring-2 focus:ring-[#007AFF]/30 rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all"
              />
            </Field>
            <Field label="Kata Sandi" icon={Lock}>
              <input
                type={show ? "text" : "password"}
                required
                data-testid="reg-password"
                placeholder="Min. 8 karakter"
                className="w-full bg-[#F5F5F7] focus:bg-white focus:ring-2 focus:ring-[#007AFF]/30 rounded-xl pl-11 pr-12 py-3.5 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                data-testid="reg-toggle-password"
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-3 text-[#86868B] hover:text-[#1D1D1F]"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </Field>

            <label className="flex items-start gap-2 text-sm text-[#86868B]">
              <input
                type="checkbox"
                required
                className="accent-[#007AFF] mt-1"
                data-testid="reg-tos"
              />
              <span>
                Saya setuju dengan{" "}
                <a href="#" className="text-[#007AFF]">Syarat & Ketentuan</a> serta{" "}
                <a href="#" className="text-[#007AFF]">Kebijakan Privasi</a>.
              </span>
            </label>

            <button
              type="submit"
              data-testid="register-submit"
              className="w-full bg-[#007AFF] hover:bg-[#005BB5] text-white rounded-full py-3.5 font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              Buat Akun <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, icon: Icon, children }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-[0.15em] text-[#86868B] font-semibold mb-1.5">
      {label}
    </span>
    <div className="relative">
      <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" />
      {children}
    </div>
  </label>
);

export default Register;