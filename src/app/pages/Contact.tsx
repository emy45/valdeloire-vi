import { MapPin, Phone, Mail, Clock, Send, Users, Wrench } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import contactHeroImage from "figma:asset/39a262bf65b9e3dd7a0622b69354e581292a87a1.png";
import teamBuildingImage from "figma:asset/9012e685e891b23f6155c746a719c028243882b0.png";
import garageExteriorImage from "figma:asset/4b5928c7d8da14f2633ddf3d9dfb25bd936dbd67.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Seo } from "../components/Seo";

interface AddressSuggestion {
  properties: {
    label: string;
    name: string;
    postcode: string;
    city: string;
    context: string;
  };
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    postalCode: "",
    city: "",
    vehicleType: "",
    message: "",
    website: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Fermer les suggestions si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        addressInputRef.current &&
        !addressInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recherche d'adresses avec debouncing
  useEffect(() => {
    const searchAddress = async () => {
      if (formData.address.length < 3) {
        setAddressSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
            formData.address
          )}&limit=5`
        );
        const data = await response.json();
        setAddressSuggestions(data.features || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Erreur lors de la recherche d'adresse:", error);
        setAddressSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchAddress, 300);
    return () => clearTimeout(timeoutId);
  }, [formData.address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Déterminer les destinataires en fonction du type de demande
    let recipients: string[] = [];
    
    switch (formData.vehicleType) {
      case "entretien-reparation":
        recipients = ["m.boujardine@vdlvi.fr", "r.pinto@sodimavi-sav.fr", "e.richard@sodimavi.fr"];
        break;
      case "achat-pieces":
        recipients = ["magasin@vdlvi.fr", "e.richard@sodimavi.fr"];
        break;
      case "achat-isuzu":
        recipients = ["b.barre@sodimavi.fr", "e.richard@sodimavi.fr"];
        break;
      case "autre":
        recipients = ["d.rassinoux@sodimavi.fr", "e.richard@sodimavi.fr"];
        break;
      default:
        recipients = ["m.boujardine@vdlvi.fr", "r.pinto@sodimavi-sav.fr"];
    }
    
    // Préparer les données pour l'envoi
    const emailData = {
      ...formData,
      recipients: recipients,
      recipientsString: recipients.join("; "),
      honeypot: formData.website,
    };
    
    // Dans une application réelle, vous enverriez ces données à un serveur
    setIsSending(true);
    setError("");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }
      setSubmitted(true);
    } catch (error) {
      setError("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          address: "",
          postalCode: "",
          city: "",
          vehicleType: "",
          message: "",
          website: "",
        });
      }, 8000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressSelect = (suggestion: AddressSuggestion) => {
    // Extraire le numéro et la rue (sans le code postal et la ville)
    const fullAddress = suggestion.properties.label;
    const postalCode = suggestion.properties.postcode;
    const city = suggestion.properties.city;
    
    // Extraire uniquement la rue (avant la virgule ou avant le code postal)
    let streetAddress = suggestion.properties.name;
    
    // Si name ne contient pas le numéro, on l'extrait du label
    if (!streetAddress.match(/^\d+/)) {
      const parts = fullAddress.split(',')[0].trim();
      streetAddress = parts;
    }
    
    setFormData({
      ...formData,
      address: streetAddress,
      postalCode: postalCode,
      city: city,
    });
    setShowSuggestions(false);
  };

  return (
    <div>
      <Seo
        title="Contact — Demander un devis poids lourds"
        description="Contactez VAL DE LOIRE V.I à Fossé près de Blois. Tél : 02 54 50 29 29. Devis gratuit sous 4h pour la réparation et l'entretien de votre poids lourd. Agent DAF officiel."
        path="/contact"
      />
      {/* Hero Section */}
      <section className="relative bg-[#001e40] text-white py-16 md:py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={contactHeroImage}
            alt="Contact"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#001e40]/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Contactez-nous</h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            Notre équipe est à votre disposition pour répondre à vos questions et vous fournir les solutions adaptées
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 flex flex-col">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                    Notre agence
                  </h2>

                  {/* Garage Image */}
                  <div className="rounded-xl overflow-hidden shadow-lg mb-6 group cursor-pointer">
                    <img
                      src={garageExteriorImage}
                      alt="Garage VAL DE LOIRE V.I avec camions DAF et Isuzu"
                      className="w-full h-64 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#001e40] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <a
                          href="tel:0254502929"
                          className="text-[#001e40] hover:text-[#001429] font-medium"
                        >
                          02 54 50 29 29
                        </a>
                        <p className="text-sm text-slate-600 mt-1">
                          VAL DE LOIRE V.I
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#001e40] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <a
                          href="mailto:magasin@vdlvi.fr"
                          className="text-[#001e40] hover:text-[#001429] break-all text-sm md:text-base"
                        >
                          magasin@vdlvi.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#001e40] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm md:text-base text-slate-600">
                          10 Rue des Champs de Fossé<br />
                          41330 FOSSÉ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#001e40] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm md:text-base text-slate-600">
                          Lun - Ven : 8h-12h et 14h-18h<br />
                          Sam : 8h-12h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dépannage d'urgence */}
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-5 mt-auto">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-yellow-600" />
                  Assistance DAF 24/7
                </h3>
                <a
                  href="tel:0031402143000"
                  className="flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 px-4 py-3 rounded-lg hover:bg-yellow-500 transition-colors border-2 border-yellow-400 font-bold w-full animate-pulse"
                >
                  <Phone className="w-5 h-5" />
                  <span>00 31 40 214 30 00</span>
                </a>
                <p className="text-xs text-slate-600 leading-relaxed mt-2 text-center">
                  Service assistance DAF disponible 24h/24 et 7j/7
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                  Contactez-nous
                </h2>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-slate-600">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                          placeholder="Jean Dupont"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Entreprise
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                          placeholder="Transport SA"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                          placeholder="jean.dupont@email.fr"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                          placeholder="06 12 34 56 78"
                        />
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Adresse
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                          placeholder="123 Rue de la Paix"
                          ref={addressInputRef}
                          autoComplete="off"
                        />
                        {showSuggestions && addressSuggestions.length > 0 && (
                          <div
                            className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                            ref={suggestionsRef}
                          >
                            {isSearching ? (
                              <div className="p-3 text-sm text-slate-500">
                                Recherche en cours...
                              </div>
                            ) : (
                              addressSuggestions.map((suggestion, index) => (
                                <div
                                  key={`${suggestion.properties.label}-${index}`}
                                  className="p-3 cursor-pointer hover:bg-[#001e40] hover:text-white transition-colors text-sm border-b border-slate-100 last:border-b-0"
                                  onClick={() => handleAddressSelect(suggestion)}
                                >
                                  {suggestion.properties.label}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Code postal
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                          placeholder="41330"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Ville
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                          placeholder="Fossé"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="vehicleType"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Type de demande *
                        </label>
                        <select
                          id="vehicleType"
                          name="vehicleType"
                          required
                          value={formData.vehicleType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                        >
                          <option value="">Sélectionnez un type</option>
                          <option value="entretien-reparation">Entretien ou réparation poids lourd</option>
                          <option value="achat-pieces">Achat pièces détachées</option>
                          <option value="achat-isuzu">Achat véhicule Isuzu</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none resize-none"
                        placeholder="Décrivez votre besoin..."
                      />
                    </div>

                    {/* Honeypot — invisible pour les humains, rempli par les bots */}
                    <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#001e40] text-white px-8 py-4 rounded-lg hover:bg-[#001429] transition-colors font-medium flex items-center justify-center gap-2"
                      disabled={isSending}
                    >
                      {isSending ? (
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"/>
                        </svg>
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      Envoyer la demande
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pt-8 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-10 h-10 text-[#001e40]" />
              <h2 className="text-3xl font-bold text-slate-900">
                L'Équipe VAL DE LOIRE V.I
              </h2>
            </div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Une équipe de professionnels passionnés à votre service pour garantir la performance de vos véhicules
            </p>
          </div>

          {/* Team Values */}
          <div className="relative bg-[#001e40] rounded-2xl p-8 md:p-12 text-white overflow-hidden">
            {/* Image de fond tramée */}
            <div className="absolute inset-0">
              <img
                src={teamBuildingImage}
                alt="Bâtiment VAL DE LOIRE V.I"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-[#001e40]/70"></div>
            </div>
            
            {/* Contenu */}
            <div className="relative">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Nos Valeurs d'Équipe
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Expertise</h4>
                  <p className="text-slate-300">
                    Une équipe formée et certifiée, spécialisée dans les véhicules poids lourds DAF et Isuzu
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Réactivité</h4>
                  <p className="text-slate-300">
                    Intervention rapide et service de dépannage pour minimiser vos temps d'immobilisation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Proximité</h4>
                  <p className="text-slate-300">
                    À l'écoute de vos besoins pour vous apporter des solutions personnalisées
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Review CTA */}
          <div className="mt-8 bg-white rounded-xl p-8 text-center shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Vous avez apprécié nos services ?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Votre avis nous aide à améliorer nos prestations et à accompagner d'autres professionnels dans le choix de leur partenaire poids lourds.
            </p>
            <a
              href="https://g.page/r/Cd67AFGHlgKhEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#001e40] text-white px-8 py-4 rounded-lg hover:bg-[#001429] transition-colors font-semibold text-lg shadow-md"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              Laisser un avis Google
            </a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Notre Localisation
            </h2>
            <p className="text-lg text-slate-600">
              Facilement accessible depuis toute la région Centre-Val de Loire
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2682.1234567890123!2d1.3234567890123!3d47.6234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4110516040e91%3A0xa102968051006bbe!2s10%20Rue%20des%20Champs%20de%20Foss%C3%A9%2C%2041330%20Foss%C3%A9%2C%20France!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VAL DE LOIRE V.I - Localisation"
            />
          </div>
        </div>
      </section>
    </div>
  );
}