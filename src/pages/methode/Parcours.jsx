import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';
import SectionManager from '../../cms/SectionManager';

const Parcours = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO 
        title="Qui suis-je ? Parcours & Formations"
        description="Découvrez le parcours de Floureto Férigoule. Enseignante de lettres devenue praticienne en méthode Poyet. Formée à l'ITI Paris et par Pierre Tricot."
        url="/methode/parcours"
      />
      <Navbar />
      <PageHeader 
        pageId="parcours"
        title="Parcours & Formations"
        subtitle="De l'enseignement des Lettres à l'écoute tissulaire."
      />
      
      <SectionManager pageId="parcours" />
    </div>
  );
};

export default Parcours;
