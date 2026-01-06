import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';
import { useCMS } from '../../cms/CMSContext';
import EditableText from '../../cms/EditableText';
import EditableImage from '../../cms/EditableImage';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const Book = ({ book, delay, isEditMode, onDelete, onUpdate }) => (
  <FadeIn delay={delay} className="flex gap-6 md:gap-8 items-start p-6 border border-white/5 hover:bg-sage/10 transition-colors relative group">
    {isEditMode && (
        <button 
            onClick={(e) => { e.preventDefault(); onDelete(book.id); }}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            title="Supprimer ce livre"
        >
            <SafeIcon icon={FiIcons.FiTrash2} />
        </button>
    )}
    
    {/* Zone Image du Livre */}
    <div className="w-24 md:w-32 aspect-[2/3] flex-shrink-0 relative bg-charcoal/5 border border-white/10 overflow-hidden shadow-sm">
        {isEditMode ? (
            <EditableImage 
                defaultSrc={book.image} 
                onChange={(val) => onUpdate(book.id, 'image', val)} 
                className="w-full h-full object-cover"
            />
        ) : (
            book.image ? (
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-charcoal/10">
                    <span className="font-serif text-clay/30 text-lg italic rotate-[-90deg]">Livre</span>
                </div>
            )
        )}
        {!book.image && isEditMode && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <SafeIcon icon={FiIcons.FiImage} className="text-clay/50 text-2xl" />
             </div>
        )}
    </div>

    <div className="flex-grow pt-2">
      <h3 className="text-xl font-serif text-charcoal italic mb-1">
          <EditableText value={book.title} onChange={(val) => onUpdate(book.id, 'title', val)} />
      </h3>
      <p className="text-xs uppercase tracking-wider text-clay mb-3">
          <EditableText value={book.author} onChange={(val) => onUpdate(book.id, 'author', val)} />
      </p>
      <div className="text-charcoal-light font-light text-sm leading-relaxed">
          <EditableText value={book.excerpt} onChange={(val) => onUpdate(book.id, 'excerpt', val)} multiline />
      </div>
    </div>
  </FadeIn>
);

const Lectures = () => {
  const { articles, createArticle, deleteArticle, updateArticle, isEditMode } = useCMS();
  
  const books = articles.filter(a => a.type === 'book');

  const handleCreate = () => {
      createArticle('book');
  };

  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader pageId="lectures" title="Bibliographie" subtitle="Des livres qui ont marqué ma pratique." />
      
      <div className="max-w-4xl mx-auto px-6">
        {isEditMode && (
            <div className="mb-12 text-center">
                <button onClick={handleCreate} className="bg-clay text-white px-6 py-3 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2 mx-auto hover:bg-clay/80 transition-colors">
                    <SafeIcon icon={FiIcons.FiPlus} /> Ajouter un Livre
                </button>
            </div>
        )}

        {books.length === 0 && (
            <div className="text-center text-charcoal-light italic py-12 border border-white/5 bg-sage/5 rounded-lg">
                Aucune lecture ajoutée pour le moment.
            </div>
        )}

        <div className="grid gap-6">
            {books.map((book, index) => (
                <Book 
                    key={book.id} 
                    book={book} 
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

export default Lectures;
