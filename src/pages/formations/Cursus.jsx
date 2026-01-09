import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const YearBlock = ({ year, title, modules, delay }) => (
  <FadeIn delay={delay} className="mb-12 last:mb-0 relative pl-8 md:pl-0">
    <div className="md:grid md:grid-cols-[150px_1fr] gap-8">
      <div className="mb-4 md:mb-0">
        <span className="text-6xl font-serif text-charcoal/10 font-bold absolute -left-4 -top-6 md:static md:block md:text-right md:pr-8">
          {year}
        </span>
      </div>
      <div className="border-l border-clay/20 pl-8 py-2">
        <h3 className="text-2xl font-serif text-charcoal mb-6">{title}</h3>
        <ul className="space-y-4">
          {modules.map((mod, idx) => (
            <li key={idx} className="flex items-start gap-3 text-charcoal-light font-light text-sm">
              <SafeIcon icon={FiIcons.FiCheck} className="text-clay mt-1 shrink-0" />
              <span>{mod}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </FadeIn>
);

const Cursus = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader category="Enseignement" title="Cursus Professionnel" subtitle="Je forme les futurs praticiens en Thérapie Manuelle." />
      
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="bg-sage/20 p-8 border border-white/5 mb-16 text-center">
          <p className="text-charcoal-light font-light leading-relaxed">
            Je dispense une formation certifiante en <strong>3 ans</strong>.<br/>
            Cela comprend 6 séminaires de 3 jours par an, un suivi personnalisé, un examen final et la soutenance d'un mémoire.
          </p>
        </FadeIn>

        <div className="space-y-4">
          <YearBlock 
            year="01" 
            title="Les Fondamentaux" 
            delay={0.1} 
            modules={[
              "Le Mouvement Respiratoire Primaire (MRP) : je vous apprends l'écoute et la perception.",
              "Le sacrum et le bassin : bases de l'équilibre que nous étudions en détail.",
              "Le crâne : anatomie et micromouvements des os de la voûte.",
              "Les lois de la méthode Poyet : fluidité et axes."
            ]} 
          />
          <YearBlock 
            year="02" 
            title="La Structure & Les Organes" 
            delay={0.2} 
            modules={[
              "La colonne vertébrale : étude étage par étage.",
              "Les membres inférieurs et supérieurs.",
              "L'approche viscérale : foie, estomac, intestins.",
              "Les chaînes musculaires et énergétiques."
            ]} 
          />
          <YearBlock 
            year="03" 
            title="Clinique & Synthèse" 
            delay={0.3} 
            modules={[
              "Le crâne facial et les sens.",
              "Somato-émotionnel : le corps mémoire.",
              "Pathologies spécifiques et cas cliniques.",
              "Je vous prépare à votre installation professionnelle."
            ]} 
          />
        </div>

        <FadeIn delay={0.4} className="mt-16 text-center">
          <button className="bg-clay text-paper px-8 py-4 uppercase tracking-widest text-xs font-medium hover:bg-white transition-colors duration-500">
            Télécharger le programme PDF
          </button>
        </FadeIn>
      </div>
    </div>
  );
};

export default Cursus;