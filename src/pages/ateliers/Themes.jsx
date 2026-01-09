import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const ThemeCard = ({ icon, title, desc, delay }) => (
  <FadeIn delay={delay} className="bg-paper p-8 border border-white/5 hover:border-clay/30 transition-all duration-500 group h-full">
    <SafeIcon icon={icon} className="text-3xl text-clay mb-6 group-hover:scale-110 transition-transform" />
    <h3 className="text-xl font-serif text-charcoal mb-4">{title}</h3>
    <p className="text-charcoal-light font-light text-sm leading-relaxed">
      {desc}
    </p>
  </FadeIn>
);

const Themes = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader category="Exploration" title="Thématiques" subtitle="Les piliers de nos ateliers collectifs." />
      
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        <ThemeCard 
          icon={FiIcons.FiWind}
          title="Le Souffle Libéré"
          desc="Explorer le diaphragme, muscle de l'âme. Apprendre à respirer dans ses trois étages pour masser les organes et apaiser le mental."
          delay={0.1}
        />
        <ThemeCard 
          icon={FiIcons.FiAnchor}
          title="Ancrage & Terre"
          desc="Retrouver la sensation de ses pieds. Construire sa sécurité intérieure en s'appuyant sur la gravité. Idéal pour les esprits dispersés."
          delay={0.2}
        />
        <ThemeCard 
          icon={FiIcons.FiActivity} // Using Activity instead of Heart for generic vitality
          title="Automassage Do-In"
          desc="Techniques japonaises de pressions et tapotements pour relancer la circulation énergétique le long des méridiens."
          delay={0.3}
        />
        <ThemeCard 
          icon={FiIcons.FiMoon}
          title="Sommeil & Repos"
          desc="Comprendre les cycles du sommeil et pratiquer des rituels de détente pour préparer des nuits réparatrices."
          delay={0.4}
        />
        <ThemeCard 
          icon={FiIcons.FiSmile} // Using Smile for emotion
          title="Émotions & Corps"
          desc="Localiser les tensions émotionnelles dans le corps et apprendre à les 'fondre' par la présence bienveillante."
          delay={0.5}
        />
        <ThemeCard 
          icon={FiIcons.FiSun}
          title="Vitalité Saisonnière"
          desc="S'accorder aux rythmes des saisons selon la médecine chinoise. Alimentation, mouvement et hygiène de vie."
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default Themes;