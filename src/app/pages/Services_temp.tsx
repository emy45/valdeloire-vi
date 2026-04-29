import { Link } from "react-router";
import {
  Wrench,
  Truck,
  Clock,
  Settings,
  Battery,
  Gauge,
  Cog,
  Shield,
  Phone,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import garageImage from "figma:asset/d433d88d2abd7d069b92554fff6bc7a787c50583.png";

export function Services() {
  const mainServices = [
    {
      icon: Wrench,
      title: "Réparation Poids Lourds",
      description:
        "Réparation complète de tous types de poids lourds : moteur, transmission, système de freinage, suspension. Notre équipe expérimentée diagnostique et répare rapidement vos véhicules.",
      features: [
        "Diagnostic électronique avancé",
        "Réparation moteur et transmission",
        "Système de freinage et suspension",
        "Carrosserie et peinture",
      ],
    },
    {
      icon: Truck,
      title: "Entretien Utilitaires",
      description:
        "Maintenance préventive et révisions régulières pour vos utilitaires. Nous assurons la longévité et les performances optimales de votre flotte.",
      features: [
        "Révisions périodiques",
        "Vidange et filtres",
        "Contrôle technique",
        "Plan d'entretien personnalisé",
      ],
    },
    {
      icon: Clock,
      title: "Dépannage 24/7",
      description:
        "Service d'urgence disponible jour et nuit, 7j/7. Intervention rapide pour vous remettre sur la route dans les meilleurs délais.",
      features: [
        "Intervention d'urgence rapide",
        "Disponible 24h/24, 7j/7",
        "Véhicule de dépannage équipé",
        "Diagnostic sur place",
      ],
    },
    {
      icon: Shield,
      title: "Service DAF",
      description:
        "En tant qu'agent DAF officiel, nous proposons un service premium avec des techniciens certifiés et des pièces d'origine garanties.",
      features: [
        "Techniciens certifiés DAF",
        "Pièces d'origine garanties",
        "Garantie constructeur",
        "Diagnostic DAF Connect",
      ],
    },
  ];

  const additionalServices = [
    { icon: Battery, title: "Électricité et Électronique", description: "Diagnostic et réparation de systèmes électriques" },
    { icon: Gauge, title: "Contrôle Technique", description: "Préparation et passage du contrôle technique" },
    { icon: Cog, title: "Pneumatiques", description: "Vente et montage de pneumatiques poids lourds" },
    { icon: Settings, title: "Climatisation", description: "Entretien et recharge de climatisation" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src={garageImage}
            alt="Garage Val de Loire VI"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Des solutions complètes pour l'entretien, la réparation et le dépannage de vos poids lourds et utilitaires
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium"
                  >
                    Demander un devis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="bg-slate-100 rounded-2xl h-[400px] flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-slate-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Services Complémentaires
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Une gamme complète de services pour tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAF Partnership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Shield className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Agent DAF Officiel
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Val de Loire VI est fier d'être agent officiel DAF. Nos techniciens certifiés utilisent principalement des pièces d'origine pour garantir la qualité et la durabilité de nos interventions.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch gap-4 justify-center">
                <div className="bg-blue-600/30 rounded-lg p-6 min-w-[200px] flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold mb-1">25+</div>
                  <div className="text-blue-100">Ans d'expérience</div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-6 rounded-lg hover:bg-slate-100 transition-colors font-medium"
                >
                  Contactez-nous
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Une urgence ? Nous sommes là.
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Notre service de dépannage 24/7 est prêt à intervenir pour vous remettre sur la route rapidement.
              </p>
              <a
                href="tel:0254502929"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-medium text-lg"
              >
                <Phone className="w-6 h-6" />
                02 54 50 29 29
              </a>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770246783100-68418cb7493c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwdHJ1Y2slMjByb2FkJTIwc2VydmljZXxlbnwxfHx8fDE3NzMxNTgwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Service dépannage"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}