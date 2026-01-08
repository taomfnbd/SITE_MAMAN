import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from './CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit2, FiSave, FiX, FiLogOut, FiAlertCircle, FiCheck, FiEye, FiEyeOff, FiChevronDown, FiRotateCcw, FiRotateCw } = FiIcons;

const ColorPicker = () => {
  const { colors, updateColor } = useCMS();
  
  const colorLabels = {
    '--color-paper': 'Fond principal',
    '--color-charcoal': 'Texte principal',
    '--color-charcoal-light': 'Texte secondaire',
    '--color-clay': 'Accent (Beige)',
    '--color-sage': 'Fond secondaire',
  };

  return (
    <div className="space-y-3 pt-3 border-t border-stone-700 mt-3">
      <p className="text-xs font-medium text-stone-400">Couleurs du site</p>
      <div className="space-y-2">
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between group">
            <label className="text-xs text-stone-300">{colorLabels[key] || key}</label>
            <div className="flex items-center space-x-2 relative">
              <div 
                className="w-6 h-6 rounded border border-stone-600 overflow-hidden" 
                style={{ backgroundColor: value }}
              >
                <input
                  type="color"
                  value={value}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CMSToolbar = () => {
  const {
    isEditMode,
    isAuthenticated,
    hasChanges,
    toggleEditMode,
    saveChanges,
    discardChanges,
    logout,
    undo,
    redo,
    canUndo,
    canRedo,
    addToast
  } = useCMS();

  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isAuthenticated) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await saveChanges();
      if (success) {
        addToast('Modifications enregistrées avec succès !', 'success');
      } else {
        addToast('Erreur lors de l\'enregistrement', 'error');
      }
    } catch (error) {
      addToast('Une erreur inattendue est survenue', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    if (confirm('Voulez-vous vraiment annuler toutes les modifications non sauvegardées ?')) {
      discardChanges();
    }
  };

  const handleLogout = () => {
    if (hasChanges) {
      if (confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment vous déconnecter ?')) {
        logout();
      }
    } else {
      logout();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="mb-3 bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl shadow-2xl p-4 w-80 max-w-[calc(100vw-3rem)] max-h-[70vh] overflow-y-auto border border-stone-700 scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent"
          >
            {/* Status */}
            <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-stone-700">
              <div className="w-6 h-6 bg-[#95a58d] rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiEdit2} className="text-white text-xs" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-xs">Mode Administration</p>
                <p className="text-stone-400 text-xs">
                  {isEditMode ? 'Édition active' : 'Édition désactivée'}
                </p>
              </div>
            </div>

            {hasChanges && (
              <div className="mb-3 p-2 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-amber-300 text-xs font-medium">
                  Modifications non sauvegardées
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              {/* Toggle Edit Mode */}
              <button
                onClick={toggleEditMode}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isEditMode
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                }`}
              >
                <SafeIcon icon={isEditMode ? FiEyeOff : FiEye} />
                <span>{isEditMode ? 'Désactiver édition' : 'Activer édition'}</span>
              </button>

              {/* Undo / Redo */}
              {isEditMode && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => { undo(); addToast('Action annulée', 'info'); }}
                    disabled={!canUndo}
                    className="flex-1 flex items-center justify-center space-x-2 bg-stone-700 text-stone-300 px-3 py-2 rounded-lg font-medium text-xs hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Annuler la dernière action (Ctrl+Z)"
                  >
                    <SafeIcon icon={FiRotateCcw} />
                    <span>Retour</span>
                  </button>
                  <button
                    onClick={() => { redo(); addToast('Action rétablie', 'info'); }}
                    disabled={!canRedo}
                    className="flex-1 flex items-center justify-center space-x-2 bg-stone-700 text-stone-300 px-3 py-2 rounded-lg font-medium text-xs hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Rétablir l'action annulée (Ctrl+Y)"
                  >
                    <SafeIcon icon={FiRotateCw} />
                    <span>Rétablir</span>
                  </button>
                </div>
              )}

              {/* Save */}
              {hasChanges && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-green-700 disabled:opacity-70 transition-colors shadow-lg shadow-green-900/20"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSave} />
                      <span>Enregistrer les modifications</span>
                    </>
                  )}
                </button>
              )}

              {/* Discard */}
              {hasChanges && (
                <button
                  onClick={handleDiscard}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-red-700"
                >
                  <SafeIcon icon={FiX} />
                  <span>Tout annuler</span>
                </button>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 bg-stone-700 text-stone-300 px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-stone-600"
              >
                <SafeIcon icon={FiLogOut} />
                <span>Déconnexion</span>
              </button>
            </div>

            {isEditMode && <ColorPicker />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton toggle flottant */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${
          isEditMode
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-700 hover:to-stone-800'
        } border-2 border-white/20`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {hasChanges && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white animate-pulse"></div>
        )}
        <SafeIcon
          icon={isExpanded ? FiChevronDown : FiEdit2}
          className="text-white text-xl"
        />
      </motion.button>
    </div>
  );
};

export default CMSToolbar;
