import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const CMSContext = createContext();

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within CMSProvider');
  }
  return context;
};

export const CMSProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contentData, setContentData] = useState({});
  const [articles, setArticles] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [colors, setColors] = useState({
    '--color-paper': '#314052',
    '--color-charcoal': '#F9F9F7',
    '--color-charcoal-light': '#9FA9B9',
    '--color-clay': '#D6C5B0',
    '--color-sage': '#273240',
  });

  useEffect(() => {
      // Check for simple auth in localStorage
      const auth = localStorage.getItem('cms-auth-simple');
      if (auth === 'true') {
          setIsAuthenticated(true);
      }
  }, []);

  useEffect(() => {
    // Load content from Supabase
    const loadContent = async () => {
        const { data, error } = await supabase.from('site_content').select('*');
        if (data) {
            const contentMap = {};
            data.forEach(item => {
                contentMap[item.key] = item.data;
            });
            setContentData(contentMap);
        }
    };

    const loadArticles = async () => {
        const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
        if (data) {
            const formattedArticles = data.map(a => ({
                id: a.id,
                type: a.type,
                created_at: a.created_at,
                ...a.data
            }));
            setArticles(formattedArticles);
            
            if (data.length === 0) {
                 seedDefaultArticles();
            }
        }
    };

    loadContent();
    loadArticles();
  }, []);

  const seedDefaultArticles = async () => {
      // Logic to seed defaults (skipped for now as per previous flow, user wants manual entry or it's fine)
  };

  useEffect(() => {
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [colors]);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('cms-auth-simple', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsEditMode(false);
    localStorage.removeItem('cms-auth-simple');
  };

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const updateContent = useCallback((key, value) => {
    setContentData(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }, []);

  const saveChanges = useCallback(async () => {
    const updates = Object.entries(contentData).map(([key, value]) => ({
        key,
        data: value
    }));
    
    const { error } = await supabase.from('site_content').upsert(updates);
    if (error) {
        console.error("Error saving content", error);
        return false;
    }
    setHasChanges(false);
    return true;
  }, [contentData]);

  const discardChanges = useCallback(() => {
     window.location.reload();
  }, []);

  const getContent = useCallback((key, defaultValue = '') => {
    return contentData[key] !== undefined ? contentData[key] : defaultValue;
  }, [contentData]);

  const createArticle = useCallback(async (type) => {
    const id = crypto.randomUUID();
    let newArticleData = {
        title: 'Nouveau Titre',
        date: new Date().toLocaleDateString('fr-FR'),
    };
    
    if (type === 'book') {
        newArticleData = { ...newArticleData, title: 'Nouveau Livre', author: 'Auteur', excerpt: 'Résumé...', image: '' };
    } else if (type === 'link') {
        newArticleData = { ...newArticleData, title: 'Nouveau Lien', excerpt: 'Description...', url: 'https://' };
    } else if (type === 'stage') {
        newArticleData = { ...newArticleData, title: 'Nouveau Stage', date: 'Date', audience: 'Public', desc: 'Description...', full: false, file: '' };
    } else {
        newArticleData = { ...newArticleData, title: 'Nouvel Article', excerpt: 'Résumé...', image: '', content: '<p>Contenu...</p>' };
    }

    const { error } = await supabase.from('articles').insert({
        id,
        type,
        title: newArticleData.title,
        data: newArticleData
    });

    if (!error) {
        setArticles(prev => [{ id, type, ...newArticleData }, ...prev]);
    } else {
        console.error("Error creating article", error);
    }
    return id;
  }, []);

  const deleteArticle = useCallback(async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cet élément ?")) {
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (!error) {
            setArticles(prev => prev.filter(a => a.id !== id));
        } else {
            console.error("Error deleting article", error);
        }
    }
  }, []);

  const updateArticle = useCallback(async (id, field, value) => {
      setArticles(prev => prev.map(a => {
          if (a.id === id) return { ...a, [field]: value };
          return a;
      }));

      setArticles(prev => {
          const article = prev.find(a => a.id === id);
          if (!article) return prev;
          
          const newData = { ...article, [field]: value };
          const { id: _id, type: _type, created_at: _c, ...dataToSave } = newData;
          
          supabase.from('articles').update({ 
              title: newData.title,
              data: dataToSave 
          }).eq('id', id).then(({ error }) => {
              if (error) console.error("Error updating article", error);
          });
          
          return prev.map(a => a.id === id ? newData : a);
      });

  }, []);
  
  const getArticle = useCallback((id) => {
      return articles.find(a => a.id === id);
  }, [articles]);

  return (
    <CMSContext.Provider
      value={{
        isEditMode,
        isAuthenticated,
        hasChanges,
        login,
        logout,
        toggleEditMode,
        updateContent,
        saveChanges,
        discardChanges,
        getContent,
        colors,
        articles,
        createArticle,
        deleteArticle,
        getArticle,
        updateArticle
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};
