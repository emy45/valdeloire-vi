import { FileText } from "lucide-react";
import { Seo } from "../components/Seo";

export function CGV() {
  return (
    <div>
      <Seo
        title="Conditions Générales de Vente"
        description="Conditions générales de vente de VAL DE LOIRE V.I, agent DAF officiel à Blois."
        path="/cgv"
      />
      {/* Hero Section */}
      <section className="relative bg-[#001e40] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Conditions Générales de Vente
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl">
            Pièces de rechange et prestations de réparation de véhicules industriels et utilitaires
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <div className="bg-slate-50 border-l-4 border-[#001e40] p-6 mb-8 rounded-r-lg">
              <p className="text-slate-700 text-justify leading-relaxed mb-0">
                Sauf stipulation contraires par nous écrites, nos ventes sont faites aux
                présentes conditions générales de vente. En contractant avec l'entreprise,
                le client accepte donc intégralement et sans réserve ces conditions. Il
                reconnait avoir eu connaissance :
              </p>
              <ul className="mt-4 text-slate-700 space-y-2">
                <li>soit lors de la signature de la demande d'ouverture de compte.</li>
                <li>soit par la lecture des conditions générales de vente affichées dans notre établissement, lors de la signature de l'ordre de la réparation, ou lors de la prise des pièces de rechange à nos guichets.</li>
              </ul>
            </div>

            <div className="space-y-8">
              {/* Article 1 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">1</span>
                  ESTIMATIONS / DEVIS
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    A la réception du véhicule et à la demande du client, il sera établi soit une
                    estimation, soit un devis des réparations à effectuer sur son véhicule.
                  </p>
                  <p>
                    L'estimation est une indication sans démontage, fournie gratuitement, sur
                    la nature des opérations à effectuer et sur le coût approximatif de la
                    réparation. Le devis est une liste détaillée et chiffrée des opérations à
                    réaliser avec le démontage éventuel ou étude préalable, et dont le
                    montant engage le réparateur qui est facturé au client.
                  </p>
                  <p>
                    Le cas échéant, si les réparations faisant l'objet du devis sont ensuite commandées au
                    réparateur par le client, par l'établissement d'un ordre de réparation, les
                    frais d'établissement du devis lui seront remboursés au moment de la
                    facturation.
                  </p>
                </div>
              </div>

              {/* Article 2 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">2</span>
                  ORDRE DE RÉPARATION
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    A la réception du véhicule, qu'un devis ait été établi ou non, il est rédigé
                    un ordre de réparation sur lequel est indiqué, selon le cas, soit le détail des
                    travaux à effectuer, soit la seule réception du véhicule dans l'attente d'une
                    commande de travaux.
                  </p>
                  <p>
                    La signature de l'ordre de réparation par le client
                    vaut consentement du client à l'application des présentes conditions
                    générales de réparation ainsi qu'acceptation des tarifs mentionnés sur le
                    devis, si un avis a été préalablement réalisé.
                  </p>
                  <p>
                    Lorsque le client passe
                    commande de travaux postérieurement à la réception du véhicule, ces
                    travaux supplémentaires feront l'objet d'un nouvel ordre de réparation
                    enregistrant le détail de ces travaux.
                  </p>
                </div>
              </div>

              {/* Article 3 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">3</span>
                  DÉCHARGES DE RESPONSABILITÉ
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    Pour des raisons de sécurité, le réparateur peut être amené à proposer au
                    client des réparations complémentaires. Si le client refuse de les effectuer,
                    le réparateur lui fera signer une décharge de responsabilité.
                  </p>
                </div>
              </div>

              {/* Article 4 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">4</span>
                  PIÈCES DE RECHANGE LORS DE RÉPARATION
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    Si le réparateur n'utilise pas pour ses travaux des pièces neuves d'origine
                    constructeur, il en informe le client notamment par une mention précise
                    sur l'ordre de réparation et/ou sur la facture.
                  </p>
                  <p>
                    Le client peut voir les pièces remplacées s'il en a fait la demande sur
                    l'ordre de réparation ou au plus tard au moment de la livraison. Ces pièces
                    pourront lui être restituées à l'exception des pièces d'échange standard ou
                    sous garantie. Les pièces non réclamées au moment de la livraison ne
                    seront pas récupérables par le client : elles deviennent la propriété du
                    réparateur.
                  </p>
                  <p>
                    Le réparateur est libre d'accepter ou de refuser pour motif
                    légitime de monter des pièces fournies par le client. Lorsqu'il l'accepte
                    mention en sera faite sur l'ordre de réparation ou sur la facture
                    correspondante, avec indication des pièces fournies.
                  </p>
                  <p>
                    Si une avarie est
                    provoquée par la défectuosité de l'une de ces pièces fournies par le client,
                    la responsabilité du réparateur ne saurait être engagée. Il pourra se voir
                    appliquer un tarif spécifique.
                  </p>
                </div>
              </div>

              {/* Article 5 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">5</span>
                  LIVRAISON DE PIÈCES DE RECHANGE
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    En cas de livraison souhaitée par le client, les pièces de rechange
                    commandées sont expédiées, en fonction de leurs poids et dimensions,
                    selon le mode de transport fixé par VAL DE LOIRE V.I. Ainsi, VAL DE LOIRE
                    V.I. n'est pas responsable des avaries occasionnées au cours du transport.
                  </p>
                  <p>
                    De façon à éviter tout litige, le client est tenu d'inscrire des réserves sur le
                    document présenté par le transporteur, ainsi que de confirmer au
                    transporteur ses réserves motivées, par lettre recommandée postée dans
                    les 3 jours ouvrés suivant la réception de la commande (article L.133-3 du
                    Code de commerce). Le non-respect de ces formalités empêche toute
                    action contre le transporteur.
                  </p>
                  <p>
                    Les pièces de rechange commandées
                    spécialement à la demande du client ne seront ni reprises ni échangées.
                    Pour les autres pièces de rechange, les retours ne seront acceptés que
                    pour les pièces non utilisées, non montées et restituées dans leur
                    emballage et état d'origine et dans les 5 jours suivant la livraison ou
                    l'enlèvement desdites pièces au comptoir.
                  </p>
                </div>
              </div>

              {/* Article 6 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">6</span>
                  ESSAIS
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    Le carburant et tous les autres frais nécessaire aux essais (y compris essais
                    prolongés) sera à la charge du client.
                  </p>
                </div>
              </div>

              {/* Article 7 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">7</span>
                  DATE LIMITE DE LIVRAISON
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    Conformément à l'article L114-1 du Code de la Consommation, le
                    réparateur s'engage à indiquer au client la date limite à laquelle il pourra
                    récupérer son véhicule.
                  </p>
                  <p>
                    Toutefois, dans le cas où le début d'exécution des
                    travaux est subordonné à l'avis d'un tiers, que le client aura indiqué au
                    réparateur à la rubrique « informations complémentaires » de l'ordre de
                    réparation, la date limite de livraison sera reportée d'un délai égal à celui
                    courant entre le jour de la signature de l'ordre de réparation et le jour de
                    l'avis définitif donné par ledit tiers sur les travaux commandés.
                  </p>
                </div>
              </div>

              {/* Article 8 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">8</span>
                  PAIEMENT
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    Nos factures sont payables auprès du garage, au comptant, sauf
                    dérogation particulière. En cas de retard de paiement et à compter d'une
                    mise en demeure de payer, des pénalités seront appliquées d'un montant
                    égal à celui inscrit sur la facture.
                  </p>
                  <p>
                    Les réparations sont payables selon les
                    modalités convenues comme indiquées à l'article 2, même si le client a
                    l'intention d'invoquer la garantie. Celle-ci ne peut éventuellement être
                    accordée qu'après examen technique des pièces incriminées et dans les
                    conditions prévues dans le contrat de vente du véhicule, ou des pièces de
                    rechange concernées, selon le cas.
                  </p>
                </div>
              </div>

              {/* Article 9 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">9</span>
                  DROIT DE RÉTENTION
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    En application de l'article 1948 du Code Civil, le réparateur peut retenir le
                    véhicule jusqu'à l'entier paiement de la facture.
                  </p>
                </div>
              </div>

              {/* Article 10 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">10</span>
                  INDEMNITÉS D'ENCOMBREMENT
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    Si le client ne vient pas récupérer son véhicule dans les 48 heures qui
                    suivent la mise à disposition de son véhicule, et sauf accord express du
                    vendeur, une lettre recommandée lui sera adressée le mettant en
                    demeure de se présenter au garage.
                  </p>
                  <p>
                    Si cette mise en demeure reste sans
                    effet pendant 24 heures, une indemnité d'encombrement sera facturée au
                    client au tarif journalier affiché dans l'entreprise.
                  </p>
                </div>
              </div>

              {/* Article 11 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">11</span>
                  CONSIGNES
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    Le réparateur n'est responsable que des accessoires et appareils fixés au
                    véhicule, ainsi que du niveau de carburant noté à l'entrée du véhicule à
                    l'atelier.
                  </p>
                </div>
              </div>

              {/* Article 12 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">12</span>
                  ASSURANCE
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    Le réparateur est étranger à toute contestation, quel qu'en soit l'objet,
                    pouvant survenir entre une compagnie d'assurance et le client ayant
                    commandé des réparations sur son véhicule à la suite d'un accident. Le
                    client est, en tout état de cause, tenu vis-à-vis du réparateur du paiement
                    intégral des réparations.
                  </p>
                </div>
              </div>

              {/* Article 13 */}
              <div className="border-b border-slate-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#001e40] text-white rounded-lg text-lg">13</span>
                  LITIGES ET RÉCLAMATIONS
                </h2>
                <div className="text-slate-700 space-y-4 text-justify">
                  <p>
                    En cas de litige, et à défaut de solution amiable, l'affaire sera portée
                    devant le tribunal compétent.
                  </p>
                  <p>
                    En cas de litige des facturations, vous devez
                    formuler votre déclaration à VAL DE LOIRE V.I., au plus tard huit jours
                    après la reprise de votre véhicule réparé ou la livraison des pièces. En tout
                    été de cause ; la totalité de la créance est exigible tant que les éventuels
                    avoirs de régularisations n'ont pas été émis.
                  </p>
                </div>
              </div>

              {/* Dispositions finales */}
              <div className="bg-[#001e40] text-white rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">Dispositions finales</h2>
                <div className="space-y-4 text-slate-200 text-justify">
                  <p>
                    Toute stipulation contraire aux présentes conditions générales n'entraîne
                    pas novation sur le tout, celles-ci demeurant valables sur tous les points
                    auxquels il n'est pas expressément dérogé.
                  </p>
                  <p>
                    L'acheteur reconnaît avoir pris connaissance des conditions générales de
                    vente ainsi que des conditions de garanties établies par VAL DE LOIRE V.I. Il
                    en résulte que l'acheteur déclare très expressément reconnaître que pour
                    les pièces de rechange présentement facturées par VAL DE LOIRE V.I.
                    s'appliqueront les dispositions de la loi n° 80-335 du 12 mai 1980.
                  </p>
                  <p>
                    Il en
                    résulte que pour les pièces de rechange facturées le transfert de propriété
                    de VAL DE LOIRE V.I. à l'acheteur est suspendu jusqu'au paiement intégral
                    du prix desdits matériels par le dit acheteur.
                  </p>
                  <p>
                    L'acheteur déclare reconnaître comme parfaitement valide la clause
                    développée ci-dessus, compte tenu du fait qu'elle crée une convention
                    passée antérieurement à la restitution du matériel par VAL DE LOIRE V.I.
                  </p>
                  <p>
                    Il en résulte que, conformément aux dispositions de la loi du 12 mai 1980,
                    dans le cas de l'ouverture d'une procédure collective VAL DE LOIRE V.I
                    aura le droit de revendiquer les pièces de rechange dans les conditions
                    prévues par la loi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
