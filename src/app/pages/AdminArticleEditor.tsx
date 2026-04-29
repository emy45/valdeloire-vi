import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { getSupabaseClient } from "/utils/supabase/client";
import { projectId } from "/utils/supabase/info";
import { Save, ArrowLeft, Image as ImageIcon, Loader, Eye, CheckCircle, X } from "lucide-react";
import { RichTextEditor } from "../components/admin/RichTextEditor";
import { MediaLibraryModal } from "../components/admin/MediaLibraryModal";

export function AdminArticleEditor() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditing = slug && slug !== "new";
  const supabase = getSupabaseClient();

  const [loading, setLoading] = useState(!!isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFeaturedImageModalOpen, setIsFeaturedImageModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Conseils",
    image: "",
    metaDescription: "",
    keywords: "",
    published: false,
    publishedAt: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }
      if (isEditing) fetchArticle(session.access_token);
    };
    checkAuth();
  }, [slug]);

  const fetchArticle = async (token: string) => {
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles/${slug}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Article non trouvé");
      const data = await res.json();
      const a = data.article;
      setFormData({
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        content: a.content,
        category: a.category,
        image: a.image,
        metaDescription: a.metaDescription || "",
        keywords: a.keywords || "",
        published: a.published,
        publishedAt: a.publishedAt.split("T")[0],
      });
    } catch {
      setError("Impossible de charger l'article");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }

    try {
      const url = isEditing
        ? `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles/${slug}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles`;

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la sauvegarde");
      }

      setSuccess(isEditing ? "Article mis à jour !" : "Article créé !");
      setTimeout(() => navigate("/admin"), 1200);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#001e40] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="flex items-center gap-2 text-slate-600 hover:text-[#001e40]">
                <ArrowLeft className="w-5 h-5" />
                Retour
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">
                {isEditing ? "Modifier l'article" : "Nouvel article"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Alerts */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
        </div>
      )}
      {success && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {success}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main content ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">Titre *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001e40] text-lg font-medium"
                placeholder="Ex : 5 conseils pour l'entretien de votre camion DAF"
                required
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">URL (slug) *</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm whitespace-nowrap">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001e40]"
                  placeholder="5-conseils-entretien-camion-daf"
                  required
                />
              </div>
              {isEditing && (
                <p className="text-xs text-amber-600 mt-2">⚠ Modifier le slug change l'URL publique de l'article</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">Extrait *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001e40] min-h-[100px]"
                placeholder="Un court résumé visible sur la liste des articles (160-200 car. recommandés)"
                required
              />
              <p className="text-xs text-slate-500 mt-1">{formData.excerpt.length} caractères</p>
            </div>

            {/* Content editor */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-3">Contenu *</label>
              <RichTextEditor
                value={formData.content}
                onChange={(html) => setFormData((p) => ({ ...p, content: html }))}
              />
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">

            {/* Publish */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Publication</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData((p) => ({ ...p, publishedAt: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001e40]"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300 accent-[#001e40]"
                />
                <span className="text-sm font-medium text-slate-700">Publier l'article</span>
              </label>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001e40]"
              >
                <option value="Conseils">Conseils</option>
                <option value="Services">Services</option>
                <option value="Actualités">Actualités</option>
                <option value="Événements">Événements</option>
                <option value="DAF">DAF</option>
                <option value="Technique">Technique</option>
              </select>
            </div>

            {/* Featured image */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3">Image à la une</h3>

              {formData.image ? (
                <div className="mb-3 relative group">
                  <img
                    src={formData.image}
                    alt="Image à la une"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, image: "" }))}
                    className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 transition-colors"
                    title="Supprimer l'image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setIsFeaturedImageModalOpen(true)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-[#001e40] transition-colors text-slate-600 hover:text-[#001e40]"
              >
                <ImageIcon className="w-5 h-5" />
                {formData.image ? "Changer l'image" : "Choisir depuis la médiathèque"}
              </button>
              <p className="text-xs text-slate-500 mt-2">Format recommandé : 1200×630 px (JPG / PNG)</p>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">SEO</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Meta description</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData((p) => ({ ...p, metaDescription: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001e40] min-h-[80px] text-sm"
                  placeholder="Description pour les moteurs de recherche (150-160 car.)"
                />
                <p className="text-xs text-slate-500 mt-1">{formData.metaDescription.length} / 160</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mots-clés</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData((p) => ({ ...p, keywords: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001e40] text-sm"
                  placeholder="DAF, poids lourds, entretien, Blois"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-3">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#001e40] text-white py-3 rounded-lg hover:bg-[#001429] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <><Loader className="w-5 h-5 animate-spin" /> Sauvegarde…</>
                ) : (
                  <><Save className="w-5 h-5" /> {isEditing ? "Mettre à jour" : "Créer l'article"}</>
                )}
              </button>

              {formData.published && formData.slug && (
                <Link
                  to={`/blog/${formData.slug}`}
                  target="_blank"
                  className="w-full border-2 border-slate-300 text-slate-700 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Voir l'article
                </Link>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Featured image picker modal */}
      <MediaLibraryModal
        isOpen={isFeaturedImageModalOpen}
        onClose={() => setIsFeaturedImageModalOpen(false)}
        onSelect={(url) => {
          setFormData((p) => ({ ...p, image: url }));
          setIsFeaturedImageModalOpen(false);
        }}
      />
    </div>
  );
}
