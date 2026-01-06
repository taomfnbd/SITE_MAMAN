import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SectionManager from '../../cms/SectionManager';

const Blog = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader 
        pageId="blog"
        title="Le Blog" 
        subtitle="Actualités du cabinet et billets d'humeur." 
      />
      <SectionManager pageId="blog" />
    </div>
  );
};

export default Blog;
