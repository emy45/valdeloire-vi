import { Link } from "react-router";
import { Calendar, User, ArrowLeft, Phone, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Seo } from "../components/Seo";

export function BlogArticle1() {
  return (
    <div>
      <Seo
        title="Entretien des poids lourds DAF : 5 conseils essentiels"
        description="5 conseils d'experts pour entretenir votre camion DAF et prolonger sa durée de vie. Conseils d'un agent DAF officiel à Blois (41)."
        path="/blog/entretien-poids-lourds-daf-conseils"
        type="article"
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
            <span className="text-slate-900 font-medium">
              Conseils d'entretien
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
              Conseils
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            5 Conseils Essentiels pour l'Entretien de Votre Poids Lourd DAF
          </h1>

          <div className="flex items-center gap-6 text-slate-600 mb-8 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>10 mars 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Équipe VAL DE LOIRE V.I</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1655345391294-0fe2f61dff59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMG1haW50ZW5hbmNlJTIwd29ya3Nob3B8ZW58MXx8fHwxNzczMTAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Entretien poids lourd DAF"
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Un poids lourd bien entretenu, c'est la garantie d'une longévité optimale, d'une consommation réduite et d'une sécurité maximale sur la route. En tant qu'agent DAF officiel à Blois, Val de Loire VI partage avec vous 5 conseils essentiels pour maintenir votre camion en parfait état.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              1. Respectez les Intervalles de Révision DAF
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Les camions DAF sont conçus avec des intervalles de maintenance spécifiques. Respecter ces échéances est crucial pour maintenir la garantie constructeur et assurer le bon fonctionnement de votre véhicule. Nos techniciens certifiés DAF suivent scrupuleusement le plan d'entretien préconisé par le constructeur.
            </p>
            <div className="bg-red-50 border-l-4 border-red-700 p-6 my-8 rounded-r-lg">
              <p className="text-slate-800 font-medium">
                💡 <strong>Conseil d'expert :</strong> Tenez un carnet d'entretien à jour. Cela facilite le suivi et valorise votre véhicule en cas de revente.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              2. Surveillez les Niveaux et les Fluides
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Le contrôle régulier des niveaux d'huile, de liquide de refroidissement, de liquide de frein et d'AdBlue est indispensable. Un niveau insuffisant peut entraîner des dommages coûteux au moteur ou aux systèmes hydrauliques. Chez Val de Loire VI, nous utilisons exclusivement des fluides conformes aux spécifications DAF.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
              <li>Huile moteur : vérification hebdomadaire recommandée</li>
              <li>Liquide de refroidissement : contrôle avant chaque long trajet</li>
              <li>AdBlue : niveau minimum de 10% pour éviter le blocage moteur</li>
              <li>Liquide de frein : inspection mensuelle</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              3. Pneumatiques : Pression et Usure
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Des pneumatiques correctement gonflés réduisent la consommation de carburant et améliorent la tenue de route. Vérifiez la pression à froid au moins une fois par semaine et inspectez visuellement l'usure de la bande de roulement. La profondeur minimale légale est de 1,6 mm, mais nous recommandons un changement dès 3 mm pour une sécurité optimale.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              4. Diagnostic Électronique Régulier
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Les camions DAF modernes sont équipés de systèmes électroniques sophistiqués. Un diagnostic régulier permet de détecter les anomalies avant qu'elles ne deviennent critiques. Notre atelier dispose des outils de diagnostic DAF Connect pour une analyse complète de tous les systèmes embarqués.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              5. Nettoyage et Protection
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Un camion propre, c'est aussi un camion protégé. Le lavage régulier élimine les résidus corrosifs (sel, boue, produits chimiques) qui peuvent endommager la carrosserie et le châssis. N'oubliez pas de nettoyer également le compartiment moteur et les dessous de caisse, particulièrement en période hivernale.
            </p>

            <div className="bg-slate-900 text-white p-8 rounded-2xl my-12">
              <h3 className="text-2xl font-bold mb-4">
                Besoin d'un Entretien pour Votre DAF ?
              </h3>
              <p className="text-slate-300 mb-6">
                Confiez votre poids lourd à nos experts certifiés DAF. Pièces d'origine, techniciens qualifiés et service de qualité garantis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors font-medium"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
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

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              L'entretien régulier de votre poids lourd DAF est un investissement rentable qui prolonge la durée de vie de votre véhicule, réduit les coûts d'exploitation et garantit votre sécurité. En tant qu'agent DAF officiel, Val de Loire VI dispose de l'expertise et des équipements nécessaires pour assurer un service de qualité supérieure.
            </p>
            <p className="text-slate-700 leading-relaxed">
              N'attendez pas qu'un problème survienne : adoptez une approche préventive et planifiez dès maintenant votre prochaine révision avec nos équipes à Blois.
            </p>
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

      {/* Related Articles */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Articles Connexes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              to="/blog/depannage-24-7-pourquoi-essentiel"
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-red-700 transition-all"
            >
              <span className="text-sm text-red-700 font-medium">Services</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">
                Dépannage 24/7 : Pourquoi C'est Essentiel pour Votre Activité
              </h3>
              <p className="text-slate-600 text-sm">
                Un poids lourd immobilisé coûte cher à votre entreprise...
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}