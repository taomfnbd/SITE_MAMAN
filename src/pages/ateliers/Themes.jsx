import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SectionManager from '../../cms/SectionManager';

const Themes = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader 
        pageId="ateliers-themes"
        category="Exploration" 
        title="Thématiques" 
        subtitle="Les piliers de nos ateliers collectifs." 
      />
      
      <div className="max-w-6xl mx-auto px-6">
        <SectionManager pageId="ateliers-themes" />
      </div>
    </div>
  );
};

export default Themes;
