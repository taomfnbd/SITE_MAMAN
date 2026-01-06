import React from 'react';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import SectionManager from '../cms/SectionManager';

const Home = () => {
  return (
    <div className="min-h-screen bg-paper overflow-x-hidden relative selection:bg-clay/30">
      <SEO 
        title="Cabinet de Thérapie Manuelle"
        description="Cabinet Floureto Férigoule à Pierrefonds. Pratique manuelle Méthode Poyet douce et énergétique pour adultes, enfants et nourrissons. Proche Compiègne."
      />
      
      <div className="fixed inset-0 bg-grain pointer-events-none z-[1]"></div>
      <Navbar />

      {/* 
        Le contenu de la page est entièrement géré par le CMS via SectionManager.
        Les sections par défaut (Hero, Méthode, etc.) sont définies dans SectionManager.jsx
        et sont chargées automatiquement si aucune donnée n'est sauvegardée.
      */}
      <SectionManager pageId="home" />
      
    </div>
  );
};

export default Home;
