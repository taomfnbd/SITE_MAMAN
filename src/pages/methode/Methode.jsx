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

      {/* Intro Méthode Poyet (ex-Home) */}
      <section className="py-12 md:py-20 px-6 relative z-10 bg-gradient-to-b from-transparent to-sage/10">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
              <h2 className="text-2xl md:text-4xl font-serif text-charcoal italic px-4">La Méthode Poyet</h2>
              <div className="space-y-6 md:space-y-8 text-charcoal-light font-light text-justify md:text-center text-base md:text-xl md:leading-10 leading-8">
                <p>La Méthode Poyet est une approche manuelle qui allie micro-mouvements précis et techniques énergétiques pour favoriser l'harmonisation du corps.</p>
                <p>Elle s'adresse à celles et ceux qui recherchent un équilibre global et un bien-être corporel, émotionnel et psychique, sans manipulation structurelle.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      
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
