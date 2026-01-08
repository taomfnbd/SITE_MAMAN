import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import FadeIn from '../../components/FadeIn';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import SEO from '../../components/SEO';
import EditableText from '../../cms/EditableText';
import SectionManager from '../../cms/SectionManager';

const SectionDivider = () => (
  <div className="flex justify-center my-16">
    <div className="w-16 h-[1px] bg-clay/30"></div>
  </div>
);

const Parcours = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO 
        title="Qui suis-je ? Parcours & Formations"
        description="Découvrez le parcours de Floureto Férigoule. Enseignante de lettres devenue praticienne en méthode Poyet. Formée à l'ITI Paris et par Pierre Tricot."
        url="/methode/parcours"
      />
      <Navbar />
      <PageHeader 
        title={<EditableText id="parcours_header_title" defaultValue="Parcours & Formations" />}
        subtitle={<EditableText id="parcours_header_subtitle" defaultValue="De l'enseignement des Lettres à l'écoute tissulaire." />} 
      />
      
      <div className="max-w-4xl mx-auto px-6">
        
        {/* INTRODUCTION - TRANSMETTRE */}
        <FadeIn>
          <h3 className="text-2xl font-serif text-charcoal mb-6">
            <EditableText id="parcours_transmettre_title" defaultValue="Transmettre" />
          </h3>
          <div className="prose prose-invert max-w-none text-charcoal-light font-light leading-loose text-justify">
            <EditableText 
                id="parcours_transmettre_content" 
                multiline
                className="whitespace-pre-line"
                defaultValue={`La transmission est au centre de ma vie professionnelle depuis plus de vingt ans. Transmettre c'est transporter quelque chose, avec l'idée de passage, de transfert. En athlétisme, le relais est une course dans laquelle on se transmet un témoin. En mécanique on parle également de communication de mouvement d'organe vers un autre au moyen d'un système (engrenage, etc..).

Toutes ces acceptions sous-tendent l'idée, essentielle pour moi, d'un système collaboratif et participatif. C'est cette posture qui m'anime toujours de la conception à la réalisation des ateliers que je propose.`}
            />
          </div>
        </FadeIn>
        
        <SectionDivider />

        {/* PARCOURS ANTÉRIEUR */}
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center text-clay">
              <SafeIcon icon={FiIcons.FiMap} />
            </div>
            <h3 className="text-2xl font-serif text-charcoal">
                <EditableText id="parcours_anterieur_title" defaultValue="Parcours professionnel antérieur" />
            </h3>
          </div>
          <div className="prose prose-invert max-w-none text-charcoal-light font-light leading-loose text-justify bg-sage/10 p-8 border border-white/5 rounded-sm">
            <EditableText 
                id="parcours_anterieur_content" 
                multiline
                className="whitespace-pre-line"
                defaultValue={`Mes premières expériences professionnelles appartiennent à une discipline bien différente : l'enseignement et la formation de formateurs. Je tiens à les faire figurer ici car indéniablement, elles ont façonné et continuent de façonner la personne que je suis aujourd'hui.

J'ai enseigné le français en France très jeune, ma Licence de Lettres Modernes en poche. Dans la foulée, je suis partie vivre au Laos et j'ai commencé à enseigner le français à l'université de Vientiane puis à celle de Phnom Penh au Cambodge. De retour en France, j'ai passé le CAPES de Lettres Modernes.`}
            />
            <div className="italic text-charcoal/80 border-l-2 border-clay/50 pl-4 mt-6">
                <EditableText 
                    id="parcours_anterieur_conclusion" 
                    multiline
                    defaultValue="Depuis, je fais cohabiter mes deux passions : l'enseignement et la pratique manuelle. En réalité, je ne pratique pas deux métiers différents. Je fais un seul et même métier qui se décline en deux modalités différentes."
                />
            </div>
          </div>
        </FadeIn>

        <SectionDivider />

        {/* FORMATION PRINCIPALE */}
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center text-clay">
              <SafeIcon icon={FiIcons.FiAward} />
            </div>
            <h3 className="text-2xl font-serif text-charcoal">
                <EditableText id="parcours_formation_title" defaultValue="Formation Principale" />
            </h3>
          </div>
          <div className="prose prose-invert max-w-none text-charcoal-light font-light leading-loose text-justify">
            <EditableText 
                id="parcours_formation_content_1" 
                multiline
                className="whitespace-pre-line mb-4"
                defaultValue={`La méthode Poyet est enseignée dans plusieurs écoles non conventionnées en France et en Espagne. Vous pouvez vous référer au site de la Fédération Internationale des Enseignants en Méthode Poyet pour de plus amples informations.

Pour ma part, j'ai suivi les quatre années proposées à l'Institut des Thérapies Informationnelles à Paris. J'ai été accompagnée tout au long de cette formation exigeante et incroyablement riche par des formateurs chevronnés et reconnus :`}
            />
            <div className="pl-6 space-y-2 mt-4 mb-6 border-l border-white/10">
                <EditableText 
                    id="parcours_formation_profs" 
                    multiline
                    className="whitespace-pre-line"
                    defaultValue={`• Jean-Claude Hernandez
• Odile Baudonnel
• Pierre Van Buyderen
• Fabrice Megrot`}
                />
            </div>
            <EditableText 
                id="parcours_formation_content_2" 
                multiline
                defaultValue="En plus d'un enseignement rigoureux du fonctionnement du corps humain et de l'ensemble des techniques de Maurice Poyet, j'ai eu la chance de bénéficier d'une transmission généreuse et plurielle. C'est cette histoire, nourrie de ma pratique quotidienne, que je mets aujourd'hui à votre service."
            />
          </div>
        </FadeIn>

        <SectionDivider />

        {/* FORMATIONS REÇUES */}
        <FadeIn delay={0.3}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center text-clay">
              <SafeIcon icon={FiIcons.FiBookOpen} />
            </div>
            <h3 className="text-2xl font-serif text-charcoal">
                <EditableText id="parcours_continu_title" defaultValue="Ma Formation Continue" />
            </h3>
          </div>
          
          <div className="space-y-10">
            {/* D.U. */}
            <div className="relative pl-8 border-l border-clay/20">
                <span className="text-xs uppercase tracking-widest text-clay mb-1 block">
                    <EditableText id="parcours_du_date" defaultValue="Octobre 2024 – Juin 2025" />
                </span>
                <h4 className="text-xl font-serif text-charcoal mb-2">
                    <EditableText id="parcours_du_title" defaultValue="D.U. Éthique, soin, santé et société" />
                </h4>
                <p className="text-charcoal-light font-light text-sm italic mb-2">
                    <EditableText id="parcours_du_school" defaultValue="Université Paris-Saclay / Espace éthique IDF" />
                </p>
                <p className="text-charcoal-light font-light text-sm leading-relaxed">
                    <EditableText id="parcours_du_desc" defaultValue="Mémoire : « Les éthiques du care au service d'une méthode de soin non conventionnelle : la méthode Poyet », sous la direction de Virginie Ponelle." multiline />
                </p>
            </div>

            {/* Pierre Tricot */}
            <div className="relative pl-8 border-l border-clay/20">
                <span className="text-xs uppercase tracking-widest text-clay mb-1 block">
                    <EditableText id="parcours_tricot_label" defaultValue="Formation Continue" />
                </span>
                <h4 className="text-xl font-serif text-charcoal mb-4">
                    <EditableText id="parcours_tricot_title" defaultValue="Approche tissulaire (Pierre Tricot)" />
                </h4>
                <p className="text-charcoal-light font-light text-sm mb-4 italic">
                    <EditableText id="parcours_tricot_subtitle" defaultValue="Stages suivis en tant que stagiaire :" />
                </p>
                <ul className="space-y-4 text-charcoal-light font-light text-sm leading-relaxed">
                    <li className="grid md:grid-cols-[120px_1fr] gap-2">
                        <span className="text-charcoal/60 font-medium">
                            <EditableText id="parcours_tricot_1_date" defaultValue="Octobre 2025" />
                        </span>
                        <span>
                            <EditableText 
                                id="parcours_tricot_1_desc" 
                                multiline 
                                defaultValue={`Briqueville-la-Blouette : Niveau 2
Avec Pierre Tricot, Alain Decouvelaere, Céline Dorland et Brice Thibault (formateurs).`}
                                className="whitespace-pre-line"
                            />
                        </span>
                    </li>
                    <li className="grid md:grid-cols-[120px_1fr] gap-2">
                        <span className="text-charcoal/60 font-medium">
                            <EditableText id="parcours_tricot_2_date" defaultValue="Décembre 2024" />
                        </span>
                        <span>
                            <EditableText 
                                id="parcours_tricot_2_desc" 
                                multiline 
                                defaultValue={`Saint-Pierre-des-Corps : Niveau 1
Avec Pierre Tricot, Alain Decouvelaere, Cyril Bauters et Brice Thibault (formateurs).`}
                                className="whitespace-pre-line"
                            />
                        </span>
                    </li>
                    <li className="grid md:grid-cols-[120px_1fr] gap-2">
                        <span className="text-charcoal/60 font-medium">
                            <EditableText id="parcours_tricot_3_date" defaultValue="Septembre 2022" />
                        </span>
                         <span>
                            <EditableText 
                                id="parcours_tricot_3_desc" 
                                multiline 
                                defaultValue={`Lille : Niveau 1 +
Animé par Alain Decouvelaere et Maxime Legrand (formateurs).`}
                                className="whitespace-pre-line"
                            />
                        </span>
                    </li>
                    <li className="grid md:grid-cols-[120px_1fr] gap-2">
                        <span className="text-charcoal/60 font-medium">
                            <EditableText id="parcours_tricot_4_date" defaultValue="Novembre 2021" />
                        </span>
                         <span>
                            <EditableText 
                                id="parcours_tricot_4_desc" 
                                multiline 
                                defaultValue={`Lyon : Niveau 1
Animé par Alain Decouvelaere.`}
                                className="whitespace-pre-line"
                            />
                        </span>
                    </li>
                </ul>
            </div>
          </div>
        </FadeIn>

        {/* DISCLAIMER OBLIGATOIRE */}
        <FadeIn delay={0.4} className="mt-20 p-6 bg-sage/30 border border-clay/10 rounded-sm">
             <div className="text-xs text-charcoal-light font-light leading-relaxed italic text-center">
                <EditableText 
                    id="parcours_disclaimer" 
                    multiline
                    defaultValue="J'ai été formée à la méthode Poyet par une école qui délivre des formations non encadrées par la loi. Les textes publiés sur ce site n'ont aucunement l'intention d'induire en erreur les personnes intéressées par mon travail. Je ne suis pas médecin et vous engage à en consulter un.e si cela vous semble nécessaire. Dans le doute, consultez en priorité un médecin et/ou un spécialiste."
                />
            </div>
        </FadeIn>

        <SectionManager pageId="parcours_extra" />

      </div>
    </div>
  );
};

export default Parcours;
