import { Link, useLocation } from "react-router";
import { Menu, Phone, X, Wrench } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "figma:asset/2748cb561f58da106cd64170a4b44448096e540e.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup au démontage
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/blog") {
      return location.pathname.startsWith("/blog");
    }
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="VAL DE LOIRE V.I" className="h-16" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-[#001e40]"
                  : "text-slate-600 hover:text-[#001e40]"
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors ${
                isActive("/services")
                  ? "text-[#001e40]"
                  : "text-slate-600 hover:text-[#001e40]"
              }`}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${
                isActive("/blog")
                  ? "text-[#001e40]"
                  : "text-slate-600 hover:text-[#001e40]"
              }`}
            >
              Actus
            </Link>
            <Link
              to="/nous-rejoindre"
              className={`text-sm font-medium transition-colors ${
                isActive("/nous-rejoindre")
                  ? "text-[#001e40]"
                  : "text-slate-600 hover:text-[#001e40]"
              }`}
            >
              Nous rejoindre
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "text-[#001e40]"
                  : "text-slate-600 hover:text-[#001e40]"
              }`}
            >
              Contact
            </Link>
            <a
              href="tel:0031402143000"
              className="flex items-center gap-2 bg-yellow-400 text-slate-900 px-6 py-2.5 rounded-lg hover:bg-yellow-500 transition-colors border-2 border-yellow-400 animate-pulse justify-center"
            >
              <Wrench className="w-5 h-5" />
              <span className="font-bold">ASSISTANCE</span>
            </a>
            <a
              href="tel:0254502929"
              className="flex items-center gap-2 bg-[#001e40] text-white px-6 py-2.5 rounded-lg hover:bg-[#001429] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>02 54 50 29 29</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/") ? "text-[#001e40]" : "text-slate-600"
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/services"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/services") ? "text-[#001e40]" : "text-slate-600"
                }`}
              >
                Services
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/blog") ? "text-[#001e40]" : "text-slate-600"
                }`}
              >
                Actus
              </Link>
              <Link
                to="/nous-rejoindre"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/nous-rejoindre") ? "text-[#001e40]" : "text-slate-600"
                }`}
              >
                Nous rejoindre
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/contact") ? "text-[#001e40]" : "text-slate-600"
                }`}
              >
                Contact
              </Link>
              <a
                href="tel:0031402143000"
                className="flex items-center gap-2 bg-yellow-400 text-slate-900 px-6 py-2.5 rounded-lg hover:bg-yellow-500 transition-colors border-2 border-yellow-400 animate-pulse justify-center"
              >
                <Wrench className="w-5 h-5" />
                <span className="font-bold">ASSISTANCE</span>
              </a>
              <a
                href="tel:0254502929"
                className="flex items-center gap-2 bg-[#001e40] text-white px-6 py-2.5 rounded-lg hover:bg-[#001429] transition-colors justify-center"
              >
                <Phone className="w-4 h-4" />
                <span>02 54 50 29 29</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}