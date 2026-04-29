import { useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

export function CreateSodimaviArticle() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createArticle = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const articleData = {
      adminKey: "vdlvi-quick-2025",
      slug: "journee-collaborateurs-sodimavi-10-ans-blois-2025",
      title: "Une journée d'entreprise pas comme les autres : Sodimavi célèbre les 10 ans de son agence de Blois avec un road trip rétro",
      excerpt: "Le 9 juin 2025, Sodimavi a organisé une journée d'entreprise originale pour ses 120 collaborateurs avec un road trip en voitures anciennes pour célébrer les 10 ans de l'agence de Blois (Fossé). Un événement fédérateur placé sous le signe de la cohésion d'équipe et de la convivialité.",
      category: "Événements",
      image: "https://images.unsplash.com/photo-1663954388034-bc907004d397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwdGVhbSUyMGV2ZW50JTIwY2VsZWJyYXRpb24lMjB2aW50YWdlJTIwY2Fyc3xlbnwxfHx8fDE3NzM3Mzg3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      publishedAt: "2025-06-30T10:00:00.000Z",
      authorName: "Équipe Val de Loire VI",
      published: true,
      content: `# Une journée d'entreprise pas comme les autres : Sodimavi célèbre les 10 ans de son agence de Blois avec un road trip rétro

Le 9 juin dernier, **Sodimavi**, concessionnaire pour les Véhicules **ISUZU** (trucks et pick-up), **VOLVO**, **DAF** (agence de Blois) et **KÖGEL** dans 8 départements, a organisé une journée d'entreprise originale pour ses **120 collaborateurs**. Un événement fédérateur, placé sous le signe de la cohésion d'équipe, de la surprise… et de la convivialité.

## 10 ans de l'agence de Blois : une belle occasion de se retrouver

Cette journée hors du cadre marquait un moment important : **les 10 ans de l'agence Sodimavi de Blois**, implantée à **Fossé** dans le département du **Loir-et-Cher**. Pour l'occasion, direction une ambiance vintage et décalée, avec une surprise de taille pour les collaborateurs.

Dès 9h, à leur arrivée à l'agence, les équipes découvrent **une trentaine de voitures anciennes** alignées sur le parking, prêtes pour un **road trip inoubliable** organisé en partenariat avec **Cockpit 41**. Une immersion dans une autre époque, renforcée par un **dress code rétro** respecté par l'ensemble des collaborateurs et dirigeants — de quoi donner le ton dès les premiers instants !

## Cohésion et esprit d'équipe au cœur du programme

Équipés de road books et d'énigmes, les salariés ont pris la route à bord des voitures d'époque pour une **matinée de jeux de piste** et de découverte du territoire, entre réflexion, rires et esprit d'équipe. Un moment parfait pour se redécouvrir en dehors du cadre habituel de travail.

Plusieurs **temps d'échanges professionnels** ont été proposés, dans un cadre naturel, loin des salles classiques de réunion. Ces moments ont permis d'aborder les points clés de la stratégie d'entreprise, mais aussi d'écouter les retours du terrain, dans une ambiance simple et détendue.

## Pique-nique au bord de la Loire et balade en gabare

À l'heure du déjeuner, direction **les bords de Loire**, face au **château de Chaumont-sur-Loire**, pour un **pique-nique convivial** en plein air.

Des **balades en gabare**, embarcations traditionnelles de la Loire, étaient proposées tout au long du déjeuner pour découvrir le paysage sous un autre angle ainsi que la faune et la flore présentes sur le fleuve.

## Mettre en valeur l'engagement des collaborateurs

**Temps fort** : plusieurs salariés ont été remerciés pour leur **ancienneté** ou pour leur **implication remarquée** au cours de l'année. Une reconnaissance simple mais sincère, qui reflète l'esprit d'écoute et de valorisation porté par le **groupe Sodimavi**.

## Une culture d'entreprise qui place l'humain au centre

Avec cette nouvelle journée d'entreprise, **Sodimavi** souhaite comme chaque année remercier l'ensemble de ses collaborateurs et promouvoir une **qualité de vie au travail** positive et durable. Ces temps forts participent à la construction d'un climat de confiance, d'écoute et de reconnaissance au sein des équipes.

---

**Val de Loire VI**, membre du groupe Sodimavi, partage ces valeurs de respect, de cohésion et d'excellence au service de ses clients. Nous sommes fiers de faire partie d'un groupe qui place l'humain au cœur de sa réussite.

**Contactez-nous au 02 54 54 29 29** pour découvrir nos services et notre équipe passionnée.`,
    };

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/articles/quick-create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(articleData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création de l'article");
      }

      setSuccess(true);
      console.log("Article créé avec succès:", data);
    } catch (err: any) {
      setError(err.message);
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Créer l'article Sodimavi - 10 ans Blois
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="font-bold text-blue-900 mb-2">Article à créer :</h2>
          <p className="text-blue-800 text-sm mb-2">
            <strong>Titre :</strong> Une journée d'entreprise pas comme les autres : Sodimavi célèbre les 10 ans de son agence de Blois avec un road trip rétro
          </p>
          <p className="text-blue-800 text-sm mb-2">
            <strong>Date de publication :</strong> 30 juin 2025
          </p>
          <p className="text-blue-800 text-sm mb-2">
            <strong>Catégorie :</strong> Événements
          </p>
          <p className="text-blue-800 text-sm">
            <strong>Auteur :</strong> Équipe Val de Loire VI
          </p>
        </div>

        {!success && !error && !loading && (
          <button
            onClick={createArticle}
            className="w-full bg-[#001e40] text-white px-6 py-4 rounded-lg hover:bg-[#001429] transition-colors font-medium text-lg"
          >
            Créer l'article maintenant
          </button>
        )}

        {loading && (
          <div className="text-center py-8">
            <Loader className="w-12 h-12 text-[#001e40] animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Création de l'article en cours...</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Article créé avec succès ! ✅
            </h3>
            <p className="text-green-800 mb-4">
              L'article sur la journée Sodimavi 10 ans a été publié.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/blog"
                className="inline-block bg-[#001e40] text-white px-6 py-3 rounded-lg hover:bg-[#001429] transition-colors font-medium"
              >
                Voir tous les articles
              </a>
              <a
                href="/admin/dashboard"
                className="inline-block border-2 border-[#001e40] text-[#001e40] px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Accéder au tableau de bord admin
              </a>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">Erreur</h3>
            <p className="text-red-800 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setSuccess(false);
              }}
              className="bg-[#001e40] text-white px-6 py-3 rounded-lg hover:bg-[#001429] transition-colors font-medium"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
