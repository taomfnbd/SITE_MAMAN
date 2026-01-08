import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from './CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiImage, FiUpload, FiX, FiCheck, FiLink } = FiIcons;

const EditableImage = ({
  id,
  defaultSrc = '',
  alt = '',
  className = '',
  children,
  onChange 
}) => {
  const { isEditMode, getContent, updateContent, addToast, uploadImage } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (onChange) {
        // Mode "Contrôlé" (pour les listes comme Livres)
        setImageSrc(defaultSrc);
    } else if (id) {
        // Mode "Global" (pour les pages)
        const content = getContent(id, defaultSrc);
        setImageSrc(content);
    } else {
        setImageSrc(defaultSrc);
    }
  }, [id, defaultSrc, getContent, onChange]);

  const handleClick = (e) => {
    if (isEditMode) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast('Veuillez sélectionner une image valide (JPG, PNG, WebP)', 'error');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        addToast("L'image est trop grande. Taille maximale : 5MB", 'warning');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    let finalSrc = previewSrc;

    if (selectedFile) {
        addToast("Envoi de l'image...", "info");
        const uploadedUrl = await uploadImage(selectedFile);
        if (uploadedUrl) {
            finalSrc = uploadedUrl;
        } else {
            return;
        }
    }

    if (finalSrc) {
      if (onChange) {
          onChange(finalSrc);
      } else if (id) {
          updateContent(id, finalSrc);
      }
      setImageSrc(finalSrc);
      setPreviewSrc('');
      setSelectedFile(null);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreviewSrc('');
    setSelectedFile(null);
    setIsEditing(false);
    setShowUrlInput(false);
    setUrlInputValue('');
  };

  const handleUrlSubmit = () => {
    if (urlInputValue) {
      setPreviewSrc(urlInputValue);
      setShowUrlInput(false);
      setUrlInputValue('');
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`relative w-full h-full ${isEditMode ? 'cursor-pointer group/image' : ''}`}
      >
        <div
          className={`w-full h-full ${
            isEditMode
              ? 'group-hover/image:outline group-hover/image:outline-2 group-hover/image:outline-clay rounded transition-all relative'
              : ''
          }`}
        >
          {children || (
            <img
              src={imageSrc || defaultSrc || 'https://placehold.co/400x600?text=Image'}
              alt={alt}
              className={`${className}`}
            />
          )}
          {isEditMode && !children && (
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors rounded pointer-events-none"></div>
          )}
        </div>

        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
            >
              <div className="bg-clay text-paper px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-lg transform scale-90 group-hover/image:scale-100 transition-transform">
                  <SafeIcon icon={FiImage} className="text-xs" />
                  <span className="text-xs font-medium uppercase tracking-wider">Modifier</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isEditing && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCancel}></div>
          <div className="relative z-10 w-full max-w-lg bg-paper border-2 border-dashed border-[#95a58d] rounded-2xl p-8 shadow-2xl">
            {previewSrc ? (
              <div className="relative">
                <img
                  src={previewSrc}
                  alt="Aperçu"
                  className="max-h-[60vh] mx-auto rounded-lg object-contain shadow-lg"
                />
                <button
                  onClick={() => setPreviewSrc('')}
                  className="absolute -top-3 -right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 shadow-md transition-transform hover:scale-110"
                  type="button"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6 text-clay">
                    <SafeIcon icon={FiImage} className="text-4xl" />
                </div>
                <h3 className="text-xl font-serif text-charcoal mb-2">Modifier l'image</h3>
                <p className="text-charcoal-light mb-8 text-sm">Choisissez une nouvelle image depuis votre appareil ou une URL.</p>
                <div className="space-y-3 max-w-xs mx-auto">
                  <label
                    className="w-full flex items-center justify-center space-x-3 bg-clay text-paper font-medium px-4 py-3 rounded-xl hover:bg-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <SafeIcon icon={FiUpload} />
                    <span>Télécharger une image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-charcoal-light/50 uppercase tracking-widest">OU</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>
                  {!showUrlInput ? (
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowUrlInput(true); }}
                        className="w-full flex items-center justify-center space-x-3 border border-white/10 bg-white/5 text-charcoal-light px-4 py-3 rounded-xl hover:bg-white/10 hover:text-clay transition-all duration-300 cursor-pointer"
                        type="button"
                    >
                        <SafeIcon icon={FiLink} />
                        <span>Coller une URL</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={urlInputValue}
                            onChange={(e) => setUrlInputValue(e.target.value)}
                            placeholder="https://exemple.com/image.jpg"
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-charcoal outline-none focus:border-clay"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                        />
                        <button
                            onClick={handleUrlSubmit}
                            className="bg-clay text-paper px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                        >
                            OK
                        </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {previewSrc && (
                <div className="flex items-center justify-center space-x-4 mt-8 pt-6 border-t border-white/10">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 text-charcoal-light hover:text-charcoal transition-colors text-sm font-medium"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-green-600 text-white px-8 py-2.5 rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-900/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <SafeIcon icon={FiCheck} />
                        <span>Enregistrer</span>
                    </button>
                </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default EditableImage;
