import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [index]);

  const variants = {
    enter: (d) => ({ opacity: 0, y: d > 0 ? 20 : -20 }),
    center: { opacity: 1, y: 0 },
    exit: (d) => ({ opacity: 0, y: d < 0 ? 20 : -20 })
  };

  return (
    <div className="relative max-w-3xl mx-auto px-6" role="region" aria-label="Témoignages de patients">
      {/* Guillemet décoratif */}
      <div className="text-center text-clay/20 font-serif text-4xl md:text-5xl leading-none select-none mb-2">"</div>

      <div className="relative min-h-[120px] md:min-h-[150px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center"
          >
            <blockquote className="font-serif text-lg md:text-xl text-charcoal leading-relaxed italic mb-4">
              {reviews[index].text}
            </blockquote>

            <div className="w-8 h-[1px] bg-clay/40 mx-auto mb-2"></div>
            <cite className="text-[10px] uppercase tracking-[0.2em] text-clay/70 font-light not-italic">
              {reviews[index].name}
            </cite>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateurs */}
      <div className="flex justify-center items-center gap-1.5 mt-4">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`transition-all duration-500 rounded-full ${
              i === index ? 'w-6 h-1 bg-clay/60' : 'w-1.5 h-1.5 bg-charcoal/15 hover:bg-clay/30'
            }`}
            aria-label={`Témoignage ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
