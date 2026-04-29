import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { Lock, Mail, User as UserIcon, LogIn } from "lucide-react";

export function AdminSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "Erreur lors de la création du compte");
        setLoading(false);
        return;
      }

      // Redirect to login page
      alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
      navigate("/admin/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Une erreur est survenue lors de la création du compte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Créer un Compte Admin
            </h1>
            <p className="text-slate-600">
              Configuration du back office Val de Loire VI
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Minimum 6 caractères
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Création en cours...</>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Créer mon compte
                </>
              )}
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Vous avez déjà un compte ?{" "}
              <Link
                to="/admin/login"
                className="text-red-700 hover:text-red-800 font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
