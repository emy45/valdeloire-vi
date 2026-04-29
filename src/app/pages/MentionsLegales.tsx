import { Seo } from "../components/Seo";

export function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Mentions Légales"
        description="Mentions légales du site VAL DE LOIRE V.I, agent DAF officiel à Blois."
        path="/mentions-legales"
      />
      {/* Hero Section */}
      <section className="bg-[#001e40] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            Mentions Légales
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            
            {/* Éditeur du site */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Éditeur du site</h2>
              <p className="text-slate-700 mb-2">
                <strong>Raison sociale :</strong> Val de Loire VI
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Forme juridique :</strong> [À compléter]
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Adresse :</strong> Zone Industrielle, Val de Loire, France
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Téléphone :</strong> 02 54 54 29 29
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Email :</strong> contact@valdelloirevi.fr
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Numéro SIRET :</strong> [À compléter]
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Numéro de TVA intracommunautaire :</strong> [À compléter]
              </p>
            </div>

            {/* Directeur de publication */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Directeur de publication</h2>
              <p className="text-slate-700">
                Le directeur de la publication est [Nom du dirigeant], en qualité de [Fonction].
              </p>
            </div>

            {/* Hébergeur */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Hébergement</h2>
              <p className="text-slate-700 mb-2">
                <strong>Hébergeur :</strong> Supabase Inc.
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Adresse :</strong> 970 Toa Payoh North, #07-04, Singapore 318992
              </p>
              <p className="text-slate-700">
                <strong>Site web :</strong> <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#001e40] hover:underline">https://supabase.com</a>
              </p>
            </div>

            {/* Propriété intellectuelle */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Propriété intellectuelle</h2>
              <p className="text-slate-700 mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-slate-700">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </div>

            {/* Données personnelles */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Protection des données personnelles</h2>
              <p className="text-slate-700 mb-4">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD) du 27 avril 2016, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="text-slate-700 mb-4">
                Les informations recueillies via le formulaire de contact sont destinées exclusivement à Val de Loire VI pour le traitement de vos demandes. Elles ne seront en aucun cas transmises à des tiers.
              </p>
              <p className="text-slate-700">
                Pour exercer vos droits, vous pouvez nous contacter à l'adresse suivante : contact@valdelloirevi.fr
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies</h2>
              <p className="text-slate-700 mb-4">
                Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne collectent pas de données personnelles et ne peuvent pas être désactivés.
              </p>
              <p className="text-slate-700">
                Vous pouvez configurer votre navigateur pour refuser les cookies. Toutefois, cela pourrait affecter votre expérience de navigation sur le site.
              </p>
            </div>

            {/* Limitation de responsabilité */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Limitation de responsabilité</h2>
              <p className="text-slate-700 mb-4">
                Val de Loire VI s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Val de Loire VI ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p className="text-slate-700">
                Val de Loire VI ne saurait être tenue responsable des erreurs, d'une absence de disponibilité des informations et des services, ou de la présence de virus sur son site.
              </p>
            </div>

            {/* Droit applicable */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Droit applicable</h2>
              <p className="text-slate-700">
                Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
              </p>
            </div>

            {/* Crédits */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Crédits</h2>
              <p className="text-slate-700 mb-2">
                <strong>Conception et développement :</strong> Val de Loire VI
              </p>
              <p className="text-slate-700">
                <strong>Photographies :</strong> Unsplash - Photos libres de droits
              </p>
            </div>

            {/* Date de mise à jour */}
            <div className="text-sm text-slate-500 mt-12 pt-8 border-t border-slate-200">
              <p>Dernière mise à jour : 16 mars 2026</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
