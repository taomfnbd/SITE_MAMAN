import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import LogoFormationBackground from '../../components/LogoFormationBackground';
import FadeIn from '../../components/FadeIn';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useCMS } from '../../cms/CMSContext';
import EditableText from '../../cms/EditableText';

const YearBlock = ({ year, yearId, title, defaultModules, delay }) => {
  const { isEditMode, getContent } = useCMS();
  // We use getContent here to get the raw text for split if not in edit mode
  // But EditableText manages its own state. 
  // We can use EditableText for edit mode and a custom render for view mode?
  // Actually, EditableText is a component. We can't easily extract its value without being inside it or using getContent.
  
  // Strategy: 
  // 1. Get content using getContent(id, default).
  // 2. If isEditMode, render EditableText (multiline).
  // 3. If !isEditMode, render UL by splitting content.
  
  const modulesText = getContent(`${yearId}.modules`, defaultModules.join('\n'));

  return (
    <FadeIn delay={delay} className="mb-12 last:mb-0 relative pl-8 md:pl-0">
      <div className="md:grid md:grid-cols-[150px_1fr] gap-8">
        <div className="mb-4 md:mb-0">
          <span className="text-6xl font-serif text-charcoal/10 font-bold absolute -left-4 -top-6 md:static md:block md:text-right md:pr-8">
            {year}
          </span>
        </div>
        <div className="border-l border-clay/20 pl-8 py-2">
          <h3 className="text-2xl font-serif text-charcoal mb-6">
              <EditableText id={`${yearId}.title`} defaultValue={title} />
          </h3>
          {isEditMode ? (
              <div className="text-charcoal-light font-light text-sm leading-relaxed">
                  <EditableText 
                      id={`${yearId}.modules`} 
                      defaultValue={defaultModules.join('\n')} 
                      multiline 
                      className="whitespace-pre-wrap block"
                  />
              </div>
          ) : (
              <ul className="space-y-4">
                {modulesText.split('\n').filter(m => m.trim()).map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-charcoal-light font-light text-sm">
                    <SafeIcon icon={FiIcons.FiCheck} className="text-clay mt-1 shrink-0" />
                    <span>{mod}</span>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

const Formations = () => {
  return (
    <div className="min-h-screen pb-20 selection:bg-clay/30 relative overflow-hidden">
      <div className="fixed inset-0 bg-paper -z-20"></div>
      <LogoFormationBackground />
      <Navbar />
      <PageHeader 
        pageId="formations"
        title="J'enseigne" 
        subtitle="Transmettre l'art de l'écoute tissulaire et de la présence." 
      />
      
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="bg-sage/20 p-8 border border-white/5 mb-16 text-center">
          <div className="text-charcoal-light font-light leading-relaxed">
            <EditableText 
                id="formations.intro" 
                defaultValue="Je dispense une formation certifiante en 3 ans. Cela comprend 6 séminaires de 3 jours par an, un suivi personnalisé, un examen final et la soutenance d'un mémoire." 
                multiline 
            />
          </div>
        </FadeIn>

        <div className="space-y-4">
          <YearBlock 
            year="01" 
            yearId="formations.year1"
            title="Les Fondamentaux" 
            delay={0.1} 
            defaultModules={[
              "Le Mouvement Respiratoire Primaire (MRP) : je vous apprends l'écoute et la perception.",
              "Le sacrum et le bassin : bases de l'équilibre que nous étudions en détail.",
              "Le crâne : anatomie et micromouvements des os de la voûte.",
              "Les lois de la méthode Poyet : fluidité et axes."
            ]} 
          />
          <YearBlock 
            year="02" 
            yearId="formations.year2"
            title="La Structure & Les Organes" 
            delay={0.2} 
            defaultModules={[
              "La colonne vertébrale : étude étage par étage.",
              "Les membres inférieurs et supérieurs.",
              "L'approche viscérale : foie, estomac, intestins.",
              "Les chaînes musculaires et énergétiques."
            ]} 
          />
          <YearBlock 
            year="03" 
            yearId="formations.year3"
            title="Clinique & Synthèse" 
            delay={0.3} 
            defaultModules={[
              "Le crâne facial et les sens.",
              "Somato-émotionnel : le corps mémoire.",
              "Pathologies spécifiques et cas cliniques.",
              "Je vous prépare à votre installation professionnelle."
            ]} 
          />
        </div>

        <FadeIn delay={0.4} className="mt-16 text-center">
          <button className="bg-clay text-paper px-8 py-4 uppercase tracking-widest text-xs font-medium hover:bg-white transition-colors duration-500">
            <EditableText id="formations.downloadCta" defaultValue="Télécharger le programme PDF" />
          </button>
        </FadeIn>
      </div>
    </div>
  );
};

export default Formations;
