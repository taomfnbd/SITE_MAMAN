import React from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import SectionManager from '../cms/SectionManager';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO 
        title="Mentions Légales" 
        description="Mentions légales, éditeur et hébergement du site Floureto Férigoule."
        url="/mentions-legales"
      />
      <Navbar />
      <PageHeader pageId="mentions" title="Mentions Légales" />
      
      <div className="max-w-4xl mx-auto px-6">
        <SectionManager pageId="mentions" />
      </div>
    </div>
  );
};

export default MentionsLegales;
