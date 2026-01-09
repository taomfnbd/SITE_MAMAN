import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';
import { useCMS } from '../../cms/CMSContext';
import EditableText from '../../cms/EditableText';
import SectionManager from '../../cms/SectionManager';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const LinkItem = ({ link, delay, isEditMode, onDelete, onUpdate }) => {
    const handleUrlEdit = (e) => {
        e.preventDefault();
        const newUrl = prompt("Entrez l'URL du lien :", link.url);
        if (newUrl !== null) onUpdate(link.id, 'url', newUrl);
    };

    return (
      <FadeIn delay={delay} className="group block p-8 border border-white/5 bg-sage/10 hover:border-clay/30 transition-all duration-300 relative">
        {isEditMode && (
            <button 
                onClick={(e) => { e.preventDefault(); onDelete(link.id); }}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Supprimer ce lien"
            >
                <SafeIcon icon={FiIcons.FiTrash2} />
            </button>
        )}
        <div className="flex justify-between items-start">
          <div className="flex-grow pr-8">
            <h3 className="text-xl font-serif text-charcoal group-hover:text-clay transition-colors mb-2">
                <EditableText value={link.title} onChange={(val) => onUpdate(link.id, 'title', val)} />
            </h3>
            <div className="text-charcoal-light font-light text-sm">
                <EditableText value={link.excerpt} onChange={(val) => onUpdate(link.id, 'excerpt', val)} multiline />
            </div>
            {isEditMode && <div className="text-xs text-clay/50 mt-2 truncate">{link.url}</div>}
          </div>
          {isEditMode ? (
              <button onClick={handleUrlEdit} className="text-charcoal/30 hover:text-clay transition-colors p-2" title="Modifier l'URL">
                  <SafeIcon icon={FiIcons.FiLink} className="text-xl" />
              </button>
          ) : (
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-charcoal/30 group-hover:text-clay transition-colors p-2">
                  <SafeIcon icon={FiIcons.FiExternalLink} className="text-xl" />
              </a>
          )}
        </div>
      </FadeIn>
    );
};

const Liens = () => {
  const { articles, createArticle, deleteArticle, updateArticle, isEditMode } = useCMS();
  
  const links = articles.filter(a => a.type === 'link');

  const handleCreate = () => {
      createArticle('link');
  };

  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader pageId="liens" title="Liens Utiles" subtitle="Fédérations, écoles et confrères." />
      
      <SectionManager pageId="liens" />

      <div className="max-w-3xl mx-auto px-6">
        {isEditMode && (
            <div className="mb-12 text-center">
                <button onClick={handleCreate} className="bg-clay text-white px-6 py-3 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2 mx-auto hover:bg-clay/80 transition-colors">
                    <SafeIcon icon={FiIcons.FiPlus} /> Ajouter un Lien
                </button>
            </div>
        )}

        {links.length === 0 && (
            <div className="text-center text-charcoal-light italic py-12 border border-white/5 bg-sage/5 rounded-lg">
                Aucun lien ajouté pour le moment.
            </div>
        )}

        <div className="grid gap-4">
            {links.map((link, index) => (
                <LinkItem 
                    key={link.id} 
                    link={link} 
                    delay={index * 0.1} 
                    isEditMode={isEditMode}
                    onDelete={deleteArticle}
                    onUpdate={updateArticle}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Liens;
