import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, ArrowRight, Loader } from "lucide-react";

import { projectId, publicAnonKey } from "/utils/supabase/info";
import { ArticleImage } from "../components/ArticleImage";
import { Seo } from "../components/Seo";
import heroImage from "figma:asset/ebfb8a4ba7d89ab780b2f03a4944d4dbf2be77e1.png";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
  authorName: string;
  published: boolean;
}

export function BlogDynamic() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      // Filter only published articles
      const publishedArticles = (data.articles || []).filter(
        (article: Article) => article.published
      );
      setArticles(publishedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div>
      <Seo
        title="Actualités et conseils poids lourds — Blog"
        description="Conseils d'experts, actualités DAF et informations sur l'entretien de vos poids lourds. Le blog de VAL DE LOIRE V.I, agent DAF officiel à Blois."
        path="/blog"
      />
      {/* Hero Section */}
      <section
        className="relative bg-[#001e40] text-white py-16 md:py-20 overflow-hidden"
      >
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: 'center 30%'
          }}
        ></div>
        
        {/* Dark overlay with tramage effect */}
        <div className="absolute inset-0 bg-[#001e40]/80"></div>
        
        {/* Dotted pattern overlay for tramage effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Actualités
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            Conseils d'experts, actualités DAF et informations sur l'entretien
            de vos poids lourds
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <Loader className="w-12 h-12 text-[#001e40] animate-spin mx-auto mb-4" />
              <p className="text-slate-600">Chargement des articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">
                Aucun article publié pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-[#001e40] transition-all group block"
                >
                  {article.image && (
                    <div className="overflow-hidden h-48">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#001e40] text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-[#001e40] transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-[#001e40] text-sm font-medium">
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
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
            Recevez nos derniers conseils et actualités directement dans votre
            boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001e40]"
            />
            <button className="bg-[#001e40] text-white px-6 py-3 rounded-lg hover:bg-[#001429] transition-colors font-medium">
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