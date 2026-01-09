import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useCMS } from '../../cms/CMSContext';
import EditableText from '../../cms/EditableText';
import SectionManager from '../../cms/SectionManager';

const Article = ({ article, delay, isEditMode, onDelete }) => (
  <FadeIn delay={delay} className="mb-12 border border-white/5 bg-sage/10 p-8 hover:border-clay/20 transition-all duration-300 relative group">
    {isEditMode && (
        <button 
            onClick={(e) => { e.preventDefault(); onDelete(article.id); }}
            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            title="Supprimer l'article"
        >
            <SafeIcon icon={FiIcons.FiTrash2} />
        </button>
    )}
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="md:w-32 flex-shrink-0">
        <span className="text-clay text-xs tracking-widest uppercase font-medium border border-clay/30 px-2 py-1">{article.date}</span>
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-serif text-charcoal mb-4 hover:text-clay transition-colors">
            <Link to={`/blog/article/${article.id}`}>{article.title}</Link>
        </h2>
        <p className="text-charcoal-light font-light leading-loose text-sm mb-6">
          {article.excerpt}
        </p>
        <Link to={`/blog/article/${article.id}`} className="text-xs uppercase tracking-widest text-charcoal/60 hover:text-clay transition-colors flex items-center gap-2">
          Lire l'article <SafeIcon icon={FiIcons.FiArrowRight} />
        </Link>
      </div>
    </div>
  </FadeIn>
);

const Actu = () => {
  const { articles, createArticle, deleteArticle, isEditMode } = useCMS();
  const navigate = useNavigate();

  const actuArticles = articles.filter(a => a.type === 'actu');

  const handleCreate = () => {
      const id = createArticle('actu');
      navigate(`/blog/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader pageId="actu" title="Actualités & Ateliers" subtitle="Le partage et l'autonomie au cœur de la pratique." />
      
      <SectionManager pageId="actu" />

      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="mb-16">
            <div className="text-charcoal-light font-light leading-loose text-lg text-center max-w-2xl mx-auto">
                <EditableText 
                    id="actu.intro" 
                    defaultValue={'"Transmettre c\'est transporter quelque chose, avec l\'idée de passage. En athlétisme, le relais est une course dans laquelle on se transmet un témoin."'} 
                    multiline 
                />
            </div>
        </FadeIn>

        {isEditMode && (
            <div className="mb-12 text-center">
                <button onClick={handleCreate} className="bg-clay text-white px-6 py-3 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2 mx-auto hover:bg-clay/80 transition-colors">
                    <SafeIcon icon={FiIcons.FiPlus} /> Nouvel Article
                </button>
            </div>
        )}

        {actuArticles.length === 0 && (
            <div className="text-center text-charcoal-light italic py-12 border border-white/5 bg-sage/5 rounded-lg">
                Aucune actualité pour le moment. {isEditMode ? 'Cliquez sur "Nouvel Article" pour commencer.' : ''}
            </div>
        )}

        {actuArticles.map((article, index) => (
            <Article 
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

export default Actu;
