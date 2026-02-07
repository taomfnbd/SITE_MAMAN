import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState, useCallback } from 'react';
import * as FiIcons from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';

const Navbar = ({ hideMenu = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      name: "Méthode Poyet",
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
        { name: 'Au fil des jours', href: '/blog/journal' },
        { name: 'Lectures', href: '/ressources/lectures' },
        { name: 'Liens Utiles', href: '/ressources/liens' }
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

  const handleNav = useCallback((e, href) => {
    e.preventDefault();
    if (transitioning || href === location.pathname) return;
    setTransitioning(true);
    setIsOpen(false);
    setTimeout(() => navigate(href), 700);
  }, [transitioning, location.pathname, navigate]);

  return (
    <>
      {/* Transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
            className="fixed inset-0 z-[300] pointer-events-none"
          >
            {/* Radial glow from logo position (top-left) */}
            <div className="absolute top-0 left-0 w-full h-full">
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 4, opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute top-8 left-8 md:left-16 w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full bg-clay/25 blur-3xl"
              />
            </div>
            {/* Fade to paper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: 'easeIn' }}
              className="absolute inset-0 bg-paper"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
          scrolled ? 'bg-sage/95 backdrop-blur-md shadow-lg py-3 md:py-4 border-b border-white/5' : 'bg-transparent py-4 md:py-8 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          <a href="/" onClick={(e) => handleNav(e, '/')} className="relative z-[101] group flex items-center gap-1 leading-none">
            <img src="/logo-static.svg" alt="Floureto Férigoule – Cabinet de Méthode Poyet à Pierrefonds" className="h-16 md:h-24 lg:h-28 w-auto -mr-2 md:-mr-4 lg:-mr-6 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex flex-col items-start">
              <span className="font-serif text-xl md:text-3xl text-charcoal tracking-wide group-hover:text-clay transition-colors duration-500">
                Floureto
              </span>
              <span className="font-sans text-[9px] md:text-xs uppercase tracking-[0.25em] text-clay/60 ml-0.5 group-hover:text-clay transition-colors duration-500">
                Férigoule
              </span>
            </div>
          </a>

          {/* Desktop Menu */}
          {!hideMenu && <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={transitioning ? { opacity: 0, y: -15 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: transitioning ? 0 : 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative group h-full py-2 flex items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
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
                </a>

                <AnimatePresence>
                  {link.submenu && hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute top-full pt-3 min-w-[220px] z-[103] ${index > 5 ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}`}
                    >
                      <div className="absolute inset-x-0 -top-3 h-3 bg-transparent" />
                      <div className="bg-paper border border-clay/15 rounded-2xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] overflow-hidden">
                        <div className="py-2">
                          {link.submenu.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              onClick={(e) => handleNav(e, subItem.href)}
                              className="group/item relative px-5 py-2.5 flex items-center gap-3 transition-all duration-300 hover:bg-sage/20 block"
                            >
                              <span className="w-4 h-[1px] bg-clay/0 group-hover/item:bg-clay/40 transition-all duration-300"></span>
                              <span className="font-serif text-[15px] text-charcoal/70 tracking-wide group-hover/item:text-clay transition-all duration-300">
                                {subItem.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>}

          {/* Mobile Menu Button */}
          {!hideMenu && <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[102] text-charcoal hover:text-clay transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:rounded-sm"
            aria-label="Ouvrir le menu de navigation"
          >
            <SafeIcon icon={isOpen ? FiIcons.FiX : FiIcons.FiMenu} className="text-2xl" />
          </button>}

          {/* Mobile Menu Overlay */}
          {!hideMenu && <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-paper/95 backdrop-blur-md z-40 flex items-center justify-center overflow-y-auto"
              >
                <nav className="flex flex-col items-start gap-2.5">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="relative"
                      onMouseEnter={() => link.submenu && setActiveSubmenu(index)}
                      onMouseLeave={() => link.submenu && setActiveSubmenu(null)}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.submenu) {
                            if (activeSubmenu === index) {
                              handleNav(e, link.href);
                            } else {
                              e.preventDefault();
                              setActiveSubmenu(activeSubmenu === index ? null : index);
                            }
                          } else {
                            handleNav(e, link.href);
                          }
                        }}
                        className={`group flex items-center gap-1.5 cursor-pointer`}
                      >
                        <span className={`font-serif text-base italic tracking-wide transition-all duration-300 pb-0.5 ${
                          isLinkActive(link.href) || activeSubmenu === index ? 'text-clay' : 'text-charcoal/90 hover:text-clay'
                        }`}>
                          {link.name}
                        </span>
                        {link.submenu && (
                          <SafeIcon
                            icon={FiIcons.FiChevronDown}
                            className={`text-[10px] text-charcoal/30 transition-transform duration-300 ${activeSubmenu === index ? 'rotate-180' : ''}`}
                          />
                        )}
                      </a>
                      <AnimatePresence>
                        {link.submenu && activeSubmenu === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="overflow-hidden ml-3 mt-1"
                          >
                            <div className="flex flex-col gap-1.5 border-l border-clay/20 pl-3">
                              {link.submenu.map((subItem, subIndex) => (
                                <a
                                  key={subIndex}
                                  href={subItem.href}
                                  onClick={(e) => handleNav(e, subItem.href)}
                                  className="block"
                                >
                                  <span className="font-serif text-sm italic text-charcoal/40 hover:text-clay transition-colors duration-300">
                                    {subItem.name}
                                  </span>
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
