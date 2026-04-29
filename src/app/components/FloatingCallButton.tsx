import { Phone } from "lucide-react";

export function FloatingCallButton() {
  return (
    <a
      href="tel:0254502929"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-[#001e40] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-[#001429] hover:scale-110 transition-all duration-300 group"
      aria-label="Appeler VAL DE LOIRE V.I"
    >
      <Phone className="w-6 h-6 md:w-7 md:h-7 group-hover:animate-pulse" />
      
      {/* Tooltip - Hidden on mobile, visible on desktop */}
      <span className="hidden md:block absolute right-full mr-3 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        02 54 50 29 29
      </span>
      
      {/* Pulsing ring effect */}
      <span className="absolute inset-0 rounded-full bg-[#001e40] animate-ping opacity-20"></span>
    </a>
  );
}