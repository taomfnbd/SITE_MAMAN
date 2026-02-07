import React from 'react';
import FadeIn from '../components/FadeIn';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import SectionManager from '../cms/SectionManager';

const Contact = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO
        title="Contact & Rendez-vous"
        description="Prendre rendez-vous au cabinet Floureto Férigoule à Pierrefonds (60). Téléphone : 07 69 05 10 87. Réservation en ligne Resalib. 29 Rue du Mont Berny, 60350."
        url="/contact"
        keywords="rendez-vous méthode Poyet Pierrefonds, contact thérapeute Compiègne, cabinet thérapie manuelle Oise, Resalib Pierrefonds"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Floureto Férigoule - Méthode Poyet",
            "telephone": "07 69 05 10 87",
            "email": "floureto.ferigoule@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "29 Rue du Mont Berny",
              "addressLocality": "Pierrefonds",
              "postalCode": "60350",
              "addressCountry": "FR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 49.349695,
              "longitude": 2.973956
            },
            "areaServed": [
              { "@type": "City", "name": "Pierrefonds" },
              { "@type": "City", "name": "Compiègne" },
              { "@type": "AdministrativeArea", "name": "Oise" }
            ]
          }
        }}
      />
      <Navbar />
      <PageHeader pageId="contact" title="Contact & Accès" subtitle="Le cabinet vous accueille à Pierrefonds." />

      <SectionManager pageId="contact" />
    </div>
  );
};

export default Contact;
