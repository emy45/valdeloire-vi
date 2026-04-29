import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, User, ArrowRight, Loader } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info.tsx";
import { ArticleImage } from "../components/ArticleImage";

export function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/rest/v1/articles?select=*&order=created_at.desc`,
          {
            headers: {
              apikey: publicAnonKey,
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Impossible de charger les articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Actualités
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Conseils d'experts, actualités DAF et informations sur l'entretien de vos poids lourds
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <Loader className="w-12 h-12 animate-spin text-[#001e40] mx-auto mb-4" />
              <p className="text-slate-600">Chargement des articles...</p>
            </div>
          ) : error ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
              <p className="text-amber-800 font-medium mb-2">⚠️ {error}</p>
              <p className="text-amber-700 text-sm">Veuillez vérifier la configuration Supabase</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">Aucun article disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-red-700 transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <ArticleImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-700 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-red-700 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-medium"
                  >
                    Lire l'article
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </article>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Restez Informé
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Recevez nos derniers conseils et actualités directement dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            />
            <button className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium">
              S'abonner
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Pas de spam, désinscription possible à tout moment
          </p>
        </div>
      </section>
    </div>
  );
}