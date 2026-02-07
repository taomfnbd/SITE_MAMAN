import { motion } from 'framer-motion';
import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const FloatingBookButton = () => (
  <motion.a
    href="https://flouretoferigoule-methodepoyet.fr/resalib"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    aria-label="Réserver une séance de Méthode Poyet en ligne"
    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:outline-none focus-visible:rounded-full"
  >
    <span className="flex items-center gap-2 bg-clay text-paper px-6 py-3.5 md:px-8 md:py-4 rounded-full shadow-[0_4px_20px_rgba(214,197,176,0.35)] hover:shadow-[0_6px_28px_rgba(214,197,176,0.5)] hover:-translate-y-0.5 transition-all duration-300">
      <SafeIcon icon={FiIcons.FiCalendar} className="text-base md:text-lg" />
      <span className="font-serif italic text-base md:text-lg tracking-wide">Réserver</span>
    </span>
  </motion.a>
);

export default FloatingBookButton;
