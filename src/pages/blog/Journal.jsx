import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';
import { useCMS } from '../../cms/CMSContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const JournalEntry = ({ article, delay, isEditMode, onDelete }) => (
  <FadeIn delay={delay} className="max-w-2xl mx-auto mb-24 relative group">
    {isEditMode && (
        <button 
            onClick={(e) => { e.preventDefault(); onDelete(article.id); }}
            className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            title="Supprimer l'article"
        >
            <SafeIcon icon={FiIcons.FiTrash2} />
        </button>
    )}
    <div className="text-center mb-12">
      <span className="text-[10px] uppercase tracking-[0.3em] text-clay/60 block mb-4">{article.date}</span>
      <h2 className="text-3xl md:text-4xl font-serif text-charcoal italic">
        <Link to={`/blog/article/${article.id}`} className="hover:text-clay transition-colors">{article.title}</Link>
      </h2>
      <div className="w-12 h-[1px] bg-clay/30 mx-auto mt-8"></div>
    </div>
    <div className="prose prose-invert prose-p:text-charcoal-light prose-p:font-light prose-p:leading-loose prose-headings:font-serif prose-a:text-clay text-justify">
      <p>{article.excerpt}</p>
      <div className="text-center mt-8">
        <Link to={`/blog/article/${article.id}`} className="text-xs uppercase tracking-widest text-clay hover:text-charcoal transition-colors">
            Lire la suite
        </Link>
      </div>
    </div>
  </FadeIn>
);

const Journal = () => {
  const { articles, createArticle, deleteArticle, isEditMode } = useCMS();
  const navigate = useNavigate();

  const journalArticles = articles.filter(a => a.type === 'journal');

  const handleCreate = () => {
      const id = createArticle('journal');
      navigate(`/blog/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader pageId="journal" title="Au fil des jours" subtitle="Réflexions sur le vivant." />
      
      <div className="px-6">
        {isEditMode && (
            <div className="mb-16 text-center">
                <button onClick={handleCreate} className="bg-clay text-white px-6 py-3 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2 mx-auto hover:bg-clay/80 transition-colors">
                    <SafeIcon icon={FiIcons.FiPlus} /> Nouvelle Entrée
                </button>
            </div>
        )}

        {journalArticles.length === 0 && (
            <div className="text-center text-charcoal-light italic py-12 max-w-2xl mx-auto border border-white/5 bg-sage/5 rounded-lg">
                Aucune entrée pour le moment.
            </div>
        )}

        {journalArticles.map((article, index) => (
            <JournalEntry 
                key={article.id} 
                article={article} 
                delay={index * 0.1}
                isEditMode={isEditMode}
                onDelete={deleteArticle}
            />
        ))}
      </div>
    </div>
  );
};

export default Journal;
