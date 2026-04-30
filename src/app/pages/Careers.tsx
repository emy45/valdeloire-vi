import { Briefcase, Users, TrendingUp, Handshake, Send, Upload } from "lucide-react";
import { useState } from "react";
import teamHeroImage from "figma:asset/6fef338cc0bc39920892e4213baf72f5a492a514.png";
import { Seo } from "../components/Seo";

interface JobOffer {
  id: string;
  title: string;
  contract: string;
  location: string;
  department: string;
  description: string;
  requirements: string[];
  advantages: string[];
}

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    cv: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const jobOffers: JobOffer[] = [
    {
      id: "mecanicien-pl",
      title: "Mécanicien Poids Lourds Expérimenté",
      contract: "CDI",
      location: "Fossé (41330)",
      department: "Atelier",
      description:
        "Nous recherchons un mécanicien poids lourds expérimenté pour rejoindre notre équipe d'atelier. Vous interviendrez sur l'entretien et la réparation de véhicules poids lourds, principalement de marque DAF.",
      requirements: [
        "Formation en mécanique poids lourds (CAP/BEP minimum)",
        "Expérience de 3 ans minimum sur poids lourds",
        "Connaissance de la marque DAF appréciée",
        "Maîtrise des outils de diagnostic",
        "Autonomie et rigueur professionnelle",
      ],
      advantages: [
        "CDI avec rémunération attractive selon expérience",
        "Prime de performance",
        "Mutuelle d'entreprise",
        "Équipement professionnel de qualité",
        "Formation continue",
      ],
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        cv: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let cvBase64: string | null = null;
      let cvName: string | null = null;

      if (formData.cv) {
        cvName = formData.cv.name;
        cvBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            // Extraire uniquement la partie base64 (sans le préfixe data:...)
            resolve(result.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.cv as File);
        });
      }

      const response = await fetch('/api/send-candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          message: formData.message,
          cvBase64,
          cvName,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          message: "",
          cv: null,
        });
        setSelectedJob(null);
      }, 8000);
    } catch (error) {
      alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <Seo
        title="Nous rejoindre — Recrutement mécanicien poids lourds"
        description="VAL DE LOIRE V.I recrute. Découvrez nos offres d'emploi de mécanicien et technicien poids lourds à Fossé près de Blois (41). Rejoignez l'équipe d'un agent DAF officiel."
        path="/nous-rejoindre"
      />
      {/* Hero Section */}
      <section className="relative bg-[#001e40] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={teamHeroImage}
            alt="Équipe Val de Loire VI"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#001e40]/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Rejoignez Notre Équipe
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl">
            Intégrez une entreprise dynamique et développez vos compétences dans le secteur des poids lourds
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Pourquoi Rejoindre Val de Loire VI ?
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Nous offrons un environnement de travail stimulant et des opportunités d'évolution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#001e40] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                Équipe Passionnée
              </h3>
              <p className="text-sm md:text-base text-slate-600">
                Travaillez avec des professionnels expérimentés dans un esprit d'entraide
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#001e40] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                Formation Continue
              </h3>
              <p className="text-sm md:text-base text-slate-600">
                Développez vos compétences avec des formations régulières DAF et Isuzu
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#001e40] rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                Avantages Sociaux
              </h3>
              <p className="text-sm md:text-base text-slate-600">
                Mutuelle, primes, équipements professionnels de qualité
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#001e40] rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                Stabilité
              </h3>
              <p className="text-sm md:text-base text-slate-600">
                CDI dans une entreprise en croissance, membre du Groupe Sodimavi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Offers */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Les Offres d'Emploi du Groupe SODIMAVI
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Découvrez nos postes ouverts et rejoignez notre équipe
            </p>
          </div>

          <div className="space-y-6">
            {jobOffers.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#001e40] text-white">
                          {job.contract}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                          {job.department}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedJob(selectedJob === job.id ? null : job.id)
                      }
                      className="bg-[#001e40] text-white px-6 py-3 rounded-lg hover:bg-[#001429] transition-colors font-medium whitespace-nowrap"
                    >
                      {selectedJob === job.id ? "Masquer" : "Voir l'offre"}
                    </button>
                  </div>

                  {selectedJob === job.id && (
                    <div className="mt-6 pt-6 border-t border-slate-200 space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">
                          Description du poste
                        </h4>
                        <p className="text-slate-600 text-justify">{job.description}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">
                          Profil recherché
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-[#001e40] mt-1">•</span>
                              <span className="text-slate-600 text-justify">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">
                          Nous proposons
                        </h4>
                        <ul className="space-y-2">
                          {job.advantages.map((adv, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-[#001e40] mt-1">•</span>
                              <span className="text-slate-600 text-justify">{adv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setFormData({ ...formData, position: job.title });
                            document
                              .getElementById("application-form")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-[#001e40] text-white px-6 py-3 rounded-lg hover:bg-[#001429] transition-colors font-medium"
                        >
                          Postuler à cette offre
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Presentation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Val de Loire VI, entreprise du groupe Sodimavi
              </h2>
              <div className="space-y-4 text-slate-600 text-lg">
                <p className="text-justify">
                  Chez <strong className="text-[#001e40]">Sodimavi</strong>, entreprise leader dans la vente, l'entretien et la réparation de véhicules industriels, nous sommes constamment à la recherche de nouveaux talents pour renforcer notre équipe. Depuis plus de <strong>70 ans</strong>, nous mettons notre expertise et notre savoir-faire au service de nos clients.
                </p>
                <p className="text-justify">
                  Ainsi, nous élargissons aujourd'hui notre équipe dans tous les domaines d'activité, mais particulièrement dans le secteur de la mécanique.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#001e40] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#001e40] mb-2">125</div>
                <div className="text-slate-600">Collaborateurs</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#001e40] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#001e40] mb-2">70+</div>
                <div className="text-slate-600">Années d'expertise</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#001e40] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#001e40] mb-2">8</div>
                <div className="text-slate-600">Agences en France</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#001e40] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#001e40] mb-2">2500</div>
                <div className="text-slate-600">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Candidature Spontanée
            </h2>
            <p className="text-lg text-slate-600">
              Vous ne trouvez pas l'offre qui vous correspond ? Envoyez-nous votre
              candidature spontanée
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Candidature envoyée !
                </h3>
                <p className="text-slate-600">
                  Nous avons bien reçu votre candidature. Nous reviendrons vers vous
                  dans les meilleurs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                      placeholder="Jean"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                      placeholder="Dupont"
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
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Poste recherché *
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none"
                    placeholder="Ex: Mécanicien poids lourds"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cv"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    CV (PDF, max 5Mo) *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      accept=".pdf"
                      required
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="cv"
                      className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:border-[#001e40] transition-colors"
                    >
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">
                        {formData.cv
                          ? formData.cv.name
                          : "Cliquez pour télécharger votre CV"}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Message / Lettre de motivation *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001e40] focus:border-transparent outline-none resize-none"
                    placeholder="Présentez-vous et expliquez votre motivation..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#001e40] text-white px-8 py-4 rounded-lg hover:bg-[#001429] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer ma candidature
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}