import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { MediaLibraryModal } from "../components/admin/MediaLibraryModal";

export function AdminMediaLibrary() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-2 text-slate-600 hover:text-[#001e40] text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au dashboard
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Médiathèque</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <MediaLibraryModal isOpen={true} onClose={() => {}} />
        </div>
      </div>
    </div>
  );
}
