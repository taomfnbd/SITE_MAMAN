import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCMS } from '../cms/CMSContext';
import EditableText from '../cms/EditableText';
import SafeIcon from '../common/SafeIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isEditMode } = useCMS();

  return (
    <footer className="bg-sage pt-12 md:pt-20 pb-8 md:pb-10 border-t border-white/5 text-charcoal-light font-light relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
        
        {/* Colonne 1 : Identité */}
        <div className="col-span-1 md:col-span-1 border-b border-white/5 pb-8 md:border-none md:pb-0">
          <Link to="/" className="block mb-4 md:mb-6 group">
            <span className="font-serif text-2xl text-charcoal group-hover:text-clay transition-colors">Floureto</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-clay/60 block mt-1 group-hover:text-clay transition-colors">Férigoule</span>
          </Link>
          <div className="text-sm leading-relaxed mb-6">
            <EditableText id="footer.desc" defaultValue="Cabinet de Thérapie Manuelle Informationnelle (Méthode Poyet)." multiline />
          </div>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/ferigouleflouretomethodepoyet?igsh=Znd1Y200N3Q3ZTZt" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-clay hover:text-white hover:border-transparent transition-all">
              <SafeIcon icon={FiIcons.FiInstagram} className="text-sm" />
            </a>
            <a href="https://www.facebook.com/share/CWJvBZPtLT9LJJij/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-clay hover:text-white hover:border-transparent transition-all">
              <SafeIcon icon={FiIcons.FiFacebook} className="text-sm" />
            </a>
          </div>
        </div>

        {/* Colonne 2 : Plan du site */}
        <div>
          <h4 className="font-serif text-charcoal text-lg mb-4 md:mb-6">Plan du Site</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/pratique-manuelle" className="hover:text-clay transition-colors">Pratique Manuelle</Link></li>
            <li><Link to="/pratique-manuelle/seances" className="hover:text-clay transition-colors">La Séance</Link></li>
            <li><Link to="/a-propos" className="hover:text-clay transition-colors">A Propos</Link></li>
            <li><Link to="/formations" className="hover:text-clay transition-colors">Formations</Link></li>
            <li><Link to="/ateliers" className="hover:text-clay transition-colors">Ateliers</Link></li>
            <li><Link to="/ressources" className="hover:text-clay transition-colors">Ressources</Link></li>
            <li><Link to="/blog/journal" className="hover:text-clay transition-colors">Au fil des jours</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Informations */}
        <div>
          <h4 className="font-serif text-charcoal text-lg mb-4 md:mb-6">Informations</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/contact" className="hover:text-clay transition-colors">Prendre Rendez-vous</Link></li>
            <li><Link to="/mentions-legales" className="hover:text-clay transition-colors">Mentions Légales</Link></li>
            <li><Link to="/contact" className="hover:text-clay transition-colors">Accès au cabinet</Link></li>
          </ul>
        </div>

        {/* Colonne 4 : Contact Rapide */}
        <div className="border-t border-white/5 pt-8 md:border-none md:pt-0">
          <h4 className="font-serif text-charcoal text-lg mb-4 md:mb-6">Me Contacter</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <SafeIcon icon={FiIcons.FiMapPin} className="text-clay mt-1" />
              <div className="whitespace-pre-line">
                <EditableText id="footer.address" defaultValue={"29 Rue du Mont Berny\n60350 Pierrefonds"} multiline />
              </div>
            </li>
            <li className="flex items-center gap-3">
               <SafeIcon icon={FiIcons.FiPhone} className="text-clay" />
              <span><EditableText id="footer.phone" defaultValue="07 69 05 10 87" /></span>
            </li>
            <li className="flex items-center gap-3">
              <SafeIcon icon={FiIcons.FiCalendar} className="text-clay" />
              <a href="https://flouretoferigoule-methodepoyet.fr/resalib" target="_blank" rel="noopener noreferrer" className="hover:text-clay transition-colors">Réserver en ligne (Resalib)</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 pt-8 text-center px-6">
        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-4">
          © {currentYear} Floureto Férigoule. Tous droits réservés.
        </p>
        <p className="text-[10px] text-charcoal-light/40 max-w-3xl mx-auto italic">
          La méthode Poyet est une approche de soin non conventionnelle. Elle ne se substitue pas à un diagnostic ou un traitement médical.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
