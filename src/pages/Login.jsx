import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Mail, Lock, Zap } from "lucide-react";

const Login = () => {
  const [show, setShow] = useState(false);

  return (
    <div data-testid="login-page" className="min-h-[80vh] grid lg:grid-cols-2">
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
            Selamat Datang Kembali
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tighter text-[#1D1D1F] mb-3">
            Masuk ke akun Anda
          </h1>
          <p className="text-[#86868B] mb-8">
            Belum punya akun?{" "}
            <Link to="/register" className="text-[#007AFF] font-medium hover:underline">
              Daftar sekarang
            </Link>
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
            data-testid="login-form"
          >
            <Field label="Email" icon={Mail}>
              <input
                type="email"
                required
                data-testid="login-email"
                placeholder="email@anda.com"
                className="w-full bg-[#F5F5F7] focus:bg-white focus:ring-2 focus:ring-[#007AFF]/30 rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all text-[#1D1D1F]"
              />
            </Field>
            <Field label="Kata Sandi" icon={Lock}>
              <input
                type={show ? "text" : "password"}
                required
                data-testid="login-password"
                placeholder="••••••••"
                className="w-full bg-[#F5F5F7] focus:bg-white focus:ring-2 focus:ring-[#007AFF]/30 rounded-xl pl-11 pr-12 py-3.5 outline-none transition-all text-[#1D1D1F]"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                data-testid="toggle-password"
                aria-label="Toggle password"
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-3 text-[#86868B] hover:text-[#1D1D1F]"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </Field>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-[#1D1D1F]">
                <input
                  type="checkbox"
                  className="accent-[#007AFF]"
                  data-testid="remember-me"
                />
                Ingat saya
              </label>
              <a href="#" className="text-[#007AFF] hover:underline">
                Lupa kata sandi?
              </a>
            </div>

            <button
              type="submit"
              data-testid="login-submit"
              className="w-full bg-[#1D1D1F] hover:bg-[#007AFF] text-white rounded-full py-3.5 font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              Masuk <ArrowRight size={14} />
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E5E5EA]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#86868B] tracking-[0.2em]">
                  atau
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                data-testid="login-google"
                className="bg-[#F5F5F7] hover:bg-[#E5E5EA] rounded-full py-3 text-sm font-medium"
              >
                Google
              </button>
              <button
                type="button"
                data-testid="login-apple"
                className="bg-[#F5F5F7] hover:bg-[#E5E5EA] rounded-full py-3 text-sm font-medium"
              >
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Visual side */}
      <div className="hidden lg:flex relative bg-[#0A0A0A] text-white items-center justify-center overflow-hidden p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,122,255,0.3),_transparent_60%)]" />
        <div className="relative max-w-md">
          <Zap size={32} className="text-[#007AFF] mb-6" />
          <h2 className="font-display text-4xl font-semibold tracking-tighter leading-tight">
            Akses lebih cepat ke gadget impian Anda.
          </h2>
          <p className="mt-4 text-white/60">
            Riwayat pesanan, wishlist, dan rekomendasi yang dipersonalisasi hanya untuk Anda.
          </p>
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

export default Login;