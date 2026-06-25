import { Smartphone, Laptop, Watch, Headphones, Package } from "lucide-react";

const ICONS = {
  smartphone: Smartphone,
  laptop: Laptop,
  smartwatch: Watch,
  aksesoris: Headphones,
};

// Placeholder gradient block with category icon

export const ProductImage = ({
  category,
  size = "md",
  label,
  className = "",
  showLabel = false,
  tone,
}) => {
  const Icon = ICONS[category] || Package;
  const iconSizes = { sm: 28, md: 44, lg: 72, xl: 120 };

  const toneClasses =
    tone === "dark"
      ? "bg-gradient-to-br from-[#1D1D1F] via-[#2C2C2E] to-[#0A0A0A] text-white/40"
      : "bg-gradient-to-br from-[#F5F5F7] via-[#EFEFF1] to-[#E5E5EA] text-[#86868B]";

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${toneClasses} ${className}`}
      aria-label={label || `${category} placeholder`}
      data-testid={`product-image-${category}`}
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Icon
        size={iconSizes[size]}
        strokeWidth={1.25}
        className="opacity-60 transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {showLabel && label && (
        <span className="mt-3 text-[10px] uppercase tracking-[0.25em] opacity-60 px-3 text-center line-clamp-1">
          {label}
        </span>
      )}
    </div>
  );
};

export default ProductImage;
