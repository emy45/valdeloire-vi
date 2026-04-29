import { Link } from "react-router";
import { 
  Wrench, 
  Store, 
  Truck, 
  Clock, 
  Shield, 
  Battery, 
  Gauge, 
  Cog, 
  Settings, 
  ArrowRight, 
  Phone, 
  KeyRound, 
  Euro, 
  FileText, 
  ShoppingCart 
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import garageImage from "figma:asset/d433d88d2abd7d069b92554fff6bc7a787c50583.png";
import magasinImage from "figma:asset/41be84c4a0c8bbefdcd0dff988618b53c7828764.png";
import reparationImage from "figma:asset/d16c8d138a151523a0a027158ec4f8dfa98639ec.png";
import isuzuImage from "figma:asset/e848dc5ea4070adceb9c494f5b00ed82a2ff6e9c.png";
import depannageImage from "../../imports/depannage_val_de_loire_vi_ok.jpg";
import truckBenneIcon from "figma:asset/9833ac788011e2a7c0f833a3a137828deec2abf1.png";
import dafLogo from "figma:asset/888acf26bb9c034775a99108f2ec0aeef3b65de8.png";
import dafTruckImage from "figma:asset/3cd3d4fe5c8f962e624afe9121f4ac1545ab8bce.png";

export function Services() {
  const mainServices = [
    {
      icon: Wrench,
      title: "Réparation Poids Lourds",
      description:
        "Réparation de poids lourds et remorques toute marque. Notre équipe expérimentée entretient, diagnostique et répare vos véhicules industriels.",
      features: [
        "Diagnostic électronique avancé",
        "Réparation moteur et transmission",
        "Système de freinage et suspension",
        "Carrosserie et peinture",
        "Préparation et contrôle technique",
      ],
    },
    {
      icon: Store,
      title: "Vente de pièces détachées",
      description:
        "Vente de pièces détachées d'origine et accessoires pour vos véhicules industriels. Notre magasin propose un large choix de pièces de qualité.",
      features: [
        "Pièces d'origine DAF, VOLVO, ISUZU et TRP garantie constructeur",
        "Accessoires et consommables",
        "Stock permanent disponible",
        "Conseil technique personnalisé",
      ],
    },
    {
      icon: Truck,
      title: "Concessionnaire Isuzu",
      description:
        "VAL DE LOIRE V.I est concessionnaire officiel Isuzu. Nous proposons la vente, l'entretien et la maintenance de véhicules utilitaires Isuzu neufs et occasions.",
      features: [
        "Vente de véhicules Isuzu neufs",
        "Véhicules d'occasion certifiés",
        "Entretien et révisions Isuzu",
        "Pièces d'origine Isuzu",
      ],
    },
    {
      icon: Clock,
      title: "Dépannage DAF",
      description:
        "Service d'urgence disponible pour vous remettre sur la route dans les meilleurs délais.",
      features: [
        "Intervention d'urgence rapide",
        "Disponibilité étendue",
        "Véhicule de dépannage équipé",
        "Diagnostic sur place",
      ],
    },
  ];

  const additionalServices = [
    { icon: KeyRound, title: "Location de véhicules industriels", description: "Solutions de location flexibles pour vos besoins temporaires" },
    { icon: Euro, title: "Financement de votre projet", description: "Accompagnement financier pour l'acquisition de vos véhicules" },
    { icon: FileText, title: "Contrats de maintenance", description: "Contrats de maintenance adaptés à vos besoin lors de l'achat d'une véhicule isuzu" },
  ];

  return (
    <div>
      {/* DAF Partnership */}
      <section className="pt-12 md:pt-20 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#001e40] to-[#001429] rounded-2xl p-6 md:p-12 text-white overflow-hidden">
            {/* Image de fond tramée */}
            <div className="absolute inset-0">
              <img
                src={dafTruckImage}
                alt="Camion DAF dans l'atelier"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#001e40]/60 to-[#001429]/60"></div>
            </div>
            
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="bg-white rounded-lg p-3 md:p-4 inline-block mb-4 md:mb-6">
                <img 
                  src={dafLogo} 
                  alt="DAF Logo" 
                  className="h-12 md:h-16 w-auto" 
                />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Agent DAF Officiel
              </h2>
              <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-8">
                VAL DE LOIRE V.I est fier d'être agent officiel DAF. Nos techniciens certifiés utilisent principalement des pièces d'origine pour garantir la qualité et la durabilité de nos interventions.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch gap-4 justify-center">
                <div className="bg-white/10 rounded-lg p-6 min-w-[200px] flex flex-col items-center justify-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">25+</div>
                  <div className="text-sm md:text-base text-blue-100">Ans d'expérience</div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#001e40] px-8 py-6 rounded-lg hover:bg-slate-100 transition-colors font-medium"
                >
                  Contactez-nous
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 md:space-y-16">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    {service.title === "Concessionnaire Isuzu" ? (
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-[#001e40] flex items-center justify-center flex-shrink-0 p-2">
                        <img src={truckBenneIcon} alt="Camion benne" className="w-full h-full object-contain brightness-0 invert" />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        service.title === "Dépannage DAF" ? "bg-yellow-500" : "bg-[#001e40]"
                      }`}>
                        <service.icon className={`w-6 h-6 md:w-8 md:h-8 ${
                          service.title === "Dépannage DAF" ? "text-slate-900" : "text-white"
                        }`} />
                      </div>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className={`text-base md:text-lg text-slate-600 text-justify ${
                    service.title === "Réparation Poids Lourds" ? "mb-3 md:mb-4" : "mb-4 md:mb-6"
                  }`}>
                    {service.description}
                  </p>
                  <ul className={`mb-6 md:mb-8 ${
                    service.title === "Réparation Poids Lourds" ? "space-y-1.5 md:space-y-2" : "space-y-2 md:space-y-3"
                  }`}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          service.title === "Dépannage DAF" ? "bg-yellow-500" : "bg-[#001e40]"
                        }`}></div>
                        <span className="text-sm md:text-base text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {service.title === "Réparation Poids Lourds" ? (
                    <a
                      href="tel:0254502929"
                      className="inline-flex items-center gap-2 bg-[#001e40] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-[#001429] transition-all hover:scale-105 font-medium text-sm md:text-base"
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                      Contactez l'atelier
                    </a>
                  ) : service.title === "Vente de pièces détachées" ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:0254502929"
                        className="inline-flex items-center justify-center gap-2 bg-[#001e40] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-[#001429] transition-all hover:scale-105 font-medium text-sm md:text-base"
                      >
                        <Phone className="w-4 h-4 md:w-5 md:h-5" />
                        Devis gratuit sous 4 h
                      </a>
                      <a
                        href="https://parts.daf.com/fr-fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-red-700 transition-all hover:scale-105 font-medium text-sm md:text-base"
                      >
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                        DAF WEB SHOP
                      </a>
                    </div>
                  ) : service.title === "Concessionnaire Isuzu" ? (
                    <a
                      href="tel:0608850546"
                      className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-red-700 transition-all hover:scale-105 font-medium text-sm md:text-base"
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                      Contactez notre commercial Isuzu
                    </a>
                  ) : service.title === "Dépannage DAF" ? (
                    <a
                      href="tel:0031402143000"
                      className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 px-5 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-yellow-600 transition-all hover:scale-105 font-medium text-sm md:text-base"
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                      Contactez l'assistance DAF
                    </a>
                  ) : (
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 font-medium transition-all hover:scale-105 text-[#001e40] hover:text-[#001429] text-sm md:text-base"
                    >
                      Demander un devis
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                  )}
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  {service.title === "Réparation Poids Lourds" ? (
                    <div className="rounded-2xl h-[250px] md:h-[400px] overflow-hidden shadow-lg group cursor-pointer">
                      <img
                        src={reparationImage}
                        alt="Réparation poids lourds DAF"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : service.title === "Vente de pièces détachées" ? (
                    <div className="rounded-2xl h-[250px] md:h-[400px] overflow-hidden shadow-lg group cursor-pointer">
                      <img
                        src={magasinImage}
                        alt="Magasin de pièces détachées"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : service.title === "Concessionnaire Isuzu" ? (
                    <div className="rounded-2xl h-[250px] md:h-[400px] overflow-hidden shadow-lg group cursor-pointer">
                      <img
                        src={isuzuImage}
                        alt="Camion Isuzu"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : service.title === "Dépannage DAF" ? (
                    <div className="rounded-2xl h-[250px] md:h-[400px] overflow-hidden shadow-lg group cursor-pointer">
                      <img
                        src={depannageImage}
                        alt="Service dépannage 24/7"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-100 rounded-2xl h-[250px] md:h-[400px] flex items-center justify-center">
                      <service.icon className="w-24 h-24 text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="pt-12 pb-12 md:pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Nos services complémentaires
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Une gamme complète de services pour tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-[#001e40] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                {service.title === "Location de véhicules industriels" && (
                  <a
                    href="https://sodimavi.com/location-volvo-fh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#001e40] text-white px-4 py-2 rounded-lg hover:bg-[#001429] transition-all hover:scale-105 font-medium text-sm"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                {service.title === "Financement de votre projet" && (
                  <a
                    href="https://online.fliphtml5.com/eponj/financement-Isuzu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#001e40] text-white px-4 py-2 rounded-lg hover:bg-[#001429] transition-all hover:scale-105 font-medium text-sm"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                {service.title === "Contrats de maintenance" && (
                  <a
                    href="https://online.fliphtml5.com/eponj/Contrats-Isuzu-lNkw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#001e40] text-white px-4 py-2 rounded-lg hover:bg-[#001429] transition-all hover:scale-105 font-medium text-sm"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}