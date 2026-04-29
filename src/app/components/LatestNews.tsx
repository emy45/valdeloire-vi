import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, User, ArrowRight, Loader, Newspaper, Facebook } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { ArticleImage } from "./ArticleImage";
import defaultArticleImage from "figma:asset/91f26ac0d5ac66e90a0ad38c8d9e6146bcdddc0c.png";

interface Article {
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
  authorName?: string;
  published?: boolean;
  url?: string;
  source?: string;
}

export function LatestNews() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestContent();
  }, []);

  const fetchLatestContent = async () => {
    try {
      // Fetch both articles and Facebook posts in parallel
      const [articlesResponse, facebookResponse] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/facebook-posts`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        )
      ]);

      const articlesData = await articlesResponse.json();
      const facebookData = await facebookResponse.json();

      // Combine articles and Facebook posts
      const publishedArticles = (articlesData.articles || [])
        .filter((article: Article) => article.published)
        .map((article: Article) => ({ ...article, source: 'blog' }));
      
      const facebookPosts = (facebookData.posts || [])
        .map((post: Article) => ({ ...post, source: 'facebook' }));

      // Merge and sort by date, take the 6 most recent
      const allItems = [...publishedArticles, ...facebookPosts]
        .sort((a: Article, b: Article) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        .slice(0, 6);
      
      setItems(allItems);
    } catch (error) {
      console.error("Error fetching latest content:", error);
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

  // Don't render the section if no items
  if (!loading && items.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-7 h-7 md:w-8 md:h-8 text-[#001e40]" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Nos dernières actualités
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Restez informé de nos dernières nouveautés, conseils d'experts et actualités du secteur
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader className="w-10 h-10 text-[#001e40] animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Chargement des actualités...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {items.map((item, index) => (
                <article
                  key={item.slug || item.url || index}
                  className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-[#001e40] transition-all group"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={defaultArticleImage}
                      alt="Garage VAL DE LOIRE V.I"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      key="article-image-default"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-[#001e40] text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-1">
                        {item.source === 'facebook' && <Facebook className="w-3 h-3" />}
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{formatDate(item.publishedAt)}</span>
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-[#001e40] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                    {item.source === 'facebook' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#001e40] hover:text-[#001429] font-medium text-sm md:text-base"
                      >
                        Voir sur Facebook
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        to={`/blog/${item.slug}`}
                        className="inline-flex items-center gap-2 text-[#001e40] hover:text-[#001429] font-medium text-sm md:text-base"
                      >
                        Lire l'article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8 md:mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-[#001e40] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#001429] transition-colors font-medium text-base md:text-lg"
              >
                Voir toutes les actualités
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}