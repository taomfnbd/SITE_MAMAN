import React from 'react';
import SectionManager from '../../cms/SectionManager';
import FadeIn from '../../components/FadeIn';
import FloatingBookButton from '../../components/FloatingBookButton';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';


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
        title="Méthode Poyet"
      />

      {/* Vidéo + Texte intro */}
      <section className="-mt-6 md:-mt-10 pb-12 md:pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="overflow-hidden text-charcoal-light font-light text-justify text-base md:text-xl md:leading-10 leading-8">
              <video
                src="/methode-poyet-v2.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Démonstration de la Méthode Poyet – thérapie manuelle douce par micro-mouvements à Pierrefonds"
                title="Méthode Poyet – Séance de thérapie manuelle informationnelle"
                className="float-left w-64 md:w-96 mr-6 md:mr-10 mb-4 rounded-sm border border-white/5 shadow-lg"
              />
              <p className="mb-6">La Méthode Poyet est une approche manuelle qui allie micro-mouvements précis et techniques énergétiques pour favoriser l'harmonisation du corps.</p>
              <p>Elle s'adresse à celles et ceux qui recherchent un équilibre global et un bien-être corporel, émotionnel et psychique, sans manipulation structurelle.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/*
        Le contenu est géré par le CMS via SectionManager.
        Les sections par défaut (Intro, Concepts, Disclaimer) sont définies dans SectionManager.jsx
      */}
      <SectionManager pageId="methode" />

      <FloatingBookButton />
    </div>
  );
};

export default Methode;
