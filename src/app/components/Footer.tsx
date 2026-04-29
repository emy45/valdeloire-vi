import { MapPin, Phone, Mail, Clock, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">VAL DE LOIRE V.I</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              Votre partenaire de confiance pour l'entretien et la réparation de poids lourds et utilitaires. Agent DAF officiel.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Contact</h3>
            <div className="space-y-2 md:space-y-3">
              <a
                href="tel:0254502929"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs md:text-sm"
              >
                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                <span>02 54 50 29 29</span>
              </a>
              <a
                href="mailto:contact@valdeloirevi.fr"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs md:text-sm break-all"
              >
                <Mail className="w-3 h-3 md:w-4 md:h-4" />
                <span>contact@valdeloirevi.fr</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400 text-xs md:text-sm">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>10 Rue des Champs de Fossé</p>
                  <p>41330 FOSSÉ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Horaires</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start gap-2 text-slate-400 text-xs md:text-sm">
                <Clock className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Lun - Ven : 8h-12h et 14h-18h</p>
                  <p className="mt-1">Sam : 8h-12h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Navigation</h3>
            <div className="space-y-2 md:space-y-3">
              <Link
                to="/"
                className="block text-slate-400 hover:text-white transition-colors text-xs md:text-sm"
              >
                Accueil
              </Link>
              <Link
                to="/services"
                className="block text-slate-400 hover:text-white transition-colors text-xs md:text-sm"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="block text-slate-400 hover:text-white transition-colors text-xs md:text-sm"
              >
                Contact
              </Link>
              <Link
                to="/blog"
                className="block text-slate-400 hover:text-white transition-colors text-xs md:text-sm"
              >
                Actus
              </Link>
              <a
                href="https://dafwebshop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-xs md:text-sm font-medium"
              >
                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                DAF WEB SHOP
              </a>
              <Link
                to="/cgv"
                className="block text-slate-400 hover:text-white transition-colors text-xs md:text-sm"
              >
                CGV
              </Link>
              <Link
                to="/mentions-legales"
                className="block text-slate-400 hover:text-white transition-colors text-xs md:text-sm"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-slate-400 text-xs md:text-sm">
          <p>
            © 2026 VAL DE LOIRE V.I - Tous droits réservés - création{" "}
            <a
              href="https://www.emy-com.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              www.emy-com.fr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}