import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';

const StageRow = ({ date, title, audience, desc, full = false, delay }) => (
  <FadeIn delay={delay} className={`group flex flex-col md:flex-row gap-6 p-6 border-b border-white/5 hover:bg-sage/10 transition-colors ${full ? 'opacity-50 pointer-events-none' : ''}`}>
    <div className="md:w-32 flex-shrink-0">
      <span className="block text-sm font-medium text-clay uppercase tracking-wide">{date}</span>
      <span className="text-[10px] text-charcoal/50 uppercase mt-1 block">{audience}</span>
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-serif text-charcoal mb-2 group-hover:text-clay transition-colors">{title}</h3>
        {full && <span className="text-[10px] uppercase border border-charcoal/30 px-2 py-1 text-charcoal/50">Complet</span>}
      </div>
      <p className="text-charcoal-light font-light text-sm leading-relaxed max-w-2xl">
        {desc}
      </p>
    </div>
    <div className="md:w-24 flex items-center justify-end">
        {!full && <button className="text-xs border-b border-clay/30 pb-0.5 text-clay hover:text-white transition-colors">S'inscrire</button>}
    </div>
  </FadeIn>
);

const Stages = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader category="Calendrier" title="Mes Stages" subtitle="Les prochaines dates où je vous retrouve." />
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/5">
           <StageRow 
            date="12-13 Nov" 
            audience="Ouvert à tous" 
            title="Initiation à l'Écoute Tissulaire" 
            desc="Je vous propose de découvrir vos mains, d'apprendre à vous centrer et percevoir les premiers rythmes du vivant. Un weekend pour soi." 
            delay={0.1} 
          />
           <StageRow 
            date="02-03 Déc" 
            audience="Professionnels" 
            title="Le Crâne du Nouveau-né" 
            desc="Module expert que j'anime pour les thérapeutes manuels et sages-femmes. Plagiocéphalies, torticolis et troubles de la succion." 
            delay={0.2} 
          />
           <StageRow 
            date="20-22 Jan" 
            audience="Tout public" 
            title="Somatothérapie : Le Corps Mémoire" 
            desc="Nous explorerons ensemble les liens entre émotions et tensions physiques. Atelier expérientiel." 
            full={true}
            delay={0.3} 
          />
           <StageRow 
            date="15-16 Fév" 
            audience="Professionnels" 
            title="Posturologie et Poyet" 
            desc="Comprendre les capteurs posturaux (yeux, pieds, mâchoire) et leur harmonisation par la méthode Poyet." 
            delay={0.4} 
          />
        </div>
      </div>
    </div>
  );
};

export default Stages;