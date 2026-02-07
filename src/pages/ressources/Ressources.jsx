import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';
import SectionManager from '../../cms/SectionManager';

const Ressources = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO
        title="Ressources & Bibliographie"
        description="Livres, lectures et liens utiles pour approfondir la méthode Poyet, la somatothérapie et l'écoute tissulaire. Ressources sélectionnées par Floureto Férigoule."
        url="/ressources"
        keywords="Méthode Poyet ressources, bibliographie thérapie manuelle, lectures somatothérapie, liens utiles ostéopathie"
      />
      <Navbar />
      <PageHeader 
        pageId="ressources"
        title="Ressources" 
        subtitle="Nourrir l'esprit pour comprendre le corps." 
      />
      <SectionManager pageId="ressources" />
    </div>
  );
};

export default Ressources;
