import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import { PiHandPalmLight } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import FadeIn from '../components/FadeIn';
import LogoBackground from '../components/LogoBackground';
import Testimonials from '../components/Testimonials';
import { useCMS } from './CMSContext';
import EditableImage from './EditableImage';
import EditableText from './EditableText';

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
  PARCOURS_LAYOUT: 'parcours-layout', // New section type
  RESSOURCES_GRID: 'ressources-grid',
  BLOG_GRID: 'blog-grid',
      ATELIERS_LAYOUT: 'ateliers-layout',
      AGENDA_LAYOUT: 'agenda-layout',
      THEMES_LAYOUT: 'themes-layout',
      CONTACT_INFO_GRID: 'contact-info-grid',
      CONTACT_MAP: 'contact-map',
      VIDEO: 'video',
      SEPARATOR: 'separator',
      CTA: 'cta',
    };

const SECTION_CONFIG = [
  {
    category: 'Structure',
    items: [
      { type: SECTION_TYPES.HERO, label: 'En-tête (Hero)', icon: FiLayout },
      { type: SECTION_TYPES.DOUBLE_ENTRY, label: 'Double Entrée', icon: FiColumns },
      { type: SECTION_TYPES.THREE_COLUMNS, label: '3 Colonnes', icon: FiGrid },
      { type: SECTION_TYPES.SEPARATOR, label: 'Séparateur', icon: FiIcons.FiMinus },
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
      { type: SECTION_TYPES.VIDEO, label: 'Vidéo (Youtube)', icon: FiIcons.FiVideo },
      { type: SECTION_TYPES.CTA, label: 'Appel à l\'action', icon: FiIcons.FiMousePointer },
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

const getDefaultContent = (type) => {
  switch (type) {
    case SECTION_TYPES.HERO:
      return {
        title1: 'Titre 1',
        title2: 'Titre 2',
        subtitle: 'Sous-titre'
      };
    case SECTION_TYPES.DOUBLE_ENTRY:
      return {
        card1Title: 'Titre Gauche',
        card1Desc: 'Description...',
        card1Cta: 'Bouton',
        card2Title: 'Titre Centre',
        card2Desc: 'Description...',
        card2Cta: 'Bouton',
        card3Title: 'Titre Droite',
        card3Desc: 'Description...',
        card3Cta: 'Bouton'
      };
    case SECTION_TYPES.THREE_COLUMNS:
      return {
        col1Title: 'Colonne 1',
        col1Text: 'Texte...',
        col2Title: 'Colonne 2',
        col2Text: 'Texte...',
        col3Title: 'Colonne 3',
        col3Text: 'Texte...'
      };
    case SECTION_TYPES.TEXT:
      return {
        title: 'Nouveau Texte',
        content: 'Votre contenu ici...'
      };
    case SECTION_TYPES.IMAGE:
      return {
        image: '',
        caption: 'Légende'
      };
    case SECTION_TYPES.TEXT_IMAGE:
    case SECTION_TYPES.IMAGE_TEXT:
      return {
        title: 'Titre',
        content: 'Texte...',
        image: ''
      };
    case SECTION_TYPES.QUOTE:
      return {
        quote: 'Citation...',
        author: 'Auteur'
      };
    case SECTION_TYPES.TESTIMONIALS:
      return {
        title: 'Témoignages'
      };
    case SECTION_TYPES.CONTACT:
      return {
        title: 'Contact',
        cta: 'Bouton'
      };
    case SECTION_TYPES.SERVICES:
      return {
        tag: 'Tag',
        title: 'Titre',
        s1Title: 'Service 1',
        s1Desc: 'Desc...',
        s1Price: '0€',
        s1Duration: '1h',
        s2Title: 'Service 2',
        s2Desc: 'Desc...',
        s2Price: '0€',
        s2Duration: '1h',
        s3Title: 'Service 3',
        s3Desc: 'Desc...',
        s3Price: '0€',
        s3Duration: '1h',
        cta: 'Bouton'
      };
    case SECTION_TYPES.CONTACT_INFO_GRID:
        return {
            card1Title: "Adresse", card1Content: "...",
            card2Title: "Téléphone", card2Content: "...",
            card3Title: "Réservation", card3Content: "..."
        };
    case SECTION_TYPES.AGENDA_LAYOUT:
        return {
             row1Date: "12-13 Nov", row1Audience: "Ouvert à tous", row1Title: "Initiation", row1Desc: "...",
             row2Date: "02-03 Déc", row2Audience: "Pros", row2Title: "Expertise", row2Desc: "...",
             row3Date: "20-22 Jan", row3Audience: "Tous", row3Title: "Corps Mémoire", row3Desc: "...",
             row4Date: "15-16 Fév", row4Audience: "Pros", row4Title: "Posturologie", row4Desc: "..."
        };
    case SECTION_TYPES.THEMES_LAYOUT:
        return {
             card1Title: "Souffle", card1Desc: "...",
             card2Title: "Ancrage", card2Desc: "...",
             card3Title: "Automassage", card3Desc: "...",
             card4Title: "Sommeil", card4Desc: "...",
             card5Title: "Émotions", card5Desc: "...",
             card6Title: "Vitalité", card6Desc: "..."
        };
    case SECTION_TYPES.CONTACT_MAP:
        return {
            zoneTitle: "Zone", zoneDesc: "...",
            city1: "Ville 1", city2: "Ville 2", city3: "Ville 3",
            city4: "Ville 4", city5: "Ville 5", city6: "Ville 6",
            legal: "Mentions légales..."
        };
    case SECTION_TYPES.VIDEO:
        return { url: '' };
    case SECTION_TYPES.CTA:
        return { label: 'En savoir plus', link: '/contact' };
    case SECTION_TYPES.SEPARATOR:
        return {};
    default:
      return {};
  }
};

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
        card2Cta: 'Voir les enseignements',
        card3Title: 'Ateliers',
        card3Desc: 'Pratiques corporelles et sensorielles. Cultiver l\'autonomie.',
        card3Cta: 'Voir les ateliers'
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
            card3Title: "Au fil des jours",
            card3Subtitle: "Journal",
            card3Desc: "Réflexions personnelles sur la santé, le corps, les saisons et la poésie du vivant.",
            card3Cta: "Lire",
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

DEFAULT_SECTIONS.seances = [];

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

DEFAULT_SECTIONS.mentions = [
    {
      id: 'mentions-text',
      type: 'text',
      content: {
        title: '',
        content: `INFORMATIONS PRÉCONTRACTUELLES OBLIGATOIRES

À DESTINATION DU CLIENT

1.1. Identification du professionnel

L’entreprise individuelle de droit français Floureto Férigoule – Méthode Poyet est immatriculée sous le numéro SIREN 832 565 410.
Adresse de domiciliation : 29, rue du Mont Berny – 60350 Pierrefonds.

2.2. Nature des prestations proposées

L’entreprise Floureto Férigoule, E.I. propose des prestations de services relevant de l’accompagnement au bien-être selon la Méthode Poyet.
Ces prestations sont proposées en dehors de tout cadre médical ou paramédical. Elles ne constituent ni un acte médical, ni un diagnostic, ni un traitement, et ne se substituent en aucun cas à un suivi assuré par un professionnel de santé.

3.3. Tarifs et facturation

Le détail des prestations ainsi que la grille tarifaire sont affichés au cabinet et communiqués au client avant toute prestation.
Conformément à l’arrêté n°83-50/A du 3 octobre 1983, une note d’honoraires ou une facture sera délivrée sur demande pour toute prestation d’un montant supérieur à 25 euros.
La facture comportera le décompte détaillé de chaque prestation ainsi que la somme totale à payer, sans mention de TVA, conformément à l’article 293 B du Code général des impôts.

4.4. Assurance responsabilité civile professionnelle

Floureto Férigoule, E.I. a souscrit une assurance responsabilité civile professionnelle auprès de MEDINAT, par l’intermédiaire de la société +Simple, 2 rue Grignan, 13001 Marseille, sous le numéro de contrat HXFRME000008897, couvrant l’ensemble des prestations proposées.

5.5. Coordonnées du professionnel

Téléphone : 07 69 05 10 87
Courriel : floureto.ferigoule@gmail.com
Adresse postale : 29, rue du Mont Berny – 60350 Pierrefonds

6.6. Médiation de la consommation

Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, l’entreprise Floureto Férigoule, E.I. a mis en place un dispositif de médiation de la consommation.
L’entité de médiation retenue est : MÉDIATION CONSOMMATION DÉVELOPPEMENT / MED CONSO DEV
En cas de litige, le client peut déposer sa réclamation sur le site : https://www.medconsodev.eu
ou par voie postale en écrivant à :
MÉDIATION CONSOMMATION DÉVELOPPEMENT / MED CONSO DEV
Centre d’Affaires Stéphanois SAS
Immeuble L’Horizon – Esplanade de France
3, rue J. Constant Milleret
42000 Saint-Étienne

7.7. Protection des données personnelles (RGPD)

Les données personnelles collectées sont traitées conformément à la réglementation en vigueur relative à la protection des données à caractère personnel.
Le client dispose d’un droit d’accès, de rectification, d’effacement et de portabilité de ses données. Il peut également demander la limitation ou s’opposer au traitement de ses données, ou retirer son consentement à tout moment.
L’exercice de ces droits peut s’effectuer par courrier à l’adresse : 29, rue du Mont Berny – 60350 Pierrefonds, ou par courriel à : floureto.ferigoule@gmail.com.

8.8. Conditions générales de vente

Conformément à l’article L.111-1 du Code de la consommation, les conditions générales de vente applicables aux prestations proposées par Floureto Férigoule, E.I. sont consultables sur simple demande au cabinet.
9.9. Acceptation et information du client

Le client reconnaît avoir reçu l’ensemble des informations précontractuelles prévues par la loi avant toute prestation.
Le client accepte expressément de bénéficier de prestations proposées en dehors de tout parcours de soins
coordonné par un professionnel de santé. Floureto Férigoule, E.I. ne saurait être tenue responsable d’une confusion
sur ce point.

CONDITIONS GENERALES DE VENTE

01/01/2026
L’entreprise individuelle FERIGOULE FLOURETO immatriculée à Compiègne sous le numéro SIREN SIRENE 832 565 410 et dont le siège est
situé au 29 rue du Mont Berny 60350 PIERREFONDS (ci-après, l’« Entreprise individuelle ») a une activité de service à la personne.

OBJET

Les présentes Conditions Générales de Vente (ci-après « CGV ») ont pour objet de déterminer les conditions dans lesquelles l’Entreprise
Individuelle fournit ses services (ci-après, les « Services ») , aux clients qui les souscrivent (ci-après, le « Client »). L’Entreprise Individuelle se
réserve le droit de modifier ou d’adapter les présentes CGV à tout moment. La version applicable des CGV est celle remise au Client par
l’Entreprise au moment de l’achat des Services. Le Client déclare avoir pris connaissance des présentes CGV et les avoir acceptées sans réserve
avant de passer la commande.

OBLIGATIONS PRÉCONTRACTUELLES

Conformément à l’article L.111-1 du Code de la consommation, l’Entreprise individuelle communique au consommateur, de manière lisible et
compréhensible les caractéristiques essentielles des Services, qui sont : séances de pratique manuelle.

PRIX
Les Services sont vendus aux prix en vigueur lors de la réalisation de la séance.
Ceux-ci sont exprimés en euros et toutes taxes comprises.
L’Entreprise individuelle se réserve le droit de modifier ses tarifs à tout moment.
MODALITÉS DE PAIEMENT

Le paiement des Services est effectué au moment de la séance par :
- Chèque
- Virement bancaire
- Espèce

FACTURATION

Chaque séance fait l’objet d’une facture qui est adressée par mail par l’Entreprise individuelle au Client. Chaque facture devra être payée
immédiatement.

DONNEES PERSONNELLES

L’Entreprise individuelle sera amenée à collecter des données personnelles afin de fournir les Services.
Conformément à la loi informatique et libertés du 6 janvier 1978 et au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril
2016 (dit RGPD), le Client dispose d'un droit d'accès, de rectification et d’opposition aux données personnelles le concernant. Il lui suffit
d’écrire par mail à l’adresse suivante : floureto.ferigoule@gmail.com en indiquant vos nom, prénom, mail et adresse postale et de préciser
l’objet de votre demande. Les données nominatives demandées au Client sont notamment nécessaires au traitement du service et à
l'établissement des factures. Le Client dispose du droit d’introduire une réclamation à l’encontre de la société devant la CNIL. Nous retenons
vos données personnelles aussi longtemps que nécessaire pour fournir le Service ou à d’autres fins essentielles telles que le respect de nos
obligations légales. En outre, l’Entreprise individuelle s’engage à se conformer aux règles en vigueur, notamment le règlement RGPD, dans le
traitement des données personnelles du Client.

FORCE MAJEURE

L’Entreprise individuelle ne peut être tenue pour responsable de l’inexécution de ses obligations contractuelles dans les conditions prévues
par les présentes CGV dans l'hypothèse de la survenance d’un cas fortuit ou d’un cas de force majeure telle que définie par l’article 1218 du
Code civil. Outre les cas fortuits définis par la jurisprudence des tribunaux français, toute situation où l’exécution des obligations
contractuelles est retardée ou empêchée, notamment mais sans limitation les conflits sociaux, interventions des autorités, catastrophes
naturelles, épidémie, incendies, dégâts de eaux, interruption du réseau électrique ou de télécommunications, décisions administratives, sont
considérées comme des cas fortuits ou des cas de force majeure indépendants de la volonté de l’Entreprise et sa responsabilité ne pourra être
engagée.

DROIT APPLICABLE ET JURIDICTION COMPETENTE

Les présentes CGV sont régies par la loi française. Tous les litiges auxquels les opérations de vente conclues en application des présentes
conditions générales de vente pourraient donner lieu, concernant tant leur validité, leur interprétation, leur exécution, leur résiliation, leurs
conséquences et leurs suites et qui n'auraient pas pu être résolus à l'amiable entre l’Entreprise et le Client, seront soumis aux tribunaux du
ressort de la ville du lieu de l’établissement principal de l’Entreprise dans les conditions de droit commun. Si vous n’êtes pas parvenu à
résoudre votre litige après nous avoir adressé une réclamation écrite (courrier ou courriel), datée, rappelant les circonstances qui ont donné
lieu au différend et ce que vous réclamez, vous pourrez saisir le médiateur de la consommation, désigné ci- dessous, si vous avez reçu une
réponse écrite négative de notre part ou pas de réponse deux mois après l’envoi de votre réclamation.
Conformément aux articles L.616-1 et R.616-1 du code de la consommation, notre société a mis en place un dispositif de médiation de la
consommation. L'entité de médiation retenue est :
MEDIATION CONSOMMATION DÉVELOPPEMENT/MED CONSO DEV
En cas de litige, vous pouvez déposer votre réclamation sur son site : https://www.medconsodev.eu
ou par voie postale en écrivant à :
MEDIATION CONSOMMATION DÉVELOPPEMENT/MED CONSO DEV
Centre d’Affaires Stéphanois SAS
IMMEUBLE L’HORIZON – ESPLANADE DE FRANCE
3, RUE J. CONSTANT MILLERET – 42000 SAINT-ÉTIENNE
À défaut de règlement amiable, tout différend résultant des présentes relèvera de la juridiction compétente en la matière.`
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
      id: `section-${crypto.randomUUID()}`,
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
          <SectionRenderer key={section.id} section={section} pageId={pageId} />
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

            <SectionRenderer section={section} onUpdate={(field, value) => updateSectionContent(section.id, field, value)} pageId={pageId} />
          </motion.div>

          <div className="h-4 -my-2 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20 relative">
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

      {sections.length === 0 && isEditMode && (
        <div className="relative text-center py-20">
            <p className="text-charcoal-light/50 italic text-sm">Aucune section. Utilisez le bouton + pour en ajouter une.</p>
        </div>
      )}
    </div>
  );
};

import { createPortal } from 'react-dom';

const AddSectionMenu = ({ onSelect, onClose }) => {
  // Use Portal for reliable z-index and positioning
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 10 }} 
        className="relative bg-paper/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl max-h-[80vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-clay/5 flex-shrink-0">
          <h3 className="font-serif text-charcoal text-2xl italic">Ajouter une section</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-charcoal-light hover:text-red-400 transition-colors"><SafeIcon icon={FiX} className="text-xl" /></button>
        </div>
        <div className="overflow-y-auto custom-scrollbar p-6 space-y-8 flex-grow">
          {SECTION_CONFIG.map((category, idx) => (
            <div key={idx}>
              <h4 className="text-xs uppercase tracking-widest text-clay font-medium mb-4 pl-1 border-b border-clay/10 pb-2">{category.category}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <button key={item.type} onClick={() => onSelect(item.type)} className="group flex items-center p-4 text-left border border-white/5 bg-white/5 rounded-xl hover:bg-clay/10 hover:border-clay/30 transition-all duration-300">
                    <span className="p-3 rounded-lg bg-paper text-clay group-hover:scale-110 transition-transform duration-300 shadow-sm"><SafeIcon icon={item.icon} className="text-2xl" /></span>
                    <span className="ml-4 block text-base text-charcoal group-hover:text-clay font-medium transition-colors">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

const SectionRenderer = ({ section, onUpdate, pageId }) => {
  const { content } = section;
  const { resalibUrl } = useCMS();
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
                {/* Intro text now rendered directly in Parcours.jsx with photo */}
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
                        {/* Liste éditable des formations continues */}
                        {(content.items || [
                            { id: 1, date: "Octobre 2024 – Juin 2025", title: "D.U. Éthique, soin, santé et société", loc: "Université Paris-Saclay", desc: "Mémoire..." },
                            { id: 2, date: "Formation Continue", title: "Approche tissulaire (Pierre Tricot)", loc: "", desc: "Stages..." }
                        ]).map((item, idx) => (
                            <div key={idx} className="relative pl-8 border-l border-clay/20 group">
                                {isEditing && (
                                    <button 
                                        onClick={() => {
                                            const newItems = [...(content.items || [])];
                                            newItems.splice(idx, 1);
                                            onUpdate('items', newItems);
                                        }}
                                        className="absolute -left-3 top-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        title="Supprimer cette formation"
                                    >
                                        <SafeIcon icon={FiIcons.FiX} className="text-xs" />
                                    </button>
                                )}
                                <span className="text-xs uppercase tracking-widest text-clay mb-1 block">
                                    <EditableText 
                                        value={item.date} 
                                        onChange={(val) => {
                                            const newItems = [...(content.items || [])];
                                            if(!newItems[idx]) newItems[idx] = item;
                                            newItems[idx] = { ...newItems[idx], date: val };
                                            onUpdate('items', newItems);
                                        }} 
                                    />
                                </span>
                                <h4 className="text-xl font-serif text-charcoal mb-2">
                                    <EditableText 
                                        value={item.title} 
                                        onChange={(val) => {
                                            const newItems = [...(content.items || [])];
                                            if(!newItems[idx]) newItems[idx] = item;
                                            newItems[idx] = { ...newItems[idx], title: val };
                                            onUpdate('items', newItems);
                                        }} 
                                    />
                                </h4>
                                <p className="text-charcoal-light font-light text-sm italic mb-2">
                                    <EditableText 
                                        value={item.loc} 
                                        onChange={(val) => {
                                            const newItems = [...(content.items || [])];
                                            if(!newItems[idx]) newItems[idx] = item;
                                            newItems[idx] = { ...newItems[idx], loc: val };
                                            onUpdate('items', newItems);
                                        }} 
                                        placeholder="Lieu / École"
                                    />
                                </p>
                                <div className="text-charcoal-light font-light text-sm leading-relaxed whitespace-pre-wrap">
                                    <EditableText 
                                        value={item.desc} 
                                        onChange={(val) => {
                                            const newItems = [...(content.items || [])];
                                            if(!newItems[idx]) newItems[idx] = item;
                                            newItems[idx] = { ...newItems[idx], desc: val };
                                            onUpdate('items', newItems);
                                        }} 
                                        multiline 
                                    />
                                </div>
                            </div>
                        ))}
                        {isEditing && (
                            <button 
                                onClick={() => {
                                    const newItems = [...(content.items || [])];
                                    newItems.push({ date: "Nouvelle date", title: "Nouvelle formation", loc: "Lieu", desc: "Description..." });
                                    onUpdate('items', newItems);
                                }}
                                className="flex items-center gap-2 text-clay hover:text-charcoal transition-colors text-sm uppercase tracking-widest font-medium mt-4"
                            >
                                <SafeIcon icon={FiPlus} /> Ajouter une formation
                            </button>
                        )}
                    </div>
                </FadeIn>
                <FadeIn delay={0.4} className="mt-20 p-6 bg-sage/30 border border-clay/10 rounded-sm">
                     <div className="text-xs text-charcoal-light font-light leading-relaxed italic text-center whitespace-pre-wrap"><Text field="disclaimer" multiline /></div>
                </FadeIn>
            </div>
        );
    case SECTION_TYPES.RESSOURCES_GRID:
        return (
            <div className="max-w-4xl mx-auto px-6 -mt-4 space-y-5">
                {[
                    { field: 'card3', to: '/blog/journal', defaultTitle: 'Au fil des jours', defaultSub: 'Journal', defaultDesc: 'Réflexions personnelles sur la santé, le corps, les saisons et la poésie du vivant.', delay: 0 },
                    { field: 'card1', to: '/ressources/lectures', defaultTitle: 'La Bibliothèque', defaultSub: 'Nos lectures', defaultDesc: "Une sélection d'ouvrages fondamentaux sur la thérapie manuelle, la somatothérapie et la spiritualité.", delay: 0.15 },
                    { field: 'card2', to: '/ressources/liens', defaultTitle: 'Le Réseau', defaultSub: 'Liens utiles', defaultDesc: 'Un réseau de confiance : écoles, fédérations et praticiens partenaires.', delay: 0.25 }
                ].map((card) => (
                    <FadeIn key={card.field} delay={card.delay}>
                        <EditableLink to={card.to} className="group block bg-sage/10 border border-white/5 p-6 md:p-8 hover:bg-sage/20 transition-all duration-500">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                                <div className="flex-1">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-clay/60 mb-1.5 block"><Text field={`${card.field}Subtitle`} defaultValue={card.defaultSub} /></span>
                                    <h3 className="font-serif text-xl md:text-2xl text-charcoal italic mb-2"><Text field={`${card.field}Title`} defaultValue={card.defaultTitle} /></h3>
                                    <div className="text-sm font-light text-charcoal-light leading-relaxed max-w-lg"><Text field={`${card.field}Desc`} multiline defaultValue={card.defaultDesc} /></div>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal border border-clay/20 px-6 py-3 group-hover:bg-clay group-hover:text-paper group-hover:border-transparent transition-all duration-300">
                                        Découvrir
                                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">&rarr;</span>
                                    </span>
                                </div>
                            </div>
                        </EditableLink>
                    </FadeIn>
                ))}
            </div>
        );
    case 'blog-grid':
    case SECTION_TYPES.BLOG_GRID:
        return (
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 py-16">
                <FadeIn delay={0.1}>
                    <EditableLink to="/blog/journal" className="group block relative h-96 overflow-hidden border border-white/5">
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
                    <EditableLink to="/ateliers" className="group block p-8 border border-white/5 hover:bg-sage/10 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-serif text-charcoal group-hover:text-clay transition-colors"><Text field="card2Title" defaultValue="Thématiques" /></h3>
                        <SafeIcon icon={FiList} className="text-charcoal/30 group-hover:text-clay text-2xl transition-colors" />
                    </div>
                    <p className="text-charcoal-light font-light text-sm mb-4"><Text field="card2Desc" multiline defaultValue="..." /></p>
                    <span className="text-xs uppercase tracking-widest text-clay/70 group-hover:text-clay"><Text field="card2Cta" defaultValue="Découvrir →" /></span>
                    </EditableLink>
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
    case SECTION_TYPES.AGENDA_LAYOUT:
        return (
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="border-t border-white/5 mb-12">
                   {[1, 2, 3, 4].map(i => (
                       <FadeIn key={i} delay={i * 0.1} className="group flex flex-col md:flex-row gap-6 p-6 border-b border-white/5 hover:bg-sage/10 transition-colors">
                            <div className="md:w-32 flex-shrink-0">
                            <span className="block text-sm font-medium text-clay uppercase tracking-wide"><Text field={`row${i}Date`} defaultValue="Date" /></span>
                            <span className="text-[10px] text-charcoal/50 uppercase mt-1 block"><Text field={`row${i}Audience`} defaultValue="Public" /></span>
                            </div>
                            <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-serif text-charcoal mb-2 group-hover:text-clay transition-colors"><Text field={`row${i}Title`} defaultValue="Titre de l'atelier" /></h3>
                            </div>
                            <p className="text-charcoal-light font-light text-sm leading-relaxed max-w-2xl">
                                <Text field={`row${i}Desc`} multiline defaultValue="Description..." />
                            </p>
                            </div>
                        </FadeIn>
                   ))}
                </div>
            </div>
        );
    case SECTION_TYPES.THEMES_LAYOUT:
        return (
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 py-12">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <FadeIn key={i} delay={i * 0.1} className="bg-paper p-8 border border-white/5 hover:border-clay/30 transition-all duration-500 group h-full">
                        <div className="text-3xl text-clay mb-6 group-hover:scale-110 transition-transform"><SafeIcon icon={FiStar} /></div>
                        <h3 className="text-xl font-serif text-charcoal mb-4"><Text field={`card${i}Title`} defaultValue="Thème" /></h3>
                        <p className="text-charcoal-light font-light text-sm leading-relaxed"><Text field={`card${i}Desc`} multiline defaultValue="..." /></p>
                    </FadeIn>
                ))}
            </div>
        );
    case SECTION_TYPES.CONTACT_INFO_GRID:
        return (
            <div className="max-w-6xl mx-auto px-6 pt-16 mb-12 md:mb-16">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
                    {/* Photo façade */}
                    <div
                        className="flex-shrink-0 mx-auto md:mx-0 w-72 md:w-96 rounded-sm bg-cover bg-center min-h-[300px] md:min-h-0"
                        style={{ backgroundImage: "url('/maison-facade.jpg')" }}
                        role="img"
                        aria-label="Façade du cabinet de thérapie manuelle Floureto Férigoule – 29 Rue du Mont Berny, 60350 Pierrefonds, Oise"
                    />
                    {/* Infos contact empilées */}
                    <div className="grid grid-rows-3 gap-4 md:gap-6 flex-grow">
                        {[1, 2, 3].map(i => {
                            const icon = i===1 ? FiMapPin : i===2 ? FiPhone : FiCalendar;
                            return (
                                <FadeIn key={i} delay={0.1 * i} className="flex items-start gap-4 p-5 md:p-6 border border-white/5 bg-sage/10 rounded-sm hover:border-clay/20 transition-colors">
                                    <div className="w-10 h-10 flex-shrink-0 bg-paper rounded-full flex items-center justify-center text-clay shadow-sm"><SafeIcon icon={icon} className="text-lg" /></div>
                                    <div>
                                        <h3 className="text-base font-serif text-charcoal mb-1"><Text field={`card${i}Title`} defaultValue="Titre" /></h3>
                                        <div className="text-charcoal-light font-light text-sm leading-relaxed"><Text field={`card${i}Content`} multiline defaultValue="..." /></div>
                                        {i === 3 && (
                                            <a href={resalibUrl} target="_blank" rel="noopener noreferrer" aria-label="Réserver une séance de Méthode Poyet en ligne via Resalib" className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-clay hover:text-charcoal border border-clay/30 hover:border-clay px-4 py-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:outline-none">
                                                <SafeIcon icon={FiCalendar} className="text-sm" /> Réserver en ligne
                                            </a>
                                        )}
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
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
    case SECTION_TYPES.TEXT_IMAGE: return ( <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-6 py-12"><div className="order-2 md:order-1"><h3 className="text-2xl font-serif text-charcoal mb-4 italic"><Text field="title" defaultValue="Titre" /></h3><div className="text-charcoal-light leading-relaxed font-light text-justify"><Text field="content" multiline defaultValue="..." /></div></div><div className="order-1 md:order-2">{isEditing ? (<EditableImage defaultSrc={content.image} onChange={(val) => onUpdate && onUpdate('image', val)} className="w-full h-64 object-cover rounded-lg shadow-md" />) : (content.image && <img src={content.image} alt={content.title || "Illustration – Floureto Férigoule, Méthode Poyet"} className="w-full h-64 object-cover rounded-lg shadow-md" />)}</div></div> );
    case SECTION_TYPES.IMAGE_TEXT: return ( <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-6 py-12"><div className="order-1">{isEditing ? (<EditableImage defaultSrc={content.image} onChange={(val) => onUpdate && onUpdate('image', val)} className="w-full h-64 object-cover rounded-lg shadow-md" />) : (content.image && <img src={content.image} alt={content.title || "Illustration – Floureto Férigoule, Méthode Poyet"} className="w-full h-64 object-cover rounded-lg shadow-md" />)}</div><div className="order-2"><h3 className="text-2xl font-serif text-charcoal mb-4 italic"><Text field="title" defaultValue="Titre" /></h3><div className="text-charcoal-light leading-relaxed font-light text-justify"><Text field="content" multiline defaultValue="..." /></div></div></div> );
    case SECTION_TYPES.THREE_COLUMNS: return ( <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">{[1, 2, 3].map(i => (<div key={i} className="bg-sage/10 p-6 rounded-lg border border-white/5"><h4 className="text-xl font-serif text-charcoal mb-3"><Text field={`col${i}Title`} defaultValue={`Colonne ${i}`} /></h4><div className="text-sm text-charcoal-light leading-relaxed"><Text field={`col${i}Text`} multiline defaultValue="..." /></div></div>))}</div> );
    case SECTION_TYPES.QUOTE: return ( <div className="max-w-3xl mx-auto px-6 py-16 text-center"><span className="text-4xl text-clay/30 block mb-4">"</span><div className="text-2xl md:text-3xl font-serif italic text-charcoal mb-6 leading-relaxed"><Text field="quote" multiline defaultValue="..." /></div><div className="text-sm text-clay uppercase tracking-widest font-medium"><Text field="author" defaultValue="Auteur" /></div></div> );
    case SECTION_TYPES.METHOD_INTRO: return ( <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24 items-start max-w-6xl mx-auto px-6 pt-16"><FadeIn><div className="relative p-6 md:p-8 border border-white/5 bg-sage/10"><div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-clay/50 to-transparent"></div><h3 className="text-xl md:text-2xl font-serif text-charcoal italic mb-4 md:mb-6"><Text field="title" defaultValue="Une écoute absolue" /></h3><div className="text-charcoal-light font-light leading-loose text-justify mb-4 text-sm md:text-base"><Text field="p1" multiline /></div><div className="text-charcoal-light font-light leading-loose text-justify text-sm md:text-base"><Text field="p2" multiline /></div></div></FadeIn><FadeIn delay={0.2}><div className="relative p-6 md:p-8 border border-white/5 bg-sage/10"><div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-clay/50 to-transparent"></div><h3 className="text-xl md:text-2xl font-serif text-charcoal italic mb-4 md:mb-6"><Text field="title2" defaultValue="Le toucher comme relation" /></h3><div className="text-charcoal-light font-light leading-loose text-justify mb-4 text-sm md:text-base"><Text field="content2" multiline /></div><div className="text-charcoal-light font-light leading-loose text-justify text-sm md:text-base"><Text field="content3" multiline /></div></div></FadeIn></div> );
    case SECTION_TYPES.METHOD_CONCEPTS: return ( 
      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32 max-w-6xl mx-auto px-6">
        <FadeIn delay={0.3} className="group p-6 md:p-8 bg-paper border border-white/5 hover:border-clay/30 transition-all duration-500">
          <div className="mb-6 h-32 w-32 md:h-40 md:w-40 mx-auto flex items-center justify-center">
            <div className="h-28 w-28 md:h-36 md:w-36 relative">
                {isEditing ? (
                <EditableImage 
                    defaultSrc={content.c1Image || "https://placehold.co/100x100/png?text=Icone"} 
                    onChange={(val) => onUpdate && onUpdate('c1Image', val)} 
                    className="w-full h-full object-contain invert mix-blend-screen" 
                />
                ) : (
                content.c1Image ? (
                    <img src={content.c1Image} className="w-full h-full object-contain invert mix-blend-screen" alt="Mouvement Respiratoire Primaire (MRP) – Écoute crânienne en Méthode Poyet" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50 text-xs">Icone</div>
                )
                )}
            </div>
          </div>
          <h4 className="text-lg md:text-xl font-serif text-charcoal mt-4 mb-3 md:mb-4"><Text field="c1Title" defaultValue="MRP & Écoute" /></h4>
          <div className="text-charcoal-light font-light text-sm leading-7"><Text field="c1Desc" multiline /></div>
        </FadeIn>
        <FadeIn delay={0.4} className="group p-6 md:p-8 bg-paper border border-white/5 hover:border-clay/30 transition-all duration-500">
          <div className="mb-6 h-32 w-32 md:h-40 md:w-40 mx-auto flex items-center justify-center overflow-visible">
            {isEditing ? (
              <EditableImage
                defaultSrc={content.c2Image || "/icons/sacrum.webp"}
                onChange={(val) => onUpdate && onUpdate('c2Image', val)}
                className="w-[200%] h-[200%] object-contain invert mix-blend-screen"
              />
            ) : (
              <img src={content.c2Image || "/icons/sacrum.webp"} className="w-full h-full object-contain invert mix-blend-screen scale-[2]" alt="Axe crâne-sacrum – Harmonisation du système cranio-sacré en Méthode Poyet" />
            )}
          </div>
          <h4 className="text-lg md:text-xl font-serif text-charcoal mt-4 mb-3 md:mb-4"><Text field="c2Title" defaultValue="Axe Crâne-Sacrum" /></h4>
          <div className="text-charcoal-light font-light text-sm leading-7"><Text field="c2Desc" multiline /></div>
        </FadeIn>
        <FadeIn delay={0.5} className="group p-6 md:p-8 bg-paper border border-white/5 hover:border-clay/30 transition-all duration-500">
          <div className="mb-6 h-32 w-32 md:h-40 md:w-40 mx-auto flex items-center justify-center">
            {isEditing ? (
              <EditableImage
                defaultSrc={content.c3Image || "/icons/spine.png"}
                onChange={(val) => onUpdate && onUpdate('c3Image', val)}
                className="w-full h-full object-contain"
              />
            ) : (
              <img src={content.c3Image || "/icons/colonne.png"} className="w-full h-full object-contain invert scale-[1.3]" alt="Les chaînes musculaires et fasciales – Colonne vertébrale en Méthode Poyet" />
            )}
          </div>
          <h4 className="text-lg md:text-xl font-serif text-charcoal mt-4 mb-3 md:mb-4"><Text field="c3Title" defaultValue="Les Chaînes" /></h4>
          <div className="text-charcoal-light font-light text-sm leading-7"><Text field="c3Desc" multiline /></div>
        </FadeIn>
      </div> 
    );
    case SECTION_TYPES.DISCLAIMER: return ( 
      <FadeIn className="max-w-4xl mx-auto mt-10 pt-16 md:pt-32 mb-20">
        <div className="p-6 border border-clay/10 bg-sage/30 rounded-sm px-6">
          <h5 className="text-clay text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-clay"></span>
            Avertissement Important
          </h5>
          <div className="text-charcoal-light text-xs leading-relaxed italic">
            <Text field="text" multiline />
          </div>
        </div>
      </FadeIn> 
    );
    case SECTION_TYPES.HERO: return ( <section className="relative min-h-screen flex flex-col items-center justify-end pb-12 md:pb-20 px-6 pt-20 overflow-hidden"><LogoBackground /></section> );
    case SECTION_TYPES.DOUBLE_ENTRY: {
      const navItems = [
        { to: '/', label: 'Accueil' },
        { to: '/pratique-manuelle', label: 'Méthode Poyet', sub: [
          { to: '/pratique-manuelle/seances', label: 'La Séance' },
        ]},
        { to: '/formations', label: 'Formations' },
        { to: '/ateliers', label: 'Ateliers' },
        { to: '/ressources', label: 'Ressources', sub: [
          { to: '/blog/journal', label: 'Au fil des jours' },
          { to: '/ressources/lectures', label: 'Lectures' },
          { to: '/ressources/liens', label: 'Liens Utiles' },
        ]},
        { to: '/a-propos', label: 'A Propos' },
        { to: '/contact', label: 'Contact' },
      ];
      const curveIndent = [0, 16, 28, 36, 32, 14, 0, 0];
      const DoubleEntryNav = () => {
        const navigate = useNavigate();
        const [transitioning, setTransitioning] = React.useState(false);
        const [openSub, setOpenSub] = React.useState(null);

        const handleNav = (e, to) => {
          e.preventDefault();
          if (transitioning || to === '/') return;
          setTransitioning(true);
          setTimeout(() => navigate(to), 800);
        };
        return (
          <>
            {/* Transition overlay standard (glow) */}
            <AnimatePresence>
              {transitioning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeIn' }}
                  className="fixed inset-0 z-[200] pointer-events-none"
                >
                  {/* Radial glow from center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 3, opacity: [0, 0.4, 0] }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-clay/20 blur-3xl"
                    />
                  </div>
                  {/* Fade to paper */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: 'easeIn' }}
                    className="absolute inset-0 bg-paper"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav — à droite de l'animation sur toutes tailles */}
            <section className="flex relative z-20 items-center justify-center pointer-events-none" style={{ marginTop: '-100vh', height: '100vh' }}>
              <motion.nav
                animate={
                  transitioning
                    ? { opacity: 0 }
                    : { opacity: 1 }
                }
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-col items-start gap-1.5 md:gap-2.5 pointer-events-auto"
                style={{ marginLeft: 'min(350px, 42vw)' }}
              >
                {navItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + i * 0.1, ease: 'easeOut' }}
                    style={{ paddingLeft: `${curveIndent[i] || 0}px` }}
                    onMouseEnter={() => item.sub && setOpenSub(i)}
                    onMouseLeave={() => item.sub && setOpenSub(null)}
                    className="relative"
                  >
                    <a href={item.to} onClick={(e) => handleNav(e, item.to)} className="group cursor-pointer">
                      <span className="font-serif text-sm md:text-base lg:text-lg italic text-charcoal/90 hover:text-clay hover:italic transition-all duration-300 pb-0.5">
                        {item.label}
                        {item.sub && (
                          <SafeIcon icon={FiIcons.FiChevronDown} className={`inline-block ml-1 text-[10px] text-charcoal/30 transition-transform duration-300 ${openSub === i ? 'rotate-180' : ''}`} />
                        )}
                      </span>
                    </a>
                    {item.sub && (
                      <AnimatePresence>
                        {openSub === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="overflow-hidden ml-3 mt-1"
                          >
                            <div className="flex flex-col gap-1.5 border-l border-clay/20 pl-3">
                              {item.sub.map((s, j) => (
                                <a key={j} href={s.to} onClick={(e) => handleNav(e, s.to)} className="block">
                                  <span className="font-serif text-xs md:text-sm italic text-charcoal/40 hover:text-clay transition-colors duration-400">
                                    {s.label}
                                  </span>
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
            </section>
          </>
        );
      };
      return <DoubleEntryNav />;
    }
    case SECTION_TYPES.METHOD: return ( <section className="py-12 md:py-20 px-6 relative z-10 bg-gradient-to-b from-transparent to-sage/10"><div className="max-w-3xl mx-auto"><FadeIn><div className="flex flex-col items-center text-center space-y-8 md:space-y-12"><h2 className="text-2xl md:text-4xl font-serif text-charcoal italic px-4"><Text field="title" defaultValue="La Méthode Poyet" /></h2><div className="space-y-6 md:space-y-8 text-charcoal-light font-light text-justify md:text-center text-base md:text-xl md:leading-10 leading-8"><Text field="p1" multiline /><Text field="p2" multiline /></div><div className="pt-4 md:pt-8 flex flex-col md:flex-row gap-8 justify-center items-center"><EditableLink to="/pratique-manuelle" className="inline-block border-b border-charcoal/30 pb-1 text-xs md:text-sm uppercase tracking-widest hover:border-clay hover:text-clay transition-all duration-500"><Text field="cta" defaultValue="En savoir plus" /></EditableLink></div></div></FadeIn></div></section> );
    case SECTION_TYPES.SERVICES: return ( <section className="py-20 md:py-32 px-6 bg-sage/30 relative z-10 border-y border-white/5"><div className="max-w-6xl mx-auto"><FadeIn><div className="text-center mb-16 md:mb-24"><span className="text-clay text-xs tracking-[0.2em] uppercase block mb-4"><Text field="tag" defaultValue="Accompagnement" /></span><h2 className="text-3xl md:text-4xl font-serif italic text-charcoal"><Text field="title" defaultValue="Séances & Tarifs" /></h2></div></FadeIn><div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 max-w-5xl mx-auto"><FadeIn delay={0.2} className="relative p-6 md:p-8 border border-white/5 hover:border-clay/30 bg-paper/50 transition-all duration-500 group"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-paper border border-clay/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><span className="font-serif text-clay italic text-sm md:text-base">01</span></div><h3 className="text-lg md:text-xl font-serif mb-4 md:mb-6 mt-2 md:mt-4 text-center text-charcoal"><Text field="s1Title" defaultValue="Séance Adulte" /></h3><div className="text-sm text-charcoal-light leading-7 text-center font-light mb-6"><Text field="s1Desc" multiline /></div><div className="border-t border-white/5 pt-4 text-center"><span className="text-xl text-clay font-serif"><Text field="s1Price" /></span><span className="block text-xs text-charcoal/50 mt-1 uppercase tracking-widest"><Text field="s1Duration" /></span></div></FadeIn><FadeIn delay={0.4} className="relative p-6 md:p-8 border border-white/5 hover:border-clay/30 bg-paper/50 transition-all duration-500 group"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-paper border border-clay/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><span className="font-serif text-clay italic text-sm md:text-base">02</span></div><h3 className="text-lg md:text-xl font-serif mb-4 md:mb-6 mt-2 md:mt-4 text-center text-charcoal"><Text field="s2Title" defaultValue="Enfant & Bébé" /></h3><div className="text-sm text-charcoal-light leading-7 text-center font-light mb-6"><Text field="s2Desc" multiline /></div><div className="border-t border-white/5 pt-4 text-center"><span className="text-xl text-clay font-serif"><Text field="s2Price" /></span><span className="block text-xs text-charcoal/50 mt-1 uppercase tracking-widest"><Text field="s2Duration" /></span></div></FadeIn><FadeIn delay={0.6} className="relative p-6 md:p-8 border border-white/5 hover:border-clay/30 bg-paper/50 transition-all duration-500 group"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-paper border border-clay/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><span className="font-serif text-clay italic text-sm md:text-base">03</span></div><h3 className="text-lg md:text-xl font-serif mb-4 md:mb-6 mt-2 md:mt-4 text-center text-charcoal"><Text field="s3Title" defaultValue="Forfaits" /></h3><div className="text-sm text-charcoal-light leading-7 text-center font-light mb-6"><Text field="s3Desc" multiline /></div><div className="border-t border-white/5 pt-4 text-center"><span className="text-xl text-clay font-serif"><Text field="s3Price" /></span><span className="block text-xs text-charcoal/50 mt-1 uppercase tracking-widest"><Text field="s3Duration" /></span></div></FadeIn></div><FadeIn className="text-center mt-12"><EditableLink to="/pratique-manuelle/seances" className="text-xs uppercase tracking-widest text-charcoal hover:text-clay transition-colors border-b border-transparent hover:border-clay pb-0.5"><Text field="cta" defaultValue="Voir les forfaits & détails" /></EditableLink></FadeIn></div></section> );
    case SECTION_TYPES.TESTIMONIALS: return ( <section className="py-20 md:py-32 px-6 relative z-10"><FadeIn><h2 className="text-center text-xs uppercase tracking-[0.2em] text-clay/60 mb-8 md:mb-12"><Text field="title" defaultValue="Témoignages" /></h2><Testimonials /></FadeIn></section> );
    case SECTION_TYPES.CONTACT: return ( <section className="py-20 md:py-32 px-6 border-t border-charcoal/5 relative z-10 bg-sage/20 text-center"><FadeIn><h2 className="text-2xl md:text-3xl font-serif italic mb-8 md:mb-10"><Text field="title" defaultValue="Prendre Rendez-vous" /></h2><EditableExternalLink href={resalibUrl} target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-3 md:py-4 bg-clay text-paper font-medium uppercase tracking-widest text-xs hover:bg-white transition-colors duration-500 inline-block"><Text field="cta" defaultValue="Réserver sur Resalib" /></EditableExternalLink></FadeIn></section> );
    case SECTION_TYPES.TEXT: return ( <div className="bg-sage/30 rounded-xl p-6 lg:p-8 shadow-sm border border-white/5 max-w-4xl mx-auto my-8">{content.title && <h2 className="text-3xl font-serif text-charcoal mb-4 italic"><Text field="title" /></h2>}<div className="text-charcoal-light leading-relaxed whitespace-pre-wrap font-light"><Text field="content" multiline /></div></div> );
    case SECTION_TYPES.IMAGE: return ( <div className="bg-sage/30 rounded-xl overflow-hidden shadow-sm border border-white/5 max-w-4xl mx-auto my-8">{isEditing ? (<EditableImage defaultSrc={content.image} onChange={(val) => onUpdate && onUpdate('image', val)} className="w-full h-auto" />) : (<img src={content.image} alt={content.caption} className="w-full h-auto" />)}<p className="text-sm text-charcoal-light p-4 text-center italic font-serif"><Text field="caption" placeholder="Légende" /></p></div> );
    case SECTION_TYPES.VIDEO: return ( <div className="max-w-4xl mx-auto px-6 py-8"><div className="aspect-video bg-black/5 rounded-xl overflow-hidden shadow-lg border border-white/5">{isEditing ? <div className="w-full h-full flex items-center justify-center bg-sage/20"><div className="w-full max-w-md p-4"><p className="mb-2 text-sm text-charcoal">URL de la vidéo (Youtube embed) :</p><input type="text" value={content.url || ''} onChange={(e) => onUpdate && onUpdate('url', e.target.value)} placeholder="https://www.youtube.com/embed/..." className="bg-white/50 p-2 rounded w-full text-sm border border-clay/20 outline-none focus:border-clay" /></div></div> : <iframe src={content.url} className="w-full h-full" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}</div></div> );
    case SECTION_TYPES.SEPARATOR: return ( <div className="max-w-4xl mx-auto px-6 py-8"><hr className="border-t border-clay/30" /></div> );
    case SECTION_TYPES.CTA: return ( <div className="max-w-4xl mx-auto px-6 py-12 text-center">{isEditing ? (<><div className="inline-block bg-clay text-paper px-8 py-3 uppercase tracking-widest text-xs font-medium rounded-sm cursor-pointer"><Text field="label" defaultValue="Bouton" /></div><div className="mt-2 text-[10px] text-charcoal/50"><span className="flex gap-1 justify-center items-center">Lien: <input type="text" value={content.link || ''} onChange={(e) => onUpdate && onUpdate('link', e.target.value)} placeholder="/page" className="border-b border-charcoal/20 bg-transparent outline-none text-charcoal text-xs px-1" /></span></div></>) : (<EditableLink to={content.link || '/'} className="inline-block bg-clay text-paper px-8 py-3 uppercase tracking-widest text-xs font-medium hover:bg-white transition-colors duration-500 rounded-sm cursor-pointer"><Text field="label" defaultValue="Bouton" /></EditableLink>)}</div> );
    default: return <div className="p-4 text-red-500">Type de section inconnu: {section.type}</div>;
  }
};

export default SectionManager;