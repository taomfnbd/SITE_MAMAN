import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from './CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { PiHandPalmLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import LogoBackground from '../components/LogoBackground';
import Testimonials from '../components/Testimonials';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import FadeIn from '../components/FadeIn';

const { 
  FiPlus, FiTrash2, FiType, FiImage, FiAlignLeft, FiGrid, FiX, FiChevronUp, FiChevronDown, 
  FiMove, FiStar, FiLayout, FiPhone, FiColumns, FiMessageSquare, FiInfo, FiList, 
  FiCalendar, FiBookOpen, FiArrowRight, FiMapPin, FiCheck 
} = FiIcons;

const EditableLink = ({ to, className, children }) => {
  const { isEditMode } = useCMS();
  if (isEditMode) {
    return <div className={className}>{children}</div>;
  }
  return <Link to={to} className={className}>{children}</Link>;
};

const EditableExternalLink = ({ href, className, children, ...props }) => {
  const { isEditMode } = useCMS();
  if (isEditMode) {
    return <div className={className}>{children}</div>;
  }
  return <a href={href} className={className} {...props}>{children}</a>;
};

const SECTION_TYPES = {
  // Structurels
  HERO: 'hero',
  DOUBLE_ENTRY: 'double-entry',
  THREE_COLUMNS: 'three-columns',
  // Contenu
  TEXT: 'text',
  IMAGE: 'image',
  TEXT_IMAGE: 'text-image',
  IMAGE_TEXT: 'image-text',
  QUOTE: 'quote',
  // Spécifiques Home
  METHOD: 'method',
  SERVICES: 'services',
  TESTIMONIALS: 'testimonials',
  CONTACT: 'contact',
  // Spécifiques Pages
  METHOD_INTRO: 'method-intro',
  METHOD_CONCEPTS: 'method-concepts',
  DISCLAIMER: 'disclaimer',
  FORMATIONS_INTRO: 'formations-intro',
  FORMATIONS_GRID: 'formations-grid',
  CURSUS_YEARS: 'cursus-years', // New section type
  SEANCES_PRICING: 'seances-pricing', // New section type
  PARCOURS_LAYOUT: 'parcours-layout', // New section type
  RESSOURCES_GRID: 'ressources-grid',
  BLOG_GRID: 'blog-grid',
  ATELIERS_LAYOUT: 'ateliers-layout',
  CONTACT_INFO_GRID: 'contact-info-grid',
  CONTACT_MAP: 'contact-map',
};

const SECTION_CONFIG = [
  {
    category: 'Structure',
    items: [
      { type: SECTION_TYPES.HERO, label: 'En-tête (Hero)', icon: FiLayout },
      { type: SECTION_TYPES.DOUBLE_ENTRY, label: 'Double Entrée', icon: FiColumns },
      { type: SECTION_TYPES.THREE_COLUMNS, label: '3 Colonnes', icon: FiGrid },
    ]
  },
  {
    category: 'Contenu Riche',
    items: [
      { type: SECTION_TYPES.TEXT_IMAGE, label: 'Texte + Image', icon: FiLayout },
      { type: SECTION_TYPES.IMAGE_TEXT, label: 'Image + Texte', icon: FiLayout },
      { type: SECTION_TYPES.QUOTE, label: 'Citation', icon: FiMessageSquare },
      { type: SECTION_TYPES.TEXT, label: 'Texte Simple', icon: FiType },
      { type: SECTION_TYPES.IMAGE, label: 'Image Seule', icon: FiImage },
    ]
  },
  {
    category: 'Modules Spécifiques',
    items: [
      { type: SECTION_TYPES.TESTIMONIALS, label: 'Témoignages', icon: FiStar },
      { type: SECTION_TYPES.CONTACT, label: 'Contact (Simple)', icon: FiPhone },
      { type: SECTION_TYPES.SERVICES, label: 'Services & Tarifs', icon: FiList },
      { type: SECTION_TYPES.METHOD, label: 'Bloc Méthode', icon: FiInfo },
      { type: SECTION_TYPES.DISCLAIMER, label: 'Avertissement', icon: FiInfo },
      { type: SECTION_TYPES.CONTACT_INFO_GRID, label: 'Grille Contact', icon: FiPhone },
      { type: SECTION_TYPES.CONTACT_MAP, label: 'Carte & Zone', icon: FiMapPin },
    ]
  }
];

const DEFAULT_SECTIONS = {
  home: [],
  methode: [],
  parcours: [], // Added parcours
  formations: [],
  contact: [],
  ateliers: [],
  seances: [], // Added seances
  ressources: [],
  blog: [],
  mentions: []
};

// Re-populating DEFAULT_SECTIONS with content from analysis
DEFAULT_SECTIONS.home = [
    {
      id: 'home-hero',
      type: 'hero',
      content: {
        title1: 'Floureto',
        title2: 'Férigoule',
        subtitle: 'Approche manuelle douce et énergétique. Pierrefonds (60)'
      }
    },
    {
      id: 'home-double-entry',
      type: 'double-entry',
      content: {
        card1Title: 'Soin & Thérapie',
        card1Desc: 'Séances individuelles Méthode Poyet. Adultes, enfants et nourrissons.',
        card1Cta: 'Découvrir la pratique',
        card2Title: 'Formation & Transmission',
        card2Desc: 'Cursus professionnel et stages. Pour thérapeutes et particuliers.',
        card2Cta: 'Voir les enseignements'
      }
    },
    {
      id: 'home-method',
      type: 'method',
      content: {
        title: 'La Méthode Poyet',
        p1: 'La Méthode Poyet est une approche manuelle qui allie micro-mouvements précis et techniques énergétiques pour favoriser l\'harmonisation du corps.',
        p2: "Elle s'adresse à celles et ceux qui recherchent un équilibre global et un bien-être corporel, émotionnel et psychique, sans manipulation structurelle.",
        cta: 'En savoir plus'
      }
    },
    {
      id: 'home-services',
      type: 'services',
      content: {
        tag: 'Accompagnement',
        title: 'Séances & Tarifs',
        s1Title: 'Séance Adulte',
        s1Desc: 'Harmonisation globale. Douleurs chroniques, stress, migraines, troubles digestifs.',
        s1Price: '70 €',
        s1Duration: '1h15',
        s2Title: 'Enfant & Bébé',
        s2Desc: 'Coliques, sommeil, plagiocéphalie. Une approche douce adaptée aux moins de 7 ans.',
        s2Price: '60 €',
        s2Duration: '~ 1h00',
        cta: 'Voir les forfaits & détails'
      }
    },
    {
      id: 'home-testimonials',
      type: 'testimonials',
      content: {
        title: 'Témoignages'
      }
    },
    {
      id: 'home-contact',
      type: 'contact',
      content: {
        title: 'Prendre Rendez-vous',
        cta: 'Réserver sur Resalib'
      }
    }
];

DEFAULT_SECTIONS.parcours = [
    {
        id: 'parcours-layout',
        type: 'parcours-layout',
        content: {
            introTitle: "Transmettre",
            introText1: "La transmission est au centre de ma vie professionnelle depuis plus de vingt ans. Transmettre c'est transporter quelque chose, avec l'idée de passage, de transfert. En athlétisme, le relais est une course dans laquelle on se transmet un témoin. En mécanique on parle également de communication de mouvement d'organe vers un autre au moyen d'un système (engrenage, etc..).",
            introText2: "Toutes ces acceptions sous-tendent l'idée, essentielle pour moi, d'un système collaboratif et participatif. C'est cette posture qui m'anime toujours de la conception à la réalisation des ateliers que je propose.",
            prevTitle: "Parcours professionnel antérieur",
            prevText1: "Mes premières expériences professionnelles appartiennent à une discipline bien différente : l'enseignement et la formation de formateurs. Je tiens à les faire figurer ici car indéniablement, elles ont façonné et continuent de façonner la personne que je suis aujourd'hui.",
            prevText2: "J'ai enseigné le français en France très jeune, ma Licence de Lettres Modernes en poche. Dans la foulée, je suis partie vivre au Laos et j'ai commencé à enseigner le français à l'université de Vientiane puis à celle de Phnom Penh au Cambodge. De retour en France, j'ai passé le CAPES de Lettres Modernes.",
            prevText3: "Depuis, je fais cohabiter mes deux passions : l'enseignement et la pratique manuelle. En réalité, je ne pratique pas deux métiers différents. Je fais un seul et même métier qui se décline en deux modalités différentes.",
            mainTitle: "Formation Principale",
            mainText1: "La méthode Poyet est enseignée dans plusieurs écoles non conventionnées en France et en Espagne. Vous pouvez vous référer au site de la Fédération Internationale des Enseignants en Méthode Poyet pour de plus amples informations.",
            mainText2: "Pour ma part, j'ai suivi les quatre années proposées à l'Institut des Thérapies Informationnelles à Paris. J'ai été accompagnée tout au long de cette formation exigeante et incroyablement riche par des formateurs chevronnés et reconnus :",
            mainList: "• Jean-Claude Hernandez\n• Odile Baudonnel\n• Pierre Van Buyderen\n• Fabrice Megrot",
            mainText3: "En plus d'un enseignement rigoureux du fonctionnement du corps humain et de l'ensemble des techniques de Maurice Poyet, j'ai eu la chance de bénéficier d'une transmission généreuse et plurielle. C'est cette histoire, nourrie de ma pratique quotidienne, que je mets aujourd'hui à votre service.",
            contTitle: "Ma Formation Continue",
            duDate: "Octobre 2024 – Juin 2025",
            duTitle: "D.U. Éthique, soin, santé et société",
            duLoc: "Université Paris-Saclay / Espace éthique IDF",
            duDesc: "Mémoire : « Les éthiques du care au service d'une méthode de soin non conventionnelle : la méthode Poyet », sous la direction de Virginie Ponelle.",
            ptTitle: "Approche tissulaire (Pierre Tricot)",
            ptList: "Octobre 2025 - Briqueville-la-Blouette : Niveau 2 (Avec Pierre Tricot, Alain Decouvelaere, Céline Dorland et Brice Thibault)\nDécembre 2024 - Saint-Pierre-des-Corps : Niveau 1 (Avec Pierre Tricot, Alain Decouvelaere, Cyril Bauters et Brice Thibault)\nSeptembre 2022 - Lille : Niveau 1 + (Animé par Alain Decouvelaere et Maxime Legrand)\nNovembre 2021 - Lyon : Niveau 1 (Animé par Alain Decouvelaere)",
            disclaimer: "J'ai été formée à la méthode Poyet par une école qui délivre des formations non encadrées par la loi. Les textes publiés sur ce site n'ont aucunement l'intention d'induire en erreur les personnes intéressées par mon travail. Je ne suis pas médecin et vous engage à en consulter un.e si cela vous semble nécessaire. Dans le doute, consultez en priorité un médecin et/ou un spécialiste."
        }
    }
];

DEFAULT_SECTIONS.methode = [
    {
      id: 'methode-intro',
      type: 'method-intro',
      content: {
        title: 'Une écoute absolue',
        p1: 'La Méthode Poyet repose sur des gestes légers et précis qui vont stimuler les mécanismes naturels du corps. Ces pressions infimes accompagnent le corps vers un rééquilibrage progressif, libèrent les tensions physiques, émotionnelles et psychiques.',
        p2: "Maurice Poyet, dans l'unique ouvrage qu'il a laissé sur sa méthode, parle d'un toucher de l'ordre de « la pression d'un papillon sur une fleur ».",
        title2: 'Le toucher comme relation',
        content2: 'Ce toucher est particulier et peut être déroutant la première fois, tant il est à la fois léger et précis. Henri Focillon, dans son Éloge de la main propose une vision qui me plait et dont je perçois tous les jours la réalité : « la main est action : elle prend, elle crée, et parfois on dirait qu\'elle pense ».',
        content3: "Il me semble pourtant qu'il manque encore une dimension : c'est la dynamique qui s'articule par et avec la main qui touche. Je vois dans ce contact une rencontre entre deux personnes qui consentent à entrer en relation (du latin cum tactus = « être en relation »)."
      }
    },
    {
      id: 'methode-concepts',
      type: 'method-concepts',
      content: {
        c1Title: 'MRP & Écoute',
        c1Desc: "Je travaille sur l'écoute du Mouvement Respiratoire Primaire (MRP). C'est un dialogue parfois bavard, parfois pudique avec les tissus, pour proposer une voie vers le mieux-être.",
        c2Title: 'Axe Crâne-Sacrum',
        c2Desc: "Je pars d'un protocole établi crâne/sacrum/crâne. La relation via la dure-mère est au centre de mon attention. Les 'claviers' du sacrum me permettent d'agir à distance et précisément.",
        c3Title: 'Les Chaînes',
        c3Desc: 'Les « chaînes de Poyet » régissent les liens énergétiques entre le sacrum, le crâne, la colonne vertébrale et les viscères associés. Une harmonisation globale pour une correction durable.'
      }
    },
    {
      id: 'methode-disclaimer',
      type: 'disclaimer',
      content: {
        text: "J'ai été formée à la méthode Poyet par une école qui délivre des formations non encadrées par la loi. Les textes publiés sur ce site n'ont aucunement l'intention d'induire en erreur les personnes intéressées par mon travail. Je ne suis pas médecin et vous engage à en consulter un.e si cela vous semble nécessaire. Dans le doute, consultez en priorité un médecin et/ou un spécialiste. Le parcours de santé via le médecin généraliste et spécialiste est prioritaire à toutes autres démarches."
      }
    }
];

DEFAULT_SECTIONS.formations = [
    {
        id: 'formations-intro',
        type: 'formations-intro',
        content: {
            desc: "Enseignante de métier et thérapeute par vocation, j'ai à cœur de partager les outils qui m'animent. Je propose des cursus et des stages pour vous accompagner vers plus de conscience et d'autonomie."
        }
    },
    {
        id: 'formations-cursus',
        type: 'cursus-years',
        content: {
            intro: "Je dispense une formation certifiante en 3 ans. Cela comprend 6 séminaires de 3 jours par an, un suivi personnalisé, un examen final et la soutenance d'un mémoire.",
            y1Title: "Les Fondamentaux",
            y1Modules: "Le Mouvement Respiratoire Primaire (MRP) : je vous apprends l'écoute et la perception.\nLe sacrum et le bassin : bases de l'équilibre que nous étudions en détail.\nLe crâne : anatomie et micromouvements des os de la voûte.\nLes lois de la méthode Poyet : fluidité et axes.",
            y2Title: "La Structure & Les Organes",
            y2Modules: "La colonne vertébrale : étude étage par étage.\nLes membres inférieurs et supérieurs.\nL'approche viscérale : foie, estomac, intestins.\nLes chaînes musculaires et énergétiques.",
            y3Title: "Clinique & Synthèse",
            y3Modules: "Le crâne facial et les sens.\nSomato-émotionnel : le corps mémoire.\nPathologies spécifiques et cas cliniques.\nJe vous prépare à votre installation professionnelle.",
            downloadCta: "Télécharger le programme PDF"
        }
    }
];

DEFAULT_SECTIONS.ressources = [
    {
        id: 'ressources-grid',
        type: 'ressources-grid',
        content: {
            card1Desc: "Une sélection d'ouvrages fondamentaux sur la thérapie manuelle, la somatothérapie et la spiritualité.",
            card1Cta: "Explorer",
            card1Title: "La Bibliothèque",
            card1Subtitle: "Nos lectures",
            card2Desc: "Un réseau de confiance : écoles, fédérations et praticiens partenaires.",
            card2Cta: "Voir les liens",
            card2Title: "Le Réseau",
            card2Subtitle: "Liens utiles"
        }
    }
];

DEFAULT_SECTIONS.blog = [
    {
        id: 'blog-grid',
        type: 'blog-grid',
        content: {
            card1Title: "Actualités",
            card1Subtitle: "Tenez-vous informé des événements, nouveaux créneaux et informations pratiques du cabinet.",
            card1Count: "12 Articles",
            card2Title: "Au fil des jours",
            card2Subtitle: "Réflexions personnelles sur la santé, le corps, les saisons et la poésie du vivant.",
            card2Count: "45 Articles"
        }
    }
];

DEFAULT_SECTIONS.ateliers = []; // Ateliers now uses Stages articles directly

DEFAULT_SECTIONS.seances = [
    {
        id: 'seances-pricing',
        type: 'seances-pricing',
        content: {
            intro: "La méthode Poyet est une approche globale. Il faut du temps pour développer les points que vous souhaitez aborder. De mon côté, j'ai besoin de temps pour mettre en place une écoute active.",
            s1Title: "Séance Adulte",
            s1Time: "1h15",
            s1Price: "70 €",
            s1Desc: "Le temps nécessaire pour une anamnèse complète et une harmonisation profonde. Sur le dos, sur le ventre ou assis.",
            s1Details: "Forfait 2 séances : 135 €\nForfait 3 séances : 195 €",
            s2Title: "Enfant (-7 ans)",
            s2Time: "~1h00",
            s2Price: "60 €",
            s2Desc: "Adapté aux plus jeunes. Présence d'un parent requise. Idéal pour les troubles du sommeil, coliques, ou après la naissance.",
            s2Details: "Forfait 2 séances : 110 €",
            philoTitle: "Réflexion sur le \"juste prix\"",
            philoContent: "La question du juste prix est épineuse. Comment évaluer le juste prix ? A l'aune de quels critères : le temps passé ? Les compétences ? L'engagement ?\n\nLe système de sécurité sociale en France permet à chacun.e d'accéder à des soins sans verser d'argent direct. Ce système a cependant un effet pervers : nous sommes parfois peu capables d'estimer le prix des soins reçus.\n\nJe ne travaille pas dans le domaine du soin médical conventionné, aussi j'ai la liberté de fixer mes tarifs. Pour autant, je m'inscris pleinement dans les métiers du « care » (sollicitude, accompagnement).\n\nVoici ce que je mets dans la balance : le temps passé (1h15), mon implication dans les formations continues, mes lectures, mon développement personnel. Je considère que cet investissement quotidien nourrit mon savoir-faire et mon avoir-être.",
            info1: "Venez avec une\ntenue souple et confortable.",
            info2: "Prévoyez 1h15\nde disponibilité.",
            info3: "Règlement Chèque\nou Espèces.",
            bookCta: "Réserver en ligne"
        }
    }
];

DEFAULT_SECTIONS.contact = [
    {
        id: 'contact-info-grid',
        type: 'contact-info-grid',
        content: {
            card1Title: "Adresse",
            card1Content: "29 Rue du Mont Berny, 60350 Pierrefonds. Stationnement gratuit dans la rue",
            card2Title: "Téléphone",
            card2Content: "07 69 05 10 87. Laissez un message si je suis en consultation",
            card3Title: "Réservation",
            card3Content: "Prendre rendez-vous sur Resalib. Créneaux disponibles en ligne"
        }
    },
    {
        id: 'contact-map',
        type: 'contact-map',
        content: {
            zoneTitle: "Zone de proximité",
            zoneDesc: "Le cabinet est situé à Pierrefonds, idéalement placé pour les patients venant de :",
            city1: "Compiègne", city2: "Choisy-au-Bac", city3: "Crépy-en-Valois", 
            city4: "Clairoix", city5: "Villers-Cotterêt", city6: "Pont Sainte Maxence",
            legal: "Conformément aux articles L.616-1 et R.616-1 du code de la consommation, nous proposons un dispositif de médiation de la consommation (voir Mentions Légales)."
        }
    }
];

const SectionManager = ({ pageId }) => {
  const { isEditMode, getContent, updateContent } = useCMS();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [insertPosition, setInsertPosition] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const sections = getContent(`${pageId}.sections`, []);

  useEffect(() => {
    if (DEFAULT_SECTIONS[pageId] && sections.length === 0) {
      updateContent(`${pageId}.sections`, DEFAULT_SECTIONS[pageId]);
    }
  }, [pageId, sections.length, updateContent]);

  // ... (Keep existing SectionManager logic: addSection, deleteSection, moveSection, handlers)
  const addSection = (type, position = null) => {
    const newSection = {
      id: `section-${Date.now()}`,
      type,
      content: getDefaultContent(type)
    };

    let newSections;
    if (position !== null) {
      newSections = [...sections];
      newSections.splice(position, 0, newSection);
    } else {
      newSections = [...sections, newSection];
    }

    updateContent(`${pageId}.sections`, newSections);
    setShowAddMenu(false);
    setInsertPosition(null);
  };

  const deleteSection = (sectionId) => {
    if (confirm('Voulez-vous vraiment supprimer cette section ?')) {
      const newSections = sections.filter(s => s.id !== sectionId);
      updateContent(`${pageId}.sections`, newSections);
    }
  };

  const moveSection = (fromIndex, direction) => {
    const newSections = [...sections];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;

    if (toIndex < 0 || toIndex >= newSections.length) return;

    [newSections[fromIndex], newSections[toIndex]] = [newSections[toIndex], newSections[fromIndex]];
    updateContent(`${pageId}.sections`, newSections);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    
    newSections.splice(draggedIndex, 1);
    newSections.splice(dropIndex, 0, draggedSection);

    updateContent(`${pageId}.sections`, newSections);
    setDraggedIndex(null);
  };

  const updateSectionContent = (sectionId, field, value) => {
    const newSections = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          content: {
            ...s.content,
            [field]: value
          }
        };
      }
      return s;
    });
    updateContent(`${pageId}.sections`, newSections);
  };

  if (!isEditMode) {
    return (
      <div className="space-y-0">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-32">
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <motion.div
            layout
            className={`relative rounded-xl transition-all group ${
              draggedIndex === index 
                ? 'ring-2 ring-clay shadow-2xl scale-[1.02] z-30 bg-paper' 
                : 'hover:ring-1 hover:ring-clay/30'
            }`}
          >
            {/* Control Overlay */}
            <div className="absolute -top-3 left-0 right-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none">
                <div className="bg-paper border border-clay/30 rounded-full shadow-lg px-4 py-1 flex items-center gap-3 pointer-events-auto">
                    <div 
                        className="cursor-move text-clay hover:text-white flex items-center gap-2 pr-3 border-r border-white/10"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        <SafeIcon icon={FiMove} />
                        <span className="text-xs uppercase tracking-widest font-medium">Déplacer</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className={`p-1.5 rounded-full hover:bg-white/10 text-charcoal ${index === 0 ? 'opacity-30' : ''}`}><SafeIcon icon={FiChevronUp} /></button>
                        <button onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1} className={`p-1.5 rounded-full hover:bg-white/10 text-charcoal ${index === sections.length - 1 ? 'opacity-30' : ''}`}><SafeIcon icon={FiChevronDown} /></button>
                    </div>

                    <div className="pl-3 border-l border-white/10">
                        <button onClick={() => deleteSection(section.id)} className="p-1.5 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-500 transition-colors"><SafeIcon icon={FiTrash2} /></button>
                    </div>
                </div>
            </div>

            <SectionRenderer section={section} onUpdate={(field, value) => updateSectionContent(section.id, field, value)} />
          </motion.div>

          <div className="h-4 -my-2 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20">
             <div className="w-full h-px bg-clay/30 absolute"></div>
             <button onClick={() => { setInsertPosition(index + 1); setShowAddMenu(true); }} className="relative bg-paper border border-clay text-clay rounded-full w-8 h-8 flex items-center justify-center hover:bg-clay hover:text-paper transition-all shadow-sm"><SafeIcon icon={FiPlus} /></button>
            {showAddMenu && insertPosition === index + 1 && (<AddSectionMenu onSelect={(type) => addSection(type, index + 1)} onClose={() => { setShowAddMenu(false); setInsertPosition(null); }} />)}
          </div>
        </React.Fragment>
      ))}

      <div className="fixed bottom-24 left-6 z-40">
          <button onClick={() => { setInsertPosition(sections.length); setShowAddMenu(true); }} className="group flex items-center justify-center w-14 h-14 bg-clay text-paper rounded-full shadow-xl hover:scale-110 transition-all duration-300 border-2 border-paper">
            <SafeIcon icon={FiPlus} className="text-2xl" />
            <span className="absolute left-full ml-4 bg-paper text-clay px-3 py-1 rounded text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-clay/20 pointer-events-none">Ajouter une section</span>
          </button>
          {showAddMenu && insertPosition === sections.length && (<AddSectionMenu onSelect={(type) => addSection(type)} onClose={() => { setShowAddMenu(false); setInsertPosition(null); }} className="absolute bottom-full left-0 mb-4" />)}
      </div>

      {sections.length === 0 && (
        <div className="relative text-center py-20">
          <button onClick={() => setShowAddMenu(!showAddMenu)} className="inline-flex items-center space-x-2 bg-clay text-paper px-6 py-3 rounded-lg hover:bg-white transition-colors"><SafeIcon icon={FiPlus} /><span>Ajouter une première section</span></button>
          {showAddMenu && sections.length === 0 && (<AddSectionMenu onSelect={(type) => addSection(type)} onClose={() => setShowAddMenu(false)} />)}
        </div>
      )}
    </div>
  );
};

const AddSectionMenu = ({ onSelect, onClose, className = "absolute top-10 left-1/2 -translate-x-1/2" }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div 
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.9, y: 10 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.9, y: 10 }} 
      className={`${className} bg-paper/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 w-[30rem]`}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-clay/5">
        <h3 className="font-serif text-charcoal text-lg italic">Ajouter une section</h3>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-charcoal-light hover:text-red-400 transition-colors"><SafeIcon icon={FiX} /></button>
      </div>
      <div className="max-h-[32rem] overflow-y-auto custom-scrollbar p-4 space-y-6">
        {SECTION_CONFIG.map((category, idx) => (
          <div key={idx}>
            <h4 className="text-xs uppercase tracking-widest text-clay font-medium mb-3 pl-1">{category.category}</h4>
            <div className="grid grid-cols-2 gap-3">
              {category.items.map((item) => (
                <button key={item.type} onClick={() => onSelect(item.type)} className="group flex items-center p-3 text-left border border-white/5 bg-white/5 rounded-xl hover:bg-clay/10 hover:border-clay/30 transition-all duration-300">
                  <span className="p-2 rounded-lg bg-paper text-clay group-hover:scale-110 transition-transform duration-300 shadow-sm"><SafeIcon icon={item.icon} className="text-lg" /></span>
                  <span className="ml-3 block text-sm text-charcoal group-hover:text-clay font-medium transition-colors">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SectionRenderer = ({ section, onUpdate }) => {
  const { content } = section;
  const isEditing = !!onUpdate;
  const Text = (props) => (<EditableText value={content[props.field]} onChange={(val) => onUpdate && onUpdate(props.field, val)} {...props} />);

  switch (section.type) {
    // --- NEW SPECIFIC SECTIONS ---
    case SECTION_TYPES.CURSUS_YEARS:
        return (
            <div className="max-w-4xl mx-auto px-6 pb-20">
                <FadeIn className="bg-sage/20 p-8 border border-white/5 mb-16 text-center">
                    <div className="text-charcoal-light font-light leading-relaxed"><Text field="intro" multiline defaultValue="..." /></div>
                </FadeIn>
                <div className="space-y-4">
                    {[1, 2, 3].map(year => (
                        <FadeIn key={year} delay={0.1 * year} className="mb-12 last:mb-0 relative pl-8 md:pl-0">
                            <div className="md:grid md:grid-cols-[150px_1fr] gap-8">
                                <div className="mb-4 md:mb-0">
                                    <span className="text-6xl font-serif text-charcoal/10 font-bold absolute -left-4 -top-6 md:static md:block md:text-right md:pr-8">0{year}</span>
                                </div>
                                <div className="border-l border-clay/20 pl-8 py-2">
                                    <h3 className="text-2xl font-serif text-charcoal mb-6"><Text field={`y${year}Title`} defaultValue={`Année ${year}`} /></h3>
                                    <div className="text-charcoal-light font-light text-sm leading-relaxed whitespace-pre-wrap"><Text field={`y${year}Modules`} multiline defaultValue="..." /></div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
                <FadeIn delay={0.4} className="mt-16 text-center">
                    <button className="bg-clay text-paper px-8 py-4 uppercase tracking-widest text-xs font-medium hover:bg-white transition-colors duration-500"><Text field="downloadCta" defaultValue="Télécharger le programme PDF" /></button>
                </FadeIn>
            </div>
        );
    case SECTION_TYPES.FORMATIONS_INTRO:
        return (
            <div className="max-w-4xl mx-auto px-6 mb-16 text-center pt-16">
                <FadeIn>
                    <div className="text-charcoal-light font-light leading-loose text-lg">
                        <Text field="desc" multiline defaultValue="..." />
                    </div>
                </FadeIn>
            </div>
        );
    case SECTION_TYPES.FORMATIONS_GRID:
        return (
            <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 pb-16">
                <FadeIn>
                    <EditableLink to="/formations" className="group block relative h-full">
                        <div className="absolute inset-0 bg-sage/20 border border-white/5 transform transition-transform duration-500 group-hover:-translate-y-2"></div>
                        <div className="relative p-10 h-full flex flex-col justify-between border border-transparent group-hover:border-clay/20 transition-colors duration-500">
                        <div>
                            <div className="w-12 h-12 bg-paper rounded-full flex items-center justify-center mb-6 text-clay border border-white/5 group-hover:border-clay/40 transition-colors"><SafeIcon icon={FiBookOpen} className="text-xl" /></div>
                            <h3 className="text-2xl font-serif text-charcoal mb-4 group-hover:text-clay transition-colors"><Text field="card1Title" defaultValue="Cursus" /></h3>
                            <div className="text-charcoal-light font-light leading-relaxed mb-8"><Text field="card1Desc" multiline defaultValue="..." /></div>
                        </div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-clay/80 group-hover:text-clay"><Text field="card1Cta" defaultValue="Découvrir" /> <SafeIcon icon={FiArrowRight} className="transform group-hover:translate-x-2 transition-transform duration-300" /></div>
                        </div>
                    </EditableLink>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <EditableLink to="/ateliers" className="group block relative h-full">
                        <div className="absolute inset-0 bg-sage/20 border border-white/5 transform transition-transform duration-500 group-hover:-translate-y-2"></div>
                        <div className="relative p-10 h-full flex flex-col justify-between border border-transparent group-hover:border-clay/20 transition-colors duration-500">
                        <div>
                            <div className="w-12 h-12 bg-paper rounded-full flex items-center justify-center mb-6 text-clay border border-white/5 group-hover:border-clay/40 transition-colors"><SafeIcon icon={FiCalendar} className="text-xl" /></div>
                            <h3 className="text-2xl font-serif text-charcoal mb-4 group-hover:text-clay transition-colors"><Text field="card2Title" defaultValue="Stages" /></h3>
                            <div className="text-charcoal-light font-light leading-relaxed mb-8"><Text field="card2Desc" multiline defaultValue="..." /></div>
                        </div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-clay/80 group-hover:text-clay"><Text field="card2Cta" defaultValue="Voir" /> <SafeIcon icon={FiArrowRight} className="transform group-hover:translate-x-2 transition-transform duration-300" /></div>
                        </div>
                    </EditableLink>
                </FadeIn>
            </div>
        );
    case SECTION_TYPES.PARCOURS_LAYOUT:
        return (
            <div className="max-w-4xl mx-auto px-6 pb-20">
                <FadeIn>
                    <h3 className="text-2xl font-serif text-charcoal mb-6"><Text field="introTitle" defaultValue="Transmettre" /></h3>
                    <div className="prose prose-invert max-w-none text-charcoal-light font-light leading-loose text-justify">
                        <div className="whitespace-pre-wrap mb-4"><Text field="introText1" multiline /></div>
                        <div className="whitespace-pre-wrap"><Text field="introText2" multiline /></div>
                    </div>
                </FadeIn>
                <div className="flex justify-center my-16"><div className="w-16 h-[1px] bg-clay/30"></div></div>
                <FadeIn delay={0.1}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center text-clay"><SafeIcon icon={FiIcons.FiMap} /></div>
                        <h3 className="text-2xl font-serif text-charcoal"><Text field="prevTitle" defaultValue="Parcours" /></h3>
                    </div>
                    <div className="prose prose-invert max-w-none text-charcoal-light font-light leading-loose text-justify bg-sage/10 p-8 border border-white/5 rounded-sm">
                        <div className="whitespace-pre-wrap mb-4"><Text field="prevText1" multiline /></div>
                        <div className="whitespace-pre-wrap mb-4"><Text field="prevText2" multiline /></div>
                        <div className="italic text-charcoal/80 border-l-2 border-clay/50 pl-4 mt-6 whitespace-pre-wrap"><Text field="prevText3" multiline /></div>
                    </div>
                </FadeIn>
                <div className="flex justify-center my-16"><div className="w-16 h-[1px] bg-clay/30"></div></div>
                <FadeIn delay={0.2}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center text-clay"><SafeIcon icon={FiIcons.FiAward} /></div>
                        <h3 className="text-2xl font-serif text-charcoal"><Text field="mainTitle" defaultValue="Formation" /></h3>
                    </div>
                    <div className="prose prose-invert max-w-none text-charcoal-light font-light leading-loose text-justify">
                        <div className="whitespace-pre-wrap mb-4"><Text field="mainText1" multiline /></div>
                        <div className="whitespace-pre-wrap mb-4"><Text field="mainText2" multiline /></div>
                        <div className="list-none pl-6 space-y-2 mt-4 mb-6 border-l border-white/10 whitespace-pre-wrap"><Text field="mainList" multiline /></div>
                        <div className="whitespace-pre-wrap"><Text field="mainText3" multiline /></div>
                    </div>
                </FadeIn>
                <div className="flex justify-center my-16"><div className="w-16 h-[1px] bg-clay/30"></div></div>
                <FadeIn delay={0.3}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center text-clay"><SafeIcon icon={FiIcons.FiBookOpen} /></div>
                        <h3 className="text-2xl font-serif text-charcoal"><Text field="contTitle" defaultValue="Continue" /></h3>
                    </div>
                    <div className="space-y-10">
                        <div className="relative pl-8 border-l border-clay/20">
                            <span className="text-xs uppercase tracking-widest text-clay mb-1 block"><Text field="duDate" /></span>
                            <h4 className="text-xl font-serif text-charcoal mb-2"><Text field="duTitle" /></h4>
                            <p className="text-charcoal-light font-light text-sm italic mb-2"><Text field="duLoc" /></p>
                            <div className="text-charcoal-light font-light text-sm leading-relaxed whitespace-pre-wrap"><Text field="duDesc" multiline /></div>
                        </div>
                        <div className="relative pl-8 border-l border-clay/20">
                            <span className="text-xs uppercase tracking-widest text-clay mb-1 block">Formation Continue</span>
                            <h4 className="text-xl font-serif text-charcoal mb-4"><Text field="ptTitle" /></h4>
                            <div className="text-charcoal-light font-light text-sm leading-relaxed whitespace-pre-wrap"><Text field="ptList" multiline /></div>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={0.4} className="mt-20 p-6 bg-sage/30 border border-clay/10 rounded-sm">
                     <div className="text-xs text-charcoal-light font-light leading-relaxed italic text-center whitespace-pre-wrap"><Text field="disclaimer" multiline /></div>
                </FadeIn>
            </div>
        );
    case SECTION_TYPES.RESSOURCES_GRID:
        return (
            <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 py-16">
                <FadeIn className="relative group overflow-hidden bg-sage/20 aspect-[4/3] flex items-center justify-center border border-white/5">
                    <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center z-10">
                        <div className="text-paper font-light mb-6"><Text field="card1Desc" multiline defaultValue="..." /></div>
                        <EditableLink to="/ressources/lectures" className="bg-clay text-paper px-6 py-2 uppercase text-xs tracking-widest hover:bg-white transition-colors"><Text field="card1Cta" defaultValue="Explorer" /></EditableLink>
                    </div>
                    <div className="text-center group-hover:blur-sm transition-all duration-500">
                        <h3 className="font-serif text-3xl text-charcoal italic mb-2"><Text field="card1Title" defaultValue="Bibliothèque" /></h3>
                        <span className="text-xs uppercase tracking-widest text-clay"><Text field="card1Subtitle" defaultValue="Lectures" /></span>
                    </div>
                </FadeIn>
                <FadeIn delay={0.2} className="relative group overflow-hidden bg-sage/20 aspect-[4/3] flex items-center justify-center border border-white/5">
                    <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center z-10">
                        <div className="text-paper font-light mb-6"><Text field="card2Desc" multiline defaultValue="..." /></div>
                        <EditableLink to="/ressources/liens" className="bg-clay text-paper px-6 py-2 uppercase text-xs tracking-widest hover:bg-white transition-colors"><Text field="card2Cta" defaultValue="Voir" /></EditableLink>
                    </div>
                    <div className="text-center group-hover:blur-sm transition-all duration-500">
                        <h3 className="font-serif text-3xl text-charcoal italic mb-2"><Text field="card2Title" defaultValue="Réseau" /></h3>
                        <span className="text-xs uppercase tracking-widest text-clay"><Text field="card2Subtitle" defaultValue="Liens" /></span>
                    </div>
                </FadeIn>
            </div>
        );
    case SECTION_TYPES.BLOG_GRID:
        return (
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 py-16">
                <FadeIn delay={0.1}>
                    <EditableLink to="/blog/actu" className="group block relative h-96 overflow-hidden border border-white/5">
                    <div className={`absolute inset-0 bg-gradient-to-br from-sage to-charcoal opacity-20 group-hover:opacity-30 transition-opacity duration-700`}></div>
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-xs uppercase tracking-widest text-clay mb-2 block"><Text field="card1Count" defaultValue="12 Articles" /></span>
                            <h3 className="text-3xl font-serif text-charcoal italic mb-4"><Text field="card1Title" defaultValue="Actualités" /></h3>
                            <div className="text-charcoal-light font-light text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"><Text field="card1Subtitle" multiline defaultValue="..." /></div>
                        </div>
                    </div>
                    </EditableLink>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <EditableLink to="/blog/journal" className="group block relative h-96 overflow-hidden border border-white/5">
                    <div className={`absolute inset-0 bg-gradient-to-br from-clay/30 to-sage opacity-20 group-hover:opacity-30 transition-opacity duration-700`}></div>
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-xs uppercase tracking-widest text-clay mb-2 block"><Text field="card2Count" defaultValue="45 Articles" /></span>
                            <h3 className="text-3xl font-serif text-charcoal italic mb-4"><Text field="card2Title" defaultValue="Au fil des jours" /></h3>
                            <div className="text-charcoal-light font-light text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"><Text field="card2Subtitle" multiline defaultValue="..." /></div>
                        </div>
                    </div>
                    </EditableLink>
                </FadeIn>
            </div>
        );
    case SECTION_TYPES.ATELIERS_LAYOUT:
        return (
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-16">
                <FadeIn className="order-2 md:order-1">
                <div className="space-y-8">
                    <EditableLink to="/ateliers" className="group block p-8 border border-white/5 hover:bg-sage/10 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-serif text-charcoal group-hover:text-clay transition-colors"><Text field="card1Title" defaultValue="L'Agenda" /></h3>
                        <SafeIcon icon={FiCalendar} className="text-charcoal/30 group-hover:text-clay text-2xl transition-colors" />
                    </div>
                    <p className="text-charcoal-light font-light text-sm mb-4"><Text field="card1Desc" multiline defaultValue="..." /></p>
                    <span className="text-xs uppercase tracking-widest text-clay/70 group-hover:text-clay"><Text field="card1Cta" defaultValue="Consulter →" /></span>
                    </EditableLink>
                    <div className="group block p-8 border border-white/5 bg-sage/5 transition-colors opacity-60">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-serif text-charcoal"><Text field="card2Title" defaultValue="Thématiques" /></h3>
                        <SafeIcon icon={FiList} className="text-charcoal/30 text-2xl" />
                    </div>
                    <p className="text-charcoal-light font-light text-sm mb-4"><Text field="card2Desc" multiline defaultValue="..." /></p>
                    <span className="text-xs uppercase tracking-widest text-clay/70"><Text field="card2Cta" defaultValue="À venir" /></span>
                    </div>
                </div>
                </FadeIn>
                <FadeIn delay={0.2} className="order-1 md:order-2 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square border border-clay/10 rounded-full flex items-center justify-center p-8">
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-pulse-slow"></div>
                    <div className="text-center font-serif italic text-xl text-charcoal/80 leading-relaxed"><Text field="quote" multiline defaultValue="Citation..." /></div>
                </div>
                </FadeIn>
            </div>
        );
    case SECTION_TYPES.CONTACT_INFO_GRID:
        return (
            <div className="max-w-6xl mx-auto px-6 pt-16">
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                    {[1, 2, 3].map(i => {
                        const icon = i===1 ? FiMapPin : i===2 ? FiPhone : FiCalendar;
                        return (
                            <FadeIn key={i} delay={0.1 * i} className="flex flex-col items-center text-center p-6 md:p-8 border border-white/5 bg-sage/10 rounded-sm hover:border-clay/20 transition-colors">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-paper rounded-full flex items-center justify-center mb-4 text-clay shadow-sm"><SafeIcon icon={icon} className="text-lg md:text-xl" /></div>
                                <h3 className="text-lg font-serif text-charcoal mb-2"><Text field={`card${i}Title`} defaultValue="Titre" /></h3>
                                <div className="text-charcoal-light font-light text-sm leading-relaxed"><Text field={`card${i}Content`} multiline defaultValue="..." /></div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        );
    case SECTION_TYPES.CONTACT_MAP:
        return (
            <div className="max-w-6xl mx-auto px-6 pb-16">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <FadeIn className="bg-sage/20 p-6 md:p-10 border border-white/5 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-serif text-charcoal mb-6"><Text field="zoneTitle" defaultValue="Zone" /></h3>
                        <div className="text-charcoal-light font-light leading-loose mb-6 text-sm md:text-base"><Text field="zoneDesc" multiline defaultValue="..." /></div>
                        <ul className="grid grid-cols-2 gap-4 text-sm text-charcoal-light font-light">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <li key={i} className="flex items-center gap-2"><SafeIcon icon={FiMapPin} className="text-clay text-xs"/> <Text field={`city${i}`} defaultValue={`Ville ${i}`} /></li>
                            ))}
                        </ul>
                        <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/10">
                            <div className="text-xs text-charcoal/50 italic"><Text field="legal" multiline defaultValue="..." /></div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2} className="h-[300px] md:h-full md:min-h-[400px] bg-sage/30 border border-white/5 relative group overflow-hidden">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.482755294378!2d2.973956376865296!3d49.34969497933861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e88c0a8a7a8a7b%3A0x4a8a8a8a8a8a8a8a!2s29%20Rue%20du%20Mont%20Berny%2C%2060350%20Pierrefonds!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr" 
                            width="100%" height="100%" style={{border:0, filter: 'grayscale(1) contrast(1.2) opacity(0.7)'}} 
                            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-paper/90 px-4 py-2 text-xs text-charcoal border border-clay/20 backdrop-blur-sm">29 Rue du Mont Berny, Pierrefonds</div>
                    </FadeIn>
                </div>
            </div>
        );

    // --- STANDARD SECTIONS ---
    case SECTION_TYPES.TEXT_IMAGE: return ( <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-6 py-12"><div className="order-2 md:order-1"><h3 className="text-2xl font-serif text-charcoal mb-4 italic"><Text field="title" defaultValue="Titre" /></h3><div className="text-charcoal-light leading-relaxed font-light text-justify"><Text field="content" multiline defaultValue="..." /></div></div><div className="order-1 md:order-2">{isEditing ? (<EditableImage defaultSrc={content.image} onChange={(val) => onUpdate && onUpdate('image', val)} className="w-full h-64 object-cover rounded-lg shadow-md" />) : (content.image && <img src={content.image} alt="" className="w-full h-64 object-cover rounded-lg shadow-md" />)}</div></div> );
    case SECTION_TYPES.IMAGE_TEXT: return ( <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-6 py-12"><div className="order-1">{isEditing ? (<EditableImage defaultSrc={content.image} onChange={(val) => onUpdate && onUpdate('image', val)} className="w-full h-64 object-cover rounded-lg shadow-md" />) : (content.image && <img src={content.image} alt="" className="w-full h-64 object-cover rounded-lg shadow-md" />)}</div><div className="order-2"><h3 className="text-2xl font-serif text-charcoal mb-4 italic"><Text field="title" defaultValue="Titre" /></h3><div className="text-charcoal-light leading-relaxed font-light text-justify"><Text field="content" multiline defaultValue="..." /></div></div></div> );
    case SECTION_TYPES.THREE_COLUMNS: return ( <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">{[1, 2, 3].map(i => (<div key={i} className="bg-sage/10 p-6 rounded-lg border border-white/5"><h4 className="text-xl font-serif text-charcoal mb-3"><Text field={`col${i}Title`} defaultValue={`Colonne ${i}`} /></h4><div className="text-sm text-charcoal-light leading-relaxed"><Text field={`col${i}Text`} multiline defaultValue="..." /></div></div>))}</div> );
    case SECTION_TYPES.QUOTE: return ( <div className="max-w-3xl mx-auto px-6 py-16 text-center"><span className="text-4xl text-clay/30 block mb-4">"</span><div className="text-2xl md:text-3xl font-serif italic text-charcoal mb-6 leading-relaxed"><Text field="quote" multiline defaultValue="..." /></div><div className="text-sm text-clay uppercase tracking-widest font-medium"><Text field="author" defaultValue="Auteur" /></div></div> );
    case SECTION_TYPES.METHOD_INTRO: return ( <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24 items-start max-w-6xl mx-auto px-6 pt-16"><FadeIn><div className="relative p-6 md:p-8 border border-white/5 bg-sage/10"><div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-clay/50 to-transparent"></div><h3 className="text-xl md:text-2xl font-serif text-charcoal italic mb-4 md:mb-6"><Text field="title" defaultValue="Une écoute absolue" /></h3><div className="text-charcoal-light font-light leading-loose text-justify mb-4 text-sm md:text-base"><Text field="p1" multiline /></div><div className="text-charcoal-light font-light leading-loose text-justify text-sm md:text-base"><Text field="p2" multiline /></div></div></FadeIn><FadeIn delay={0.2} className="prose prose-invert prose-p:text-charcoal-light prose-p:font-light prose-p:leading-loose text-justify text-sm md:text-base"><h4 className="text-lg md:text-xl font-serif text-charcoal mb-4"><Text field="title2" defaultValue="Le toucher comme relation" /></h4><div><Text field="content2" multiline /><br/><Text field="content3" multiline /></div></FadeIn></div> );
    case SECTION_TYPES.METHOD_CONCEPTS: return ( <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24 max-w-6xl mx-auto px-6"><FadeIn delay={0.3} className="group p-6 md:p-8 bg-paper border border-white/5 hover:border-clay/30 transition-all duration-500"><span className="text-3xl md:text-4xl font-serif text-clay/20 group-hover:text-clay/40 transition-colors">01</span><h4 className="text-lg md:text-xl font-serif text-charcoal mt-4 mb-3 md:mb-4"><Text field="c1Title" defaultValue="MRP & Écoute" /></h4><div className="text-charcoal-light font-light text-sm leading-7"><Text field="c1Desc" multiline /></div></FadeIn><FadeIn delay={0.4} className="group p-6 md:p-8 bg-paper border border-white/5 hover:border-clay/30 transition-all duration-500"><span className="text-3xl md:text-4xl font-serif text-clay/20 group-hover:text-clay/40 transition-colors">02</span><h4 className="text-lg md:text-xl font-serif text-charcoal mt-4 mb-3 md:mb-4"><Text field="c2Title" defaultValue="Axe Crâne-Sacrum" /></h4><div className="text-charcoal-light font-light text-sm leading-7"><Text field="c2Desc" multiline /></div></FadeIn><FadeIn delay={0.5} className="group p-6 md:p-8 bg-paper border border-white/5 hover:border-clay/30 transition-all duration-500"><span className="text-3xl md:text-4xl font-serif text-clay/20 group-hover:text-clay/40 transition-colors">03</span><h4 className="text-lg md:text-xl font-serif text-charcoal mt-4 mb-3 md:mb-4"><Text field="c3Title" defaultValue="Les Chaînes" /></h4><div className="text-charcoal-light font-light text-sm leading-7"><Text field="c3Desc" multiline /></div></FadeIn></div> );
    case SECTION_TYPES.DISCLAIMER: return ( <FadeIn className="max-w-4xl mx-auto mt-64 md:mt-96 mb-20"><div className="p-6 border border-clay/10 bg-sage/30 rounded-sm px-6"><h5 className="text-clay text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-clay"></span>Avertissement Important</h5><div className="text-charcoal-light text-xs leading-relaxed italic"><Text field="text" multiline /></div></div></FadeIn> );
    case SECTION_TYPES.HERO: return ( <section className="relative min-h-screen flex flex-col items-center justify-end pb-12 md:pb-20 px-6 pt-20 overflow-hidden"><LogoBackground /><div className="relative z-10 text-center max-w-4xl mx-auto pointer-events-none mb-12 lg:mb-16"><FadeIn delay={1.2} className="pointer-events-auto"><div className="text-charcoal-light font-light text-base md:text-lg max-w-xs md:max-w-lg mx-auto leading-relaxed"><Text field="subtitle" defaultValue="Approche manuelle douce et énergétique. Pierrefonds (60)" multiline /></div></FadeIn><FadeIn delay={1.4} className="pointer-events-auto mt-10"><EditableExternalLink href="https://flouretoferigoule-methodepoyet.fr/resalib" target="_blank" rel="noopener noreferrer" className="bg-clay text-paper px-8 py-3 uppercase tracking-widest text-xs font-medium hover:bg-white transition-colors duration-500 rounded-sm">Réserver</EditableExternalLink></FadeIn></div></section> );
    case SECTION_TYPES.DOUBLE_ENTRY: return ( <section className="px-6 relative z-10 -mt-20 pb-20"><FadeIn delay={1.4} className="relative z-20 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pointer-events-auto"><EditableLink to="/methode" className="group relative block p-8 md:p-12 border border-white/5 bg-paper/20 backdrop-blur-sm hover:bg-sage/40 transition-all duration-700 text-center rounded-sm overflow-hidden"><div className="absolute inset-0 border border-transparent group-hover:border-clay/20 transition-colors duration-700"></div><div className="relative z-10"><span className="inline-block p-4 rounded-full bg-white/5 text-clay mb-6 group-hover:scale-110 transition-transform duration-500"><SafeIcon icon={PiHandPalmLight} className="text-3xl" /></span><h2 className="text-2xl md:text-3xl font-serif text-charcoal mb-4 italic group-hover:text-clay transition-colors duration-500"><Text field="card1Title" defaultValue="Soin & Thérapie" /></h2><div className="text-charcoal-light/80 font-light text-sm md:text-base mb-8 leading-relaxed"><Text field="card1Desc" defaultValue="Séances..." multiline /></div><span className="inline-block text-[10px] uppercase tracking-[0.25em] text-clay border-b border-clay/30 pb-1 group-hover:border-clay transition-all duration-500"><Text field="card1Cta" defaultValue="Découvrir la pratique" /></span></div></EditableLink><EditableLink to="/formations" className="group relative block p-8 md:p-12 border border-white/5 bg-paper/20 backdrop-blur-sm hover:bg-sage/40 transition-all duration-700 text-center rounded-sm overflow-hidden"><div className="absolute inset-0 border border-transparent group-hover:border-clay/20 transition-colors duration-700"></div><div className="relative z-10"><span className="inline-block p-4 rounded-full bg-white/5 text-clay mb-6 group-hover:scale-110 transition-transform duration-500"><SafeIcon icon={FiIcons.FiBookOpen} className="text-2xl" /></span><h2 className="text-2xl md:text-3xl font-serif text-charcoal mb-4 italic group-hover:text-clay transition-colors duration-500"><Text field="card2Title" defaultValue="Formation & Transmission" /></h2><div className="text-charcoal-light/80 font-light text-sm md:text-base mb-8 leading-relaxed"><Text field="card2Desc" defaultValue="Cursus..." multiline /></div><span className="inline-block text-[10px] uppercase tracking-[0.25em] text-clay border-b border-clay/30 pb-1 group-hover:border-clay transition-all duration-500"><Text field="card2Cta" defaultValue="Voir les enseignements" /></span></div></EditableLink></FadeIn></section> );
    case SECTION_TYPES.METHOD: return ( <section className="py-12 md:py-20 px-6 relative z-10 bg-gradient-to-b from-transparent to-sage/10"><div className="max-w-3xl mx-auto"><FadeIn><div className="flex flex-col items-center text-center space-y-8 md:space-y-12"><h2 className="text-2xl md:text-4xl font-serif text-charcoal italic px-4"><Text field="title" defaultValue="La Méthode Poyet" /></h2><div className="space-y-6 md:space-y-8 text-charcoal-light font-light text-justify md:text-center text-base md:text-xl md:leading-10 leading-8"><Text field="p1" multiline /><Text field="p2" multiline /></div><div className="pt-4 md:pt-8 flex flex-col md:flex-row gap-8 justify-center items-center"><EditableLink to="/methode" className="inline-block border-b border-charcoal/30 pb-1 text-xs md:text-sm uppercase tracking-widest hover:border-clay hover:text-clay transition-all duration-500"><Text field="cta" defaultValue="En savoir plus" /></EditableLink></div></div></FadeIn></div></section> );
    case SECTION_TYPES.SERVICES: return ( <section className="py-20 md:py-32 px-6 bg-sage/30 relative z-10 border-y border-white/5"><div className="max-w-6xl mx-auto"><FadeIn><div className="text-center mb-16 md:mb-24"><span className="text-clay text-xs tracking-[0.2em] uppercase block mb-4"><Text field="tag" defaultValue="Accompagnement" /></span><h2 className="text-3xl md:text-4xl font-serif italic text-charcoal"><Text field="title" defaultValue="Séances & Tarifs" /></h2></div></FadeIn><div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto"><FadeIn delay={0.2} className="relative p-6 md:p-8 border border-white/5 hover:border-clay/30 bg-paper/50 transition-all duration-500 group"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-paper border border-clay/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><span className="font-serif text-clay italic text-sm md:text-base">01</span></div><h3 className="text-lg md:text-xl font-serif mb-4 md:mb-6 mt-2 md:mt-4 text-center text-charcoal"><Text field="s1Title" defaultValue="Séance Adulte" /></h3><div className="text-sm text-charcoal-light leading-7 text-center font-light mb-6"><Text field="s1Desc" multiline /></div><div className="border-t border-white/5 pt-4 text-center"><span className="text-xl text-clay font-serif"><Text field="s1Price" /></span><span className="block text-xs text-charcoal/50 mt-1 uppercase tracking-widest"><Text field="s1Duration" /></span></div></FadeIn><FadeIn delay={0.4} className="relative p-6 md:p-8 border border-white/5 hover:border-clay/30 bg-paper/50 transition-all duration-500 group"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-paper border border-clay/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><span className="font-serif text-clay italic text-sm md:text-base">02</span></div><h3 className="text-lg md:text-xl font-serif mb-4 md:mb-6 mt-2 md:mt-4 text-center text-charcoal"><Text field="s2Title" defaultValue="Enfant & Bébé" /></h3><div className="text-sm text-charcoal-light leading-7 text-center font-light mb-6"><Text field="s2Desc" multiline /></div><div className="border-t border-white/5 pt-4 text-center"><span className="text-xl text-clay font-serif"><Text field="s2Price" /></span><span className="block text-xs text-charcoal/50 mt-1 uppercase tracking-widest"><Text field="s2Duration" /></span></div></FadeIn></div><FadeIn className="text-center mt-12"><EditableLink to="/methode/seances" className="text-xs uppercase tracking-widest text-charcoal hover:text-clay transition-colors border-b border-transparent hover:border-clay pb-0.5"><Text field="cta" defaultValue="Voir les forfaits & détails" /></EditableLink></FadeIn></div></section> );
    case SECTION_TYPES.TESTIMONIALS: return ( <section className="py-20 md:py-32 px-6 relative z-10"><FadeIn><h2 className="text-center text-xs uppercase tracking-[0.2em] text-clay/60 mb-8 md:mb-12"><Text field="title" defaultValue="Témoignages" /></h2><Testimonials /></FadeIn></section> );
    case SECTION_TYPES.CONTACT: return ( <section className="py-20 md:py-32 px-6 border-t border-charcoal/5 relative z-10 bg-sage/20 text-center"><FadeIn><h2 className="text-2xl md:text-3xl font-serif italic mb-8 md:mb-10"><Text field="title" defaultValue="Prendre Rendez-vous" /></h2><EditableExternalLink href="https://flouretoferigoule-methodepoyet.fr/resalib" target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-3 md:py-4 bg-clay text-paper font-medium uppercase tracking-widest text-xs hover:bg-white transition-colors duration-500 inline-block"><Text field="cta" defaultValue="Réserver sur Resalib" /></EditableExternalLink></FadeIn></section> );
    case SECTION_TYPES.TEXT: return ( <div className="bg-sage/30 rounded-xl p-6 lg:p-8 shadow-sm border border-white/5 max-w-4xl mx-auto my-8">{content.title && <h2 className="text-3xl font-serif text-charcoal mb-4 italic"><Text field="title" /></h2>}<div className="text-charcoal-light leading-relaxed whitespace-pre-wrap font-light"><Text field="content" multiline /></div></div> );
    case SECTION_TYPES.IMAGE: return ( <div className="bg-sage/30 rounded-xl overflow-hidden shadow-sm border border-white/5 max-w-4xl mx-auto my-8">{isEditing ? (<EditableImage defaultSrc={content.image} onChange={(val) => onUpdate && onUpdate('image', val)} className="w-full h-auto" />) : (<img src={content.image} alt={content.caption} className="w-full h-auto" />)}<p className="text-sm text-charcoal-light p-4 text-center italic font-serif"><Text field="caption" placeholder="Légende" /></p></div> );
    default: return <div className="p-4 text-red-500">Type de section inconnu: {section.type}</div>;
  }
};

export default SectionManager;
