import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const reviews = [
  { name: "Anais D.", text: "A chaque fois que je vais voir Floureto pour ma fille ou moi, elle est toujours très professionnelle, très à l'écoute et toujours avec le sourire. Elle est formidable, je la recommande à 200% car j'en ressors toujours avec un soulagement, un réel mieux être." },
  { name: "Patricia V.", text: "Très bonne praticienne, attentive et compétente. Les progrès sont constants et les résultats durables. De plus ces séances sont de véritables moments pour soi, dans un environnement privilégié. Merci !" },
  { name: "Aude A.", text: "Une approche douce et complète du corps, merci beaucoup !" },
  { name: "Laetitia C.", text: "Visite suite à maladie auto-immune... Un grand merci à Floureto pour m'avoir soulagée, et orientée afin de diminuer voire faire disparaître la majorité de mes symptômes. J'ai retrouvé une belle qualité de vie." },
  { name: "Martine H.", text: "C'est exactement ce que je voulais, quelqu'un travaillant en manuel sur la branche dorsale du Nerf Vague. Première séance pendant laquelle Floureto a pris le temps de tout investiguer. Je vous la recommande ++" },
  { name: "Jeanne D.", text: "Une grande professionnelle ! Je me suis sentie en confiance autant que mon bébé qui lui a souri tout au long de la séance. Un vrai moment de lâcher prise. Allez y les yeux fermés!" },
  { name: "Léonard M.", text: "Top. C'était ma deuxième visite, pour des tensions dans la mâchoire. Ça va vraiment beaucoup mieux. Et j'y ai aussi bien gagné en équilibre corporel. Je recommande vraiment." },
  { name: "Julia L.", text: "Je suis très satisfaite de la séance. Floureto a pris le temps de bien comprendre mes besoins et j'ai ressenti une amélioration notable. Je la recommande vivement." },
  { name: "Isabelle J.", text: "Les deux séances avec Floureto se sont très bien passées. Floureto est très agréable, douce et les gestes effectués font beaucoup de bien. Merci!!!" },
  { name: "Bronislava B.", text: "Le travail de Floureto est subtil et profond, je retrouve une légèreté et plus grande mobilité dans mon corps. Le fait de revenir régulièrement me permet de relâcher les tensions profondes." }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 8000);
    return () => clearInterval(timer);
  }, [index]);

  const nextReview = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-6 md:py-12">
      {/* Decorative quote mark background */}
      <div className="absolute top-0 left-4 md:left-20 text-[8rem] md:text-[12rem] leading-none font-serif text-clay/5 pointer-events-none select-none -translate-y-6 md:-translate-y-10 font-bold">
        &ldquo;
      </div>
      
      <div className="relative min-h-[300px] md:min-h-[350px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mx-auto text-center px-2 md:px-12"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1.5 mb-6 md:mb-10">
              {[...Array(5)].map((_, i) => (
                <SafeIcon key={i} icon={FiIcons.FiStar} className="text-clay fill-clay text-sm drop-shadow-sm" />
              ))}
            </div>

            {/* Content */}
            <blockquote className="font-serif text-xl md:text-3xl lg:text-4xl text-charcoal leading-relaxed md:leading-relaxed italic mb-8 md:mb-10 relative z-10 drop-shadow-md">
              <span className="opacity-60 text-lg align-top mr-1">"</span>
              {reviews[index].text}
              <span className="opacity-60 text-lg align-top ml-1">"</span>
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center">
              <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-clay/60 to-transparent mb-4 md:mb-5"></div>
              <cite className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-charcoal-light font-medium not-italic">
                {reviews[index].name}
              </cite>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Visible on large screens */}
        <button 
          onClick={prevReview}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-charcoal/20 hover:text-clay transition-all duration-300 hidden md:block hover:scale-110"
          aria-label="Témoignage précédent"
        >
          <SafeIcon icon={FiIcons.FiChevronLeft} className="text-4xl" />
        </button>
        <button 
          onClick={nextReview}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-charcoal/20 hover:text-clay transition-all duration-300 hidden md:block hover:scale-110"
          aria-label="Témoignage suivant"
        >
          <SafeIcon icon={FiIcons.FiChevronRight} className="text-4xl" />
        </button>
      </div>

      {/* Modern Progress Indicators */}
      <div className="flex justify-center items-center gap-2 md:gap-3 mt-8 md:mt-12">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`transition-all duration-500 rounded-full ${i === index ? 'w-8 md:w-12 h-1 bg-clay' : 'w-2 h-2 bg-charcoal/10 hover:bg-clay/40'}`}
            aria-label={`Aller au témoignage ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;