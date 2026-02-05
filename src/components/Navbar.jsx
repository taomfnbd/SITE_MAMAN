import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setHoveredIndex(null);
    setActiveSubmenu(null);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    {
      name: "Pratique Manuelle",
      href: '/pratique-manuelle',
      submenu: [
        { name: 'La Séance', href: '/pratique-manuelle/seances' }
      ]
    },
    { name: 'Formations', href: '/formations' },
    { name: 'Ateliers', href: '/ateliers' },
    {
      name: 'Ressources',
      href: '/ressources',
      submenu: [
        { name: 'Lectures', href: '/ressources/lectures' }, // "Inspirantes" retiré
        { name: 'Liens Utiles', href: '/ressources/liens' }
      ]
    },
    {
      name: 'Le Blog',
      href: '/blog',
      submenu: [
        { name: 'Actualités', href: '/blog/actu' },
        { name: 'Au fil des jours', href: '/blog/journal' }
      ]
    },
    { name: 'A Propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const isLinkActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
        scrolled ? 'bg-sage/95 backdrop-blur-md shadow-lg py-4 border-b border-white/5' : 'bg-transparent py-8 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        <Link to="/" className="relative z-[101] group flex items-center gap-1 leading-none">
          <img src="/logo-static.svg" alt="Floureto Férigoule - Logo" className="h-24 md:h-28 w-auto -mr-4 md:-mr-6 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex flex-col items-start">
            <span className="font-serif text-xl md:text-3xl text-charcoal tracking-wide group-hover:text-clay transition-colors duration-500">
              Floureto
            </span>
            <span className="font-sans text-[9px] md:text-xs uppercase tracking-[0.25em] text-clay/60 ml-0.5 group-hover:text-clay transition-colors duration-500">
              Férigoule
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <div
              key={index}
              className="relative group h-full py-2 flex items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                to={link.href}
                className={`
                  relative z-[102] flex items-center gap-1.5 font-serif text-[17px] tracking-wide transition-colors duration-300 cursor-pointer
                  ${isLinkActive(link.href) || hoveredIndex === index ? 'text-clay italic' : 'text-charcoal/90 hover:text-clay'}
                `}
              >
                {link.name}
                {link.submenu && (
                  <SafeIcon
                    icon={FiIcons.FiChevronDown}
                    className={`text-[10px] mt-0.5 transition-transform duration-300 ${
                      hoveredIndex === index ? 'rotate-180 opacity-100' : 'opacity-40'
                    }`}
                  />
                )}
              </Link>

              <AnimatePresence>
                {link.submenu && hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`absolute top-full pt-4 min-w-[240px] z-[103] ${index > 3 ? 'right-0 origin-top-right' : 'left-1/2 -translate-x-1/2 origin-top'}`}
                  >
                    <div className="absolute inset-x-0 -top-4 h-4 bg-transparent" />
                    <div className="bg-paper/95 backdrop-blur-md border border-clay/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden rounded-xl">
                      <div className="p-2 space-y-1">
                        {link.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className="group/item relative px-4 py-3 flex items-center justify-start transition-all duration-300 hover:bg-sage/30 rounded-lg block"
                          >
                            <span className="font-serif text-[16px] text-charcoal/80 tracking-wide group-hover/item:text-clay group-hover/item:translate-x-1 transition-all duration-300">
                              {subItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-[102] text-charcoal hover:text-clay transition-colors p-2 focus:outline-none"
          aria-label="Menu"
        >
          <SafeIcon icon={isOpen ? FiIcons.FiX : FiIcons.FiMenu} className="text-2xl" />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-sage z-40 flex flex-col pt-32 px-8 overflow-y-auto"
            >
              <div className="flex flex-col space-y-8 max-w-md mx-auto w-full pb-20">
                {navLinks.map((link, index) => (
                  <div key={index} className="border-b border-white/5 pb-4 last:border-0">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => link.submenu ? toggleSubmenu(index) : null}
                    >
                      <Link
                        to={link.href}
                        onClick={(e) => link.submenu && e.preventDefault()}
                        className={`text-2xl font-serif transition-colors duration-300 ${
                          activeSubmenu === index || isLinkActive(link.href) ? 'text-clay italic' : 'text-charcoal'
                        }`}
                      >
                        {link.name}
                      </Link>
                      {link.submenu && (
                        <SafeIcon
                          icon={FiIcons.FiChevronDown}
                          className={`text-charcoal/40 transition-transform duration-300 ${
                            activeSubmenu === index ? 'rotate-180 text-clay' : ''
                          }`}
                        />
                      )}
                    </div>
                    <AnimatePresence>
                      {link.submenu && activeSubmenu === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col space-y-4 mt-6 pl-4 border-l border-white/10 ml-1">
                            {link.submenu.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.href}
                                className="text-base font-serif text-charcoal-light hover:text-clay hover:italic transition-all duration-300"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
