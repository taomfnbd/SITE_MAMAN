import React from 'react';
import SectionManager from '../../cms/SectionManager';
import FadeIn from '../../components/FadeIn';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';
import Testimonials from '../../components/Testimonials';

const Methode = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO 
        title="Pratique Manuelle - Méthode Poyet"
        description="Découvrez la Méthode Poyet, une thérapie manuelle douce issue de l'ostéopathie. Écoute crânienne et harmonisation énergétique à Pierrefonds."
        url="/pratique-manuelle"
        schema={{
            "@context": "https://schema.org",
            "@type": "MedicalTherapy",
            "name": "Méthode Poyet",
            "description": "Thérapie manuelle informationnelle et douce.",
            "alternateName": "Ostéopathie Poyet"
        }}
      />
      <Navbar />
      <PageHeader 
        pageId="methode"
        title="Pratique Manuelle" 
        subtitle="Une approche manuelle qui allie micro-mouvements précis et techniques énergétiques." 
      />
      
      {/* 
        Le contenu est géré par le CMS via SectionManager.
        Les sections par défaut (Intro, Concepts, Disclaimer) sont définies dans SectionManager.jsx
      */}
      <SectionManager pageId="methode" />

      {/* Témoignages (Déplacé depuis l'accueil) */}
      <section className="py-20 md:py-32 px-6 relative z-10 border-t border-white/5">
        <FadeIn>
            <h2 className="text-center text-xs uppercase tracking-[0.2em] text-clay/60 mb-8 md:mb-12">Témoignages</h2>
            <Testimonials />
        </FadeIn>
      </section>

    </div>
  );
};

export default Methode;
