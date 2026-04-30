import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Calendar, User, ArrowLeft, Phone, Loader } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { ArticleImage } from "../components/ArticleImage";
import { Seo } from "../components/Seo";

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
  publishedAt: string;
  authorName: string;
  published: boolean;
}

export function BlogArticleDynamic() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
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
      
      // Check if article is published
      if (!data.article.published) {
        setError("Cet article n'est pas encore publié");
        setLoading(false);
        return;
      }

      setArticle(data.article);
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Article introuvable");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-red-700 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-lg text-slate-600 mb-8">
            {error || "Article introuvable"}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Seo
        title={article.title}
        description={article.metaDescription || article.excerpt}
        path={`/blog/${article.slug}`}
        image={article.image}
        type="article"
        publishedAt={article.publishedAt}
        author={article.authorName}
      />
      {/* Breadcrumb */}
      <section className="bg-slate-50 py-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-600 hover:text-red-700">
              Accueil
            </Link>
            <span className="text-slate-400">/</span>
            <Link to="/blog" className="text-slate-600 hover:text-red-700">
              Blog
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium truncate max-w-xs">
              {article.title}
            </span>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-medium mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux articles
          </Link>

          <div className="mb-6">
            <span className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-slate-600 mb-8 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{article.authorName}</span>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="mb-12">
              <ArticleImage
                src={article.image}
                alt={article.title}
                className="w-full object-contain rounded-2xl"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* CTA Section */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-bold mb-4">
              Besoin d'un Service pour Votre Poids Lourd ?
            </h3>
            <p className="text-slate-300 mb-6">
              Confiez votre véhicule à nos experts. Agent DAF officiel à Blois,
              pièces d'origine et techniciens qualifiés garantis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors font-medium"
              >
                Demander un devis
              </Link>
              <a
                href="tel:0254502929"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                02 54 50 29 29
              </a>
            </div>
          </div>

          {/* Share & Back */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour aux articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}