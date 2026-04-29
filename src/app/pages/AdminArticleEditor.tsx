import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import {
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Loader,
  Eye,
  CheckCircle,
} from "lucide-react";

export function AdminArticleEditor() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditing = slug && slug !== "new";

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (isEditing) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Article non trouvé");
      }

      const data = await response.json();
      setFormData({
        title: data.article.title,
        slug: data.article.slug,
        excerpt: data.article.excerpt,
        content: data.article.content,
        category: data.article.category,
        image: data.article.image,
        metaDescription: data.article.metaDescription,
        keywords: data.article.keywords,
        published: data.article.published,
        publishedAt: data.article.publishedAt.split("T")[0],
      });
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Impossible de charger l'article");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError("");

    try {
      const token = sessionStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/upload-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
      setSuccess("Image uploadée avec succès !");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Erreur lors de l'upload de l'image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const token = sessionStorage.getItem("admin_token");

    try {
      const url = isEditing
        ? `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles/${slug}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la sauvegarde");
      }

      setSuccess(
        isEditing
          ? "Article mis à jour avec succès !"
          : "Article créé avec succès !"
      );
      
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (error: any) {
      console.error("Error saving article:", error);
      setError(error.message || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="flex items-center gap-2 text-slate-600 hover:text-red-700"
              >
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

      {/* Messages */}
      {error && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {success && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {success}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Titre de l'article *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 text-lg font-medium"
                placeholder="Ex: 5 Conseils pour l'Entretien de Votre Camion DAF"
                required
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                URL (slug) *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="5-conseils-entretien-camion-daf"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                L'URL ne peut pas être modifiée après la création
              </p>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Extrait (résumé) *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 min-h-[100px]"
                placeholder="Un court résumé de votre article (160-200 caractères recommandés)"
                required
              />
              <p className="text-xs text-slate-500 mt-2">
                {formData.excerpt.length} caractères
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contenu de l'article *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 min-h-[400px] font-mono text-sm"
                placeholder="Rédigez votre article ici... Vous pouvez utiliser du texte brut ou du HTML."
                required
              />
              <p className="text-xs text-slate-500 mt-2">
                Conseil : Utilisez des balises HTML pour structurer votre contenu
                (h2, h3, p, ul, li, strong, etc.)
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Publication</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date de publication
                </label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      publishedAt: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      published: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 text-red-700 border-slate-300 rounded focus:ring-red-700"
                />
                <span className="text-sm font-medium text-slate-700">
                  Publier l'article
                </span>
              </label>
              <p className="text-xs text-slate-500 mt-2">
                L'article sera visible sur le site public
              </p>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              >
                <option value="Conseils">Conseils</option>
                <option value="Services">Services</option>
                <option value="Actualités">Actualités</option>
                <option value="DAF">DAF</option>
                <option value="Technique">Technique</option>
              </select>
            </div>

            {/* Image */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Image à la une
              </label>
              
              {formData.image && (
                <div className="mb-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-red-700 transition-colors ${
                    uploadingImage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {uploadingImage ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Upload en cours...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      {formData.image ? "Changer l'image" : "Ajouter une image"}
                    </>
                  )}
                </label>
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Format recommandé : 1200x630px (JPG ou PNG)
              </p>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">SEO</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Meta description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      metaDescription: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 min-h-[80px] text-sm"
                  placeholder="Description pour les moteurs de recherche (150-160 caractères)"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {formData.metaDescription.length} / 160 caractères
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mots-clés
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, keywords: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 text-sm"
                  placeholder="Ex: DAF, poids lourds, entretien, Blois"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Séparez les mots-clés par des virgules
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {saving ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isEditing ? "Mettre à jour" : "Créer l'article"}
                  </>
                )}
              </button>

              {formData.published && formData.slug && (
                <Link
                  to={`/blog/${formData.slug}`}
                  target="_blank"
                  className="w-full border-2 border-slate-300 text-slate-700 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Prévisualiser
                </Link>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
