import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { getSupabaseClient } from "/utils/supabase/client";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  FileText,
  Eye,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { ArticleImage } from "../components/ArticleImage";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  metaDescription: string;
  keywords: string;
  published: boolean;
  publishedAt: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const supabase = getSupabaseClient();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    const token = sessionStorage.getItem("admin_token");
    const userStr = sessionStorage.getItem("admin_user");

    if (!token || !userStr) {
      navigate("/admin/login");
      return;
    }

    setUser(JSON.parse(userStr));
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return;
    }

    const token = sessionStorage.getItem("admin_token");

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles/${slug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete article");
      }

      // Refresh articles list
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Erreur lors de la suppression de l'article");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_user");
    navigate("/admin/login");
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Administration Blog
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Bienvenue, {user?.user_metadata?.name || user?.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-slate-600 hover:text-red-700 text-sm font-medium"
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Voir le site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-red-700 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Articles</p>
                <p className="text-3xl font-bold text-slate-900">
                  {articles.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Publiés</p>
                <p className="text-3xl font-bold text-slate-900">
                  {articles.filter((a) => a.published).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Brouillons</p>
                <p className="text-3xl font-bold text-slate-900">
                  {articles.filter((a) => !a.published).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Mes Articles</h2>
          <Link
            to="/admin/article/new"
            className="flex items-center gap-2 bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Nouvel Article
          </Link>
        </div>

        {/* Articles List */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Aucun article
            </h3>
            <p className="text-slate-600 mb-6">
              Commencez par créer votre premier article de blog
            </p>
            <Link
              to="/admin/article/new"
              className="inline-flex items-center gap-2 bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Créer un article
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Titre
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Catégorie
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Statut
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {article.image && (
                          <ArticleImage
                            src={article.image}
                            alt={article.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="font-medium text-slate-900">
                            {article.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            /{article.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {article.published ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Publié
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          Brouillon
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.publishedAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {article.published && (
                          <Link
                            to={`/blog/${article.slug}`}
                            target="_blank"
                            className="p-2 text-slate-600 hover:text-red-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Voir l'article"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          to={`/admin/article/${article.slug}`}
                          className="p-2 text-slate-600 hover:text-red-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.slug)}
                          className="p-2 text-slate-600 hover:text-red-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}