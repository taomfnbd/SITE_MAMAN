import { createClient } from '@supabase/supabase-js';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://uunuaqhcvjcotulymdsc.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bnVhcWhjdmpjb3R1bHltZHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTc0NjksImV4cCI6MjA4MzIzMzQ2OX0.KS-il72_2hjWWDnwBAxAOf4ns3oDDFQb8o-P6BnmG30";

console.log("Supabase URL:", supabaseUrl); // Debugging

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

  // Toasts management
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000); // Auto remove after 3s
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // History management
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

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
            
            if (contentMap['site_colors']) {
                const newColors = { ...colors, ...contentMap['site_colors'] };
                setColors(newColors);
                // Initialize history
                setHistory([{ contentData: contentMap, colors: newColors }]);
                setHistoryIndex(0);
            } else {
                setHistory([{ contentData: contentMap, colors: colors }]);
                setHistoryIndex(0);
            }
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
        }
    };

    loadContent();
    loadArticles();
  }, []);

  useEffect(() => {
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [colors]);

  const addToHistory = useCallback((newContentData, newColors) => {
      setHistory(prev => {
          const newHistory = prev.slice(0, historyIndex + 1);
          newHistory.push({ contentData: newContentData, colors: newColors });
          return newHistory.slice(-20); // Keep last 20 steps
      });
      setHistoryIndex(prev => {
          const newIndex = prev + 1;
          return newIndex >= 20 ? 19 : newIndex;
      });
  }, [historyIndex]);

  const undo = useCallback(() => {
      if (historyIndex > 0) {
          const prevState = history[historyIndex - 1];
          setContentData(prevState.contentData);
          setColors(prevState.colors);
          setHistoryIndex(prev => prev - 1);
          setHasChanges(true);
      }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
      if (historyIndex < history.length - 1) {
          const nextState = history[historyIndex + 1];
          setContentData(nextState.contentData);
          setColors(nextState.colors);
          setHistoryIndex(prev => prev + 1);
          setHasChanges(true);
      }
  }, [history, historyIndex]);

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
    const newData = { ...contentData, [key]: value };
    setContentData(newData);
    addToHistory(newData, colors);
    setHasChanges(true);
  }, [contentData, colors, addToHistory]);

  const updateColor = useCallback((key, value) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    const newData = { ...contentData, 'site_colors': newColors };
    setContentData(newData);
    addToHistory(newData, newColors);
    setHasChanges(true);
  }, [colors, contentData, addToHistory]);

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

  const uploadImage = useCallback(async (file, bucket = 'cms-images') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

    if (error) {
        console.error('Error uploading file:', error);
        addToast("Erreur lors de l'envoi du fichier", 'error');
        return null;
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return publicUrl;
  }, [addToast]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

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
        updateColor,
        articles,
        createArticle,
        deleteArticle,
        getArticle,
        updateArticle,
        uploadImage,
        undo,
        redo,
        canUndo,
        canRedo,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};
