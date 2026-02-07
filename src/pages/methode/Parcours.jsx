import React from 'react';
import SectionManager from '../../cms/SectionManager';
import FadeIn from '../../components/FadeIn';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';

const Parcours = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO
        title="Qui suis-je ? Parcours & Formations"
        description="Découvrez le parcours de Floureto Férigoule. Enseignante de lettres devenue praticienne en méthode Poyet. Formée à l'ITI Paris et par Pierre Tricot."
        url="/a-propos"
        schema={{
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
                "@type": "Person",
                "name": "Floureto Férigoule",
                "description": "Praticienne en Méthode Poyet et Somatothérapie à Pierrefonds.",
                "jobTitle": "Thérapeute Manuelle",
                "knowsAbout": ["Méthode Poyet", "Somatothérapie", "Écoute Tissulaire"]
            }
        }}
      />
      <Navbar />
      <PageHeader
        pageId="parcours"
        title="Parcours & Formations"
      />

      {/* Photo + intro — en dur, hors CMS */}
      <FadeIn>
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="overflow-hidden text-charcoal-light font-light leading-loose text-justify text-sm md:text-base">
            <img
              src="/photo-therapeute.jpg"
              alt="Floureto Férigoule, praticienne en Méthode Poyet et somatothérapie à Pierrefonds (Oise)"
              className="float-left w-48 md:w-64 mr-6 md:mr-10 mb-4 object-cover"
            />
            <p className="mb-4">La transmission est au centre de ma vie professionnelle depuis plus de vingt ans. Transmettre c'est transporter quelque chose, avec l'idée de passage, de transfert. En athlétisme, le relais est une course dans laquelle on se transmet un témoin. En mécanique on parle également de communication de mouvement d'organe vers un autre au moyen d'un système (engrenage, etc..).</p>
            <p>Toutes ces acceptions sous-tendent l'idée, essentielle pour moi, d'un système collaboratif et participatif. C'est cette posture qui m'anime toujours de la conception à la réalisation des ateliers que je propose.</p>
          </div>
        </div>
      </FadeIn>

      <SectionManager pageId="parcours" />
    </div>
  );
};

export default Parcours;
