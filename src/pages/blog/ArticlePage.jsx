import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useCMS } from '../../cms/CMSContext';
import EditableText from '../../cms/EditableText';
import EditableImage from '../../cms/EditableImage';
import RichTextEditor from '../../cms/RichTextEditor';
import FadeIn from '../../components/FadeIn';

const ArticlePage = () => {
  const { id } = useParams();
  const { getArticle, updateArticle, isEditMode } = useCMS();
  const article = getArticle(id);

  if (!article) {
    return <Navigate to="/blog" />; 
  }

  const handleUpdate = (field, value) => {
    updateArticle(id, field, value);
  };

  return (
    <div className="min-h-screen bg-paper pb-32 selection:bg-clay/30">
      <Navbar />
      
      {/* Header de l'article */}
      <div className="max-w-4xl mx-auto px-6 pt-32 mb-16 text-center">
        <FadeIn>
            <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-clay font-medium block mb-4">
                    <EditableText value={article.date} onChange={(val) => handleUpdate('date', val)} />
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-charcoal italic mb-8">
                    <EditableText value={article.title} onChange={(val) => handleUpdate('title', val)} />
                </h1>
                <div className="w-16 h-[1px] bg-clay/30 mx-auto"></div>
            </div>
            
            <div className="text-charcoal-light font-light text-lg italic max-w-2xl mx-auto mb-12">
                <EditableText value={article.excerpt} onChange={(val) => handleUpdate('excerpt', val)} multiline />
            </div>

            {/* Image de couverture optionnelle */}
            <div className="relative aspect-video bg-sage/10 overflow-hidden rounded-lg mb-16 border border-white/10">
                 {isEditMode ? (
                    <EditableImage defaultSrc={article.image} onChange={(val) => handleUpdate('image', val)} className="w-full h-full object-cover" />
                 ) : (
                    article.image && <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                 )}
                 {!article.image && isEditMode && <div className="absolute inset-0 flex items-center justify-center text-clay/50 uppercase tracking-widest text-xs pointer-events-none">Ajouter une image de couverture</div>}
            </div>
        </FadeIn>
      </div>

      {/* Corps de l'article - Editeur Riche */}
      <div className="max-w-3xl mx-auto px-6">
         {isEditMode ? (
            <RichTextEditor 
                value={article.content} 
                onChange={(val) => handleUpdate('content', val)} 
                placeholder="Commencez à écrire votre article ici..."
            />
         ) : (
            <div 
                className="prose prose-lg max-w-none prose-p:text-charcoal-light prose-p:font-light prose-p:leading-loose prose-headings:font-serif prose-headings:text-charcoal prose-a:text-clay text-justify"
                dangerouslySetInnerHTML={{ __html: article.content }} 
            />
         )}
      </div>

    </div>
  );
};

export default ArticlePage;
