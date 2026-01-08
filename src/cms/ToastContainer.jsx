import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from './CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiInfo, FiCheckCircle, FiAlertTriangle, FiX } = FiIcons;

const Toast = ({ toast, onRemove }) => {
  const { id, message, type } = toast;
  
  const styles = {
    info: 'bg-stone-800 text-white border-stone-700',
    success: 'bg-green-600 text-white border-green-500',
    error: 'bg-red-600 text-white border-red-500',
    warning: 'bg-amber-500 text-white border-amber-400',
  };

  const icons = {
    info: FiInfo,
    success: FiCheckCircle,
    error: FiAlertTriangle,
    warning: FiAlertTriangle,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-center space-x-3 p-4 rounded-lg shadow-xl border ${styles[type] || styles.info} min-w-[300px] pointer-events-auto`}
    >
      <SafeIcon icon={icons[type] || FiInfo} className="text-xl flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button 
        onClick={() => onRemove(id)}
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <SafeIcon icon={FiX} />
      </button>
    </motion.div>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useCMS();

  return (
    <div className="fixed bottom-6 left-6 z-[10000] flex flex-col space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
