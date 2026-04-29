import { useState, useEffect } from "react";
import { Shield, Wrench, Truck, Clock, Phone, ArrowRight, Star, Store } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import heroImage from "figma:asset/d76c96bf4b50d7e0f67ebcf6e32122552dab94c5.png";
import logo from "figma:asset/870b92c58c1a07c810646758591cdff1f5208dc6.png";
import dafLogo from "figma:asset/888acf26bb9c034775a99108f2ec0aeef3b65de8.png";
import isuzuLogo from "figma:asset/d279372b54dbcf28625b5e990019ea909140cb7e.png";
import kogelLogo from "figma:asset/91ecbf2e66140fe0b2b492dacaa69de2d1ed7e20.png";
import trpLogo from "figma:asset/49d977c29fdda19bf4aaca774e6a7799838bc302.png";
import volvoLogo from "figma:asset/253c47f299d1d8e6d381e1efd0f9583c30d09b6d.png";
import mechanicImage from "../../imports/mecanicien_daf.jpg";
import buildingImage from "figma:asset/1e508e7fddb0a6e0c2888f54bde6094d04612caa.png";
import garageExteriorFullImage from "figma:asset/b488a660af371c013671f2685a188e22cb61d07a.png";

export function Home() {
  const services = [
    {
      icon: Wrench,
      title: "Réparation Poids Lourds",
      description: "Réparation complète de poids lourds et remorques : mécanique, freinage, suspension et systèmes électriques.",
    },
    {
      icon: Store,
      title: "Vente de pièces détachées",
      description: "Vente de pièces détachées et d'accessoires pour véhicules industriels, en France et à l'export.",
    },
    {
      icon: Truck,
      title: "Concessionnaire Isuzu",
      description: "Vente, entretien et maintenance de véhicules utilitaires Isuzu Trucks et\nD-max, neufs et occasions.",
    },
    {
      icon: Phone,
      title: "Dépannage\nd'urgence",
      description: "Service disponible pour vous remettre sur la route dans les meilleurs délais.",
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxSection = document.getElementById('parallax-section');
      
      if (parallaxSection) {
        const sectionTop = parallaxSection.offsetTop;
        const sectionHeight = parallaxSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculer l'offset seulement quand la section est visible
        if (scrollPosition + windowHeight > sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const offset = (scrollPosition - sectionTop + windowHeight) * 0.3;
          setParallaxOffset(offset);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Fetching Google reviews from Vercel API...');
        const response = await fetch('/api/google-reviews');

        console.log('Response status:', response.status);

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Expected JSON but got:', contentType);
          setError('Clé API Google Places non configurée. Veuillez configurer GOOGLE_PLACES_API_KEY dans Vercel.');
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
          console.error('Failed to fetch Google reviews:', data);
          setError(data.error || 'Une erreur est survenue');
          setLoading(false);
          return;
        }

        if (data.error) {
          console.warn('API returned error:', data.error);
          setError(data.error);
        }

        setReviews(data.reviews || []);
        setOverallRating(data.overallRating || 0);
        setTotalReviews(data.totalReviews || 0);

        console.log('Overall Rating:', data.overallRating);
        console.log('Total Reviews:', data.totalReviews);
      } catch (error) {
        console.error('Error fetching Google reviews:', error);
        setError('Clé API Google Places non configurée. Veuillez configurer GOOGLE_PLACES_API_KEY dans Vercel.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src={heroImage}
            alt="Flotte de camions DAF"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              AGENT DAF à Blois
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Votre partenaire de confiance pour l'entretien et la réparation de vos véhicules industriels de 3,5 à 250 tonnes
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:0254502929"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-[#001e40] transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                Appeler maintenant
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg hover:bg-slate-100 transition-colors font-medium"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="relative -mt-20 pt-8 pb-4 bg-transparent z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
              <img src={logo} alt="VAL DE LOIRE VI" className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-lg text-slate-700 leading-relaxed text-justify">
            <p>
              Agent DAF, <strong>VAL DE LOIRE V.I</strong> est votre partenaire de référence pour l'entretien et la réparation de vos poids lourds depuis plus de 25 ans. Implantée à <strong>Fossé</strong>, à proximité immédiate de <strong>Blois (Loir-et-Cher – 41)</strong>, l'entreprise intervient sur les véhicules <strong>DAF</strong> dans le strict respect des standards et accords constructeurs, garantissant fiabilité et performance. Membre du <strong>Groupe Sodimavi depuis 2015</strong>, VAL DE LOIRE V.I bénéficie également de l'expertise et des formations nécessaires pour intervenir sur les poids lourds <strong>Volvo Trucks</strong>. Au-delà de ces marques, nos équipes assurent l'entretien, la réparation et la maintenance de vos véhicules industriels toutes marques, ainsi que la vente de pièces détachées et d'accessoires.
            </p>
          </div>
        </div>
      </section>

      {/* Garage Full Width Image Section */}
      <section className="w-full bg-white">
        <div className="w-full overflow-hidden">
          {/* Image removed */}
        </div>
      </section>

      {/* Brands Section */}
      <section className="pt-6 pb-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Nos Marques
            </h2>
          </div>
          
          {/* Layout avec DAF au centre et autres logos autour */}
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Colonne gauche - TRP et Kogel */}
            <div className="flex flex-col gap-6 flex-1 order-2 md:order-1">
              {/* TRP */}
              <a 
                href="https://trp.eu/fr-fr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow h-32 md:h-36"
              >
                <img
                  src={trpLogo}
                  alt="TRP"
                  className="h-20 md:h-24 w-auto object-contain hover:scale-110 transition-transform"
                />
              </a>
              
              {/* Kogel */}
              <a 
                href="https://sodimavi.com/remorques-kogel/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow h-32 md:h-36"
              >
                <img
                  src={kogelLogo}
                  alt="KÖGEL"
                  className="h-16 md:h-20 w-auto object-contain hover:scale-110 transition-transform"
                />
              </a>
            </div>
            
            {/* DAF au centre - Plus grand */}
            <div className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all flex-1 order-1 md:order-2">
              <a 
                href="https://www.daf.fr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={dafLogo}
                  alt="DAF - Agent Officiel"
                  className="h-40 md:h-48 w-auto object-contain hover:scale-105 transition-transform cursor-pointer"
                />
              </a>
            </div>
            
            {/* Colonne droite - Volvo et Isuzu */}
            <div className="flex flex-col gap-6 flex-1 order-3">
              {/* VOLVO */}
              <a 
                href="https://sodimavi.com/gamme-volvo-trucks/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow h-32 md:h-36"
              >
                <img
                  src={volvoLogo}
                  alt="VOLVO"
                  className="h-16 md:h-20 w-auto object-contain hover:scale-110 transition-transform"
                />
              </a>
              
              {/* Isuzu */}
              <a 
                href="https://sodimavi.com/trucks-et-pick-up-isuzu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow h-32 md:h-36"
              >
                <img
                  src={isuzuLogo}
                  alt="ISUZU"
                  className="h-16 md:h-20 w-auto object-contain hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Building Parallax Section */}
      <section className="relative bg-[#001e40] text-white overflow-hidden h-[250px] md:h-[350px]" id="parallax-section">
        <div className="absolute inset-0 opacity-70">
          <img
            src={garageExteriorFullImage}
            alt="Bâtiment VAL DE LOIRE V.I"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 65%' }}
          />
        </div>
        <div className="absolute inset-0 bg-[#001e40] opacity-15"></div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Notre Garage à Fossé
            </h2>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nos Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des solutions complètes pour tous vos besoins en maintenance et réparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 hover:shadow-2xl hover:scale-105 transition-all text-center group ${
                  service.title.includes("urgence") 
                    ? "border-2 border-yellow-400" 
                    : "border-2 border-[#001e40]"
                }`}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto transition-colors ${
                  service.title.includes("urgence")
                    ? "bg-yellow-400 group-hover:bg-yellow-500"
                    : "bg-[#001e40] group-hover:bg-[#001429]"
                }`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3 whitespace-pre-line">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#001e40] hover:text-[#001429] font-medium"
            >
              Voir tous nos services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Pourquoi choisir VAL DE LOIRE V.I ?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#001e40] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      Agent DAF Officiel
                    </h3>
                    <p className="text-slate-600">
                      Nos techniciens certifiés DAF, utilisent l'outil de diagnostic constructeur DAVIE, et ont accès aux pièces d'origine et à l'ensemble de la documentation technique officielle.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#001e40] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      Équipement Moderne
                    </h3>
                    <p className="text-slate-600">Notre atelier, équipé des dernières technologies pour des diagnostics précis, dispose également d'un banc de freinage.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#001e40] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      Équipe Réactive et Engagée
                    </h3>
                    <p className="text-slate-600">
                      Nos équipes sont à votre écoute et s'engagent à vous fournir un service de qualité, adapté à vos besoins spécifiques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl self-stretch">
              <ImageWithFallback
                src={mechanicImage}
                alt="Réparation poids lourds"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-3 mb-4 flex-wrap">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Nos avis Google
              </h2>
              <span className="text-lg text-slate-600">
                - Ce que nos clients disent de nous
              </span>
            </div>
            {!loading && !error && (
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${
                        i < Math.round(overallRating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'fill-slate-300 text-slate-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-slate-900">{overallRating.toFixed(1)}</span>
                <span className="text-lg text-slate-600">({totalReviews} avis)</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#001e40] mb-4"></div>
                <p className="text-slate-600">Chargement des avis Google...</p>
              </div>
            ) : error ? (
              <div className="col-span-full">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                  <p className="text-amber-800 font-medium mb-2">⚠️ Impossible de charger les avis Google</p>
                  <p className="text-amber-700 text-sm">{error}</p>
                  <div className="mt-4 text-xs text-amber-600">
                    <p className="font-semibold mb-2">Pour activer l'affichage des avis :</p>
                    <ol className="text-left max-w-2xl mx-auto space-y-1">
                      <li>1. Rendez-vous sur <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                      <li>2. Activez l'API "Places API (New)"</li>
                      <li>3. Créez une clé API</li>
                      <li>4. Ajoutez la clé dans Vercel → Settings → Environment Variables (GOOGLE_PLACES_API_KEY)</li>
                      <li>5. Redéployez votre site</li>
                    </ol>
                  </div>
                </div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-slate-600">Aucun avis disponible pour le moment.</p>
              </div>
            ) : (
              reviews.map((review: any, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < review.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'fill-slate-200 text-slate-200'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    "{review.comment}"
                  </p>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-semibold text-slate-900">
                      {review.author}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {review.date}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Link to see all reviews on Google */}
          {!loading && !error && reviews.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="https://search.google.com/local/reviews?placeid=ChIJkQ4E_AYVCEgR3rsAUYeWAqE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#001e40] hover:text-[#001429] font-medium text-lg group"
              >
                <Star className="w-5 h-5" />
                Voir tous les avis sur Google
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}