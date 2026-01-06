import React from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import SectionManager from '../cms/SectionManager';

const Contact = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO 
        title="Contact & Rendez-vous"
        description="Prendre rendez-vous au cabinet de Pierrefonds (60). Téléphone : 07 69 05 10 87. Réservation en ligne disponible."
        url="/contact"
      />
      <Navbar />
      <PageHeader pageId="contact" title="Contact & Accès" subtitle="Le cabinet vous accueille à Pierrefonds." />
      <SectionManager pageId="contact" />
    </div>
  );
};

export default Contact;
