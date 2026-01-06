import React from 'react';
import FadeIn from './FadeIn';
import EditableText from '../cms/EditableText';

const PageHeader = ({ title, subtitle, category, pageId }) => {
  // Helper pour générer des IDs uniques si pageId est fourni
  const getId = (field) => pageId ? `${pageId}.header.${field}` : undefined;

  return (
    <div className="relative pt-28 pb-12 md:pt-40 md:pb-20 px-6 overflow-hidden">
      {/* Texture de fond subtile */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage/10 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          {category && (
            <div className="inline-block mb-4 md:mb-6">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-clay/80 border border-clay/20 px-3 py-1.5 rounded-full">
                {pageId ? <EditableText id={getId('category')} defaultValue={category} /> : category}
              </span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-charcoal mb-4 md:mb-6 leading-tight">
            {pageId ? <EditableText id={getId('title')} defaultValue={title} /> : title}
          </h1>
          
          {subtitle && (
            <div className="text-charcoal-light font-light text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              {pageId ? <EditableText id={getId('subtitle')} defaultValue={subtitle} multiline /> : subtitle}
            </div>
          )}
          
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-clay/50 to-transparent mx-auto mt-8 md:mt-12"></div>
        </FadeIn>
      </div>
    </div>
  );
};

export default PageHeader;
