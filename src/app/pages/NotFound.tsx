import { Link } from "react-router";
import { AlertTriangle, Home } from "lucide-react";
import { Seo } from "../components/Seo";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Seo
        title="Page introuvable"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        noindex
      />
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Page introuvable
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
