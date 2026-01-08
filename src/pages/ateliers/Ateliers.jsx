import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';
import { useCMS } from '../../cms/CMSContext';
import EditableText from '../../cms/EditableText';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const StageRow = ({ stage, delay, isEditMode, onUpdate, onDelete }) => {
  const { uploadImage, addToast } = useCMS();
  const fileInputRef = React.useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // Limit to 10MB
        alert("Le fichier est trop volumineux (max 10Mo).");
        return;
      }
      
      addToast("Envoi du fichier en cours...", "info");
      // Utilise le bucket 'cms-images' par défaut (ou un autre si configuré)
      const publicUrl = await uploadImage(file);
      
      if (publicUrl) {
        onUpdate(stage.id, 'file', publicUrl);
        addToast("Fichier ajouté avec succès", "success");
      }
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    if(confirm("Supprimer la pièce jointe ?")) {
        onUpdate(stage.id, 'file', '');
    }
  }

  return (
    <FadeIn delay={delay} className={`group flex flex-col md:flex-row gap-6 p-6 border-b border-white/5 hover:bg-sage/10 transition-colors ${stage.full && !isEditMode ? 'opacity-50 pointer-events-none' : ''} relative`}>
      {isEditMode && (
          <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
              <button 
                  onClick={handleFileClick}
                  className="p-2 bg-clay text-white rounded-full hover:bg-clay/80 transition-colors"
                  title="Télécharger une pièce jointe (PDF, etc.)"
              >
                  <SafeIcon icon={FiIcons.FiPaperclip} />
              </button>
              {stage.file && (
                  <button 
                      onClick={handleRemoveFile}
                      className="p-2 bg-charcoal text-white rounded-full hover:bg-charcoal/80 transition-colors"
                      title="Supprimer la pièce jointe"
                  >
                      <SafeIcon icon={FiIcons.FiX} />
                  </button>
              )}
              <button 
                  onClick={(e) => { e.preventDefault(); onDelete(stage.id); }}
                  className="p-2 bg-red-500 text-white rounded-full"
                  title="Supprimer ce stage"
              >
                  <SafeIcon icon={FiIcons.FiTrash2} />
              </button>
          </div>
      )}
      <div className="md:w-32 flex-shrink-0">
        <span className="block text-sm font-medium text-clay uppercase tracking-wide">
            <EditableText value={stage.date} onChange={(val) => onUpdate(stage.id, 'date', val)} />
        </span>
        <span className="text-[10px] text-charcoal/50 uppercase mt-1 block">
            <EditableText value={stage.audience} onChange={(val) => onUpdate(stage.id, 'audience', val)} />
        </span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-serif text-charcoal mb-2 group-hover:text-clay transition-colors w-full">
              <EditableText value={stage.title} onChange={(val) => onUpdate(stage.id, 'title', val)} />
          </h3>
          {isEditMode ? (
              <button 
                  onClick={() => onUpdate(stage.id, 'full', !stage.full)}
                  className={`text-[10px] uppercase border px-2 py-1 ml-2 whitespace-nowrap ${stage.full ? 'border-red-300 text-red-500' : 'border-green-300 text-green-500'}`}
              >
                  {stage.full ? 'Complet' : 'Disponible'}
              </button>
          ) : (
              stage.full && <span className="text-[10px] uppercase border border-charcoal/30 px-2 py-1 text-charcoal/50 whitespace-nowrap ml-2">Complet</span>
          )}
        </div>
        <div className="text-charcoal-light font-light text-sm leading-relaxed max-w-2xl">
            <EditableText value={stage.desc} onChange={(val) => onUpdate(stage.id, 'desc', val)} multiline />
        </div>
        {stage.file && (
            <div className="mt-4">
                <a href={stage.file} download="document" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-clay flex items-center gap-2 hover:underline">
                    <SafeIcon icon={FiIcons.FiPaperclip} /> Télécharger la pièce jointe
                </a>
            </div>
        )}
      </div>
      <div className="md:w-24 flex items-center justify-end">
          {!stage.full && <button className="text-xs border-b border-clay/30 pb-0.5 text-clay hover:text-white transition-colors">S'inscrire</button>}
      </div>
    </FadeIn>
  );
};

const Ateliers = () => {
  const { articles, createArticle, deleteArticle, updateArticle, isEditMode } = useCMS();
  
  const stages = articles.filter(a => a.type === 'stage');

  const handleCreate = () => {
      createArticle('stage');
  };

  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader 
        pageId="ateliers"
        title="Ateliers Corps & Conscience"
        subtitle="Pratiquer ensemble pour cultiver l'autonomie."
      />
      
      <div className="max-w-5xl mx-auto px-6">
        {isEditMode && (
            <div className="mb-8 text-center">
                <button onClick={handleCreate} className="bg-clay text-white px-6 py-3 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2 mx-auto hover:bg-clay/80 transition-colors">
                    <SafeIcon icon={FiIcons.FiPlus} /> Ajouter un Stage
                </button>
            </div>
        )}

        <div className="border-t border-white/5 mb-12">
           {stages.map((stage, index) => (
               <StageRow 
                   key={stage.id} 
                   stage={stage} 
                   delay={index * 0.1}
                   isEditMode={isEditMode}
                   onUpdate={updateArticle}
                   onDelete={deleteArticle}
               />
           ))}
           {stages.length === 0 && (
               <div className="py-12 text-center text-charcoal-light italic">Aucun stage programmé pour le moment.</div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Ateliers;
