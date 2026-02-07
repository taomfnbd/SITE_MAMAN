import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import { useCMS } from '../../cms/CMSContext';
import EditableText from '../../cms/EditableText';
import SafeIcon from '../../common/SafeIcon';
import FadeIn from '../../components/FadeIn';
import FloatingBookButton from '../../components/FloatingBookButton';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';
import Testimonials from '../../components/Testimonials';

const SeanceCard = ({ idPrefix, title, time, price, description, icon, delay, details, resalibUrl }) => (
  <FadeIn delay={delay} className="group relative bg-sage/10 p-6 md:p-10 border border-white/5 hover:bg-sage/20 transition-all duration-500 h-full flex flex-col">
    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:opacity-20 transition-opacity">
      <SafeIcon icon={icon} className="text-5xl md:text-6xl text-clay" />
    </div>
    <div className="relative z-10 flex-grow">
      <EditableText 
        id={`${idPrefix}_title`} 
        defaultValue={title} 
        as="h3" 
        className="text-xl md:text-2xl font-serif text-charcoal mb-2" 
      />
      <div className="flex items-center gap-4 mb-4 md:mb-6 text-sm font-medium tracking-wide">
        <EditableText 
            id={`${idPrefix}_time`} 
            defaultValue={time} 
            as="span" 
            className="text-charcoal-light" 
        />
        <span className="w-1 h-1 rounded-full bg-charcoal/30"></span>
        <EditableText 
            id={`${idPrefix}_price`} 
            defaultValue={price} 
            as="span" 
            className="text-clay text-lg" 
        />
      </div>
      <EditableText 
        id={`${idPrefix}_desc`} 
        defaultValue={description} 
        multiline 
        className="text-charcoal-light font-light leading-loose mb-6 border-l border-clay/20 pl-4 text-sm" 
      />
      <div className="mb-6 md:mb-8 text-xs text-charcoal/60 space-y-2 font-light">
          <EditableText 
            id={`${idPrefix}_details`} 
            defaultValue={details ? details.join('\n') : ''} 
            multiline 
            className="whitespace-pre-line" 
            placeholder="Détails (un par ligne)..."
          />
      </div>
    </div>
    <a 
      href={resalibUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-block text-center text-xs uppercase tracking-widest text-charcoal border border-white/10 px-6 py-3 hover:bg-clay hover:text-paper hover:border-transparent transition-all duration-300 w-full focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:outline-none"
    >
      Réserver en ligne
    </a>
  </FadeIn>
);

const PricingPhilosophy = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultPhiloText = `La question du juste prix est épineuse. Comment évaluer le juste prix ? A l'aune de quels critères : le temps passé ? Les compétences ? L'engagement ?

Le système de sécurité sociale en France permet à chacun.e d'accéder à des soins sans verser d'argent direct. Ce système a cependant un effet pervers : nous sommes parfois peu capables d'estimer le prix des soins reçus.

Je ne travaille pas dans le domaine du soin médical conventionné, aussi j'ai la liberté de fixer mes tarifs. Pour autant, je m'inscris pleinement dans les métiers du « care » (sollicitude, accompagnement).

Voici ce que je mets dans la balance : le temps passé (1h15), mon implication dans les formations continues, mes lectures, mon développement personnel. Je considère que cet investissement quotidien nourrit mon savoir-faire et mon avoir-être.`;

  return (
    <div className="bg-paper border border-white/5 overflow-hidden transition-all duration-500">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 md:p-6 flex justify-between items-center text-left hover:bg-sage/10 transition-colors focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:outline-none"
        aria-expanded={isOpen}
        aria-label="Ouvrir la réflexion sur le juste prix"
      >
        <span className="font-serif text-base md:text-lg text-charcoal italic">Réflexion sur le "juste prix"</span>
        <SafeIcon 
            icon={FiIcons.FiChevronDown} 
            className={`text-clay transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="p-4 md:p-6 pt-0 text-sm font-light text-charcoal-light leading-loose space-y-4 border-t border-white/5">
          <EditableText 
            id="seances_philo" 
            defaultValue={defaultPhiloText} 
            multiline 
            className="whitespace-pre-line" 
          />
        </div>
      </div>
    </div>
  );
};

const Seances = () => {
  const { resalibUrl } = useCMS();
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Cabinet Floureto Férigoule",
    "description": "Cabinet de thérapie manuelle méthode Poyet.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Séances de Thérapie Manuelle",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Séance Adulte",
            "description": "Anamnèse complète et harmonisation profonde (1h15)."
          },
          "price": "70.00",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Séance Enfant (-7 ans)",
            "description": "Séance adaptée aux jeunes enfants (1h00)."
          },
          "price": "60.00",
          "priceCurrency": "EUR"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO 
        title="Tarifs & Séances"
        description="Tarifs des consultations de méthode Poyet à Pierrefonds. Séance adulte 70€, enfant 60€. Forfaits disponibles pour le suivi."
        url="/pratique-manuelle/seances"
        schema={schema}
      />
      <Navbar />
      <PageHeader 
        title={<EditableText id="seances_header_title" defaultValue="La Séance" />}
        subtitle="Tarifs et informations pratiques"
      />
      
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Photo du cabinet + intro */}
        <FadeIn className="mb-8 md:mb-10">
          <div className="overflow-hidden text-charcoal-light font-light leading-loose text-sm md:text-base">
            <img
              src="/cabinet.jpg"
              alt="Intérieur du cabinet de thérapie manuelle Floureto Férigoule à Pierrefonds, Oise – Méthode Poyet"
              className="float-left w-48 md:w-72 mr-6 md:mr-10 mb-4 object-contain rounded-sm"
            />
            <EditableText
              id="seances_intro"
              defaultValue="La méthode Poyet est une approche globale. Il faut du temps pour développer les points que vous souhaitez aborder. De mon côté, j'ai besoin de temps pour mettre en place une écoute active."
              multiline
              className="text-justify"
            />
          </div>
        </FadeIn>

        {/* Témoignages */}
        <FadeIn className="mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="border-t border-white/5 pt-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-clay/60 mb-2 text-center">Témoignages</h3>
            <Testimonials />
          </div>
        </FadeIn>

        {/* Cartes Tarifs */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <SeanceCard
            idPrefix="seance_adult"
            title="Séance Adulte"
            time="1h15"
            price="70 €"
            description="Le temps nécessaire pour une anamnèse complète et une harmonisation profonde. Sur le dos, sur le ventre ou assis."
            details={["Forfait 2 séances : 135 €", "Forfait 3 séances : 195 €"]}
            icon={FiIcons.FiUser}
            delay={0}
            resalibUrl={resalibUrl}
          />
          <SeanceCard
            idPrefix="seance_child"
            title="Enfant (-7 ans)"
            time="~1h00"
            price="60 €"
            description="Adapté aux plus jeunes. Présence d'un parent requise. Idéal pour les troubles du sommeil, coliques, ou après la naissance."
            details={["Forfait 2 séances : 110 €"]}
            icon={FiIcons.FiSmile}
            delay={0.2}
            resalibUrl={resalibUrl}
          />
          <SeanceCard
            idPrefix="seance_duo"
            title="Duo / Autre"
            time="Durée"
            price="Prix"
            description="Une troisième option pour les séances spécifiques ou les duos parent-enfant."
            details={["Détails supplémentaires..."]}
            icon={FiIcons.FiUsers}
            delay={0.4}
            resalibUrl={resalibUrl}
          />
        </div>

        {/* Philosophie Prix */}
        <FadeIn delay={0.4} className="mb-12 md:mb-16 max-w-2xl mx-auto">
          <PricingPhilosophy />
        </FadeIn>

        {/* Infos Pratiques */}
        <FadeIn className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-[1px] bg-clay/30 mx-auto mb-6"></div>
            <h3 className="text-lg md:text-xl font-serif text-charcoal italic mb-10">
                <EditableText id="seances_infos_title" defaultValue="Informations Pratiques" />
            </h3>
            <div className="grid md:grid-cols-3 gap-10 text-sm font-light text-charcoal-light">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-clay/20 flex items-center justify-center">
                        <SafeIcon icon={FiIcons.FiLayers} className="text-lg text-clay" />
                    </div>
                    <EditableText
                        id="seances_info_1"
                        defaultValue={"Venez avec une\ntenue souple et confortable."}
                        multiline
                        className="whitespace-pre-line text-center leading-relaxed"
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-clay/20 flex items-center justify-center">
                        <SafeIcon icon={FiIcons.FiClock} className="text-lg text-clay" />
                    </div>
                    <EditableText
                        id="seances_info_2"
                        defaultValue={"Prévoyez 1h15\nde disponibilité."}
                        multiline
                        className="whitespace-pre-line text-center leading-relaxed"
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-clay/20 flex items-center justify-center">
                        <SafeIcon icon={FiIcons.FiCreditCard} className="text-lg text-clay" />
                    </div>
                    <EditableText
                        id="seances_info_3"
                        defaultValue={"Règlement Chèque\nou Espèces."}
                        multiline
                        className="whitespace-pre-line text-center leading-relaxed"
                    />
                </div>
            </div>
        </FadeIn>


      </div>
      <FloatingBookButton />
    </div>
  );
};

export default Seances;
