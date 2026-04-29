import { Link } from "react-router";
import { Calendar, User, ArrowLeft, Phone, ArrowRight, Clock, TrendingDown, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function BlogArticle2() {
  return (
    <div>
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
              Service dépannage
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
              Services
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Dépannage 24/7 : Pourquoi C'est Essentiel pour Votre Activité
          </h1>

          <div className="flex items-center gap-6 text-slate-600 mb-8 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>5 mars 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Équipe Val de Loire VI</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1770246783100-68418cb7493c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwdHJ1Y2slMjByb2FkJTIwc2VydmljZXxlbnwxfHx8fDE3NzMxNTgwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dépannage poids lourd 24/7"
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Dans le secteur du transport routier, chaque minute d'immobilisation représente une perte financière. Un service de dépannage disponible 24 heures sur 24, 7 jours sur 7 n'est pas un luxe, c'est une nécessité absolue pour la continuité de votre activité.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Le Coût Réel d'un Poids Lourd Immobilisé
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Lorsqu'un poids lourd tombe en panne, les coûts s'accumulent rapidement. Au-delà de la réparation elle-même, il faut considérer :
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
              <li><strong>La perte de chiffre d'affaires :</strong> Un camion à l'arrêt ne génère aucun revenu</li>
              <li><strong>Les pénalités de retard :</strong> Le non-respect des délais de livraison peut entraîner des sanctions contractuelles</li>
              <li><strong>L'image de marque :</strong> Les retards répétés peuvent nuire à votre réputation auprès des clients</li>
              <li><strong>Les coûts logistiques :</strong> Organisation d'un véhicule de remplacement, gestion de crise</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-700 p-6 my-8 rounded-r-lg">
              <p className="text-slate-800 font-medium">
                📊 <strong>Chiffre clé :</strong> Selon les études du secteur, un poids lourd immobilisé peut coûter entre 800€ et 1 500€ par jour en perte d'exploitation, sans compter les frais de réparation.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Les Avantages d'un Service de Dépannage 24/7
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-white border-2 border-red-700 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  Réactivité Maximale
                </h3>
                <p className="text-slate-600 text-sm">
                  Intervention rapide à toute heure, même le week-end et jours fériés
                </p>
              </div>

              <div className="bg-white border-2 border-red-700 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  Réduction des Pertes
                </h3>
                <p className="text-slate-600 text-sm">
                  Minimisation du temps d'immobilisation et des coûts associés
                </p>
              </div>

              <div className="bg-white border-2 border-red-700 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  Tranquillité d'Esprit
                </h3>
                <p className="text-slate-600 text-sm">
                  Vous savez qu'une équipe est toujours disponible pour vous assister
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Notre Service de Dépannage Val de Loire VI
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              En tant qu'agent DAF officiel à Blois, Val de Loire VI a développé un service de dépannage d'urgence performant et réactif. Notre équipe d'intervention est équipée de véhicules spécialisés et dispose des pièces de rechange essentielles pour les réparations courantes.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Ce qui nous différencie :
            </h3>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
              <li><strong>Techniciens certifiés DAF :</strong> Expertise reconnue sur tous les modèles de la marque</li>
              <li><strong>Diagnostic sur place :</strong> Évaluation rapide de la panne et solutions immédiates</li>
              <li><strong>Véhicules équipés :</strong> Outillage professionnel et pièces de première nécessité</li>
              <li><strong>Zone d'intervention étendue :</strong> Couverture de la région Centre-Val de Loire et au-delà</li>
              <li><strong>Coordination avec votre assurance :</strong> Prise en charge administrative simplifiée</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Prévenir Plutôt que Guérir
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Bien qu'un service de dépannage 24/7 soit indispensable, la meilleure stratégie reste la prévention. Un programme d'entretien régulier réduit considérablement les risques de panne. Chez Val de Loire VI, nous proposons des contrats d'entretien personnalisés qui incluent :
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
              <li>Révisions programmées selon le calendrier DAF</li>
              <li>Diagnostics préventifs réguliers</li>
              <li>Rappels automatiques pour les échéances d'entretien</li>
              <li>Tarifs préférentiels pour les interventions d'urgence</li>
            </ul>

            <div className="bg-slate-900 text-white p-8 rounded-2xl my-12">
              <h3 className="text-2xl font-bold mb-4">
                Une Panne ? Nous Intervenons Immédiatement
              </h3>
              <p className="text-slate-300 mb-6">
                Notre équipe de dépannage est disponible 24h/24, 7j/7 pour vous remettre sur la route rapidement. Un seul numéro à composer, une intervention rapide garantie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0254502929"
                  className="inline-flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-4 rounded-lg hover:bg-red-800 transition-colors font-medium text-lg"
                >
                  <Phone className="w-6 h-6" />
                  Appeler : 02 54 50 29 29
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-4 rounded-lg hover:bg-white hover:text-slate-900 transition-colors font-medium"
                >
                  Nos services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Conclusion
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Dans un secteur où le temps, c'est de l'argent, disposer d'un partenaire fiable pour le dépannage d'urgence est stratégique. Le service 24/7 de Val de Loire VI vous garantit une intervention rapide, une expertise DAF reconnue et la tranquillité d'esprit nécessaire pour vous concentrer sur votre activité.
            </p>
            <p className="text-slate-700 leading-relaxed">
              N'attendez pas d'être confronté à une situation d'urgence : enregistrez dès maintenant notre numéro de dépannage 24/7 dans vos contacts. Votre activité mérite un partenaire qui ne dort jamais.
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
              to="/blog/entretien-poids-lourds-daf-conseils"
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-red-700 transition-all"
            >
              <span className="text-sm text-red-700 font-medium">Conseils</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">
                5 Conseils Essentiels pour l'Entretien de Votre Poids Lourd DAF
              </h3>
              <p className="text-slate-600 text-sm">
                Découvrez nos conseils d'experts pour maintenir votre camion DAF...
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
