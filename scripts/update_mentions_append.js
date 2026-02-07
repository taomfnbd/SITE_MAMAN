
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables manually
try {
    const envPath = path.resolve(process.cwd(), '.env');
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.log("Could not read .env file, relying on process.env");
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const existingContent = `INFORMATIONS PRÉCONTRACTUELLES OBLIGATOIRES

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
Le client accepte expressément de bénéficier de prestations proposées en dehors de tout parcours de soins coordonné par un professionnel de santé. Floureto Férigoule, E.I. ne saurait être tenue responsable d’une confusion sur ce point.

CONDITIONS GENERALES DE VENTE

01/01/2026
L’entreprise individuelle FERIGOULE FLOURETO immatriculée à Compiègne sous le numéro SIREN SIRENE 832 565 410 et dont le siège est situé au 29 rue du Mont Berny 60350 PIERREFONDS (ci-après, l’« Entreprise individuelle ») a une activité de service à la personne.

OBJET

Les présentes Conditions Générales de Vente (ci-après « CGV ») ont pour objet de déterminer les conditions dans lesquelles l’Entreprise Individuelle fournit ses services (ci-après, les « Services ») , aux clients qui les souscrivent (ci-après, le « Client »). L’Entreprise Individuelle se réserve le droit de modifier ou d’adapter les présentes CGV à tout moment. La version applicable des CGV est celle remise au Client par l’Entreprise au moment de l’achat des Services. Le Client déclare avoir pris connaissance des présentes CGV et les avoir acceptées sans réserve avant de passer la commande.

OBLIGATIONS PRÉCONTRACTUELLES

Conformément à l’article L.111-1 du Code de la consommation, l’Entreprise individuelle communique au consommateur, de manière lisible et compréhensible les caractéristiques essentielles des Services, qui sont : séances de pratique manuelle.

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

Chaque séance fait l’objet d’une facture qui est adressée par mail par l’Entreprise individuelle au Client. Chaque facture devra être payée immédiatement.

DONNEES PERSONNELLES

L’Entreprise individuelle sera amenée à collecter des données personnelles afin de fournir les Services.
Conformément à la loi informatique et libertés du 6 janvier 1978 et au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (dit RGPD), le Client dispose d'un droit d'accès, de rectification et d’opposition aux données personnelles le concernant. Il lui suffit d’écrire par mail à l’adresse suivante : floureto.ferigoule@gmail.com en indiquant vos nom, prénom, mail et adresse postale et de préciser l’objet de votre demande. Les données nominatives demandées au Client sont notamment nécessaires au traitement du service et à l'établissement des factures. Le Client dispose du droit d’introduire une réclamation à l’encontre de la société devant la CNIL. Nous retenons vos données personnelles aussi longtemps que nécessaire pour fournir le Service ou à d’autres fins essentielles telles que le respect de nos obligations légales. En outre, l’Entreprise individuelle s’engage à se conformer aux règles en vigueur, notamment le règlement RGPD, dans le traitement des données personnelles du Client.

FORCE MAJEURE

L’Entreprise individuelle ne peut être tenue pour responsable de l’inexécution de ses obligations contractuelles dans les conditions prévues par les présentes CGV dans l'hypothèse de la survenance d’un cas fortuit ou d’un cas de force majeure telle que définie par l’article 1218 du Code civil. Outre les cas fortuits définis par la jurisprudence des tribunaux français, toute situation où l’exécution des obligations contractuelles est retardée ou empêchée, notamment mais sans limitation les conflits sociaux, interventions des autorités, catastrophes naturelles, épidémie, incendies, dégâts de eaux, interruption du réseau électrique ou de télécommunications, décisions administratives, sont considérées comme des cas fortuits ou des cas de force majeure indépendants de la volonté de l’Entreprise et sa responsabilité ne pourra être engagée.

DROIT APPLICABLE ET JURIDICTION COMPETENTE

Les présentes CGV sont régies par la loi française. Tous les litiges auxquels les opérations de vente conclues en application des présentes conditions générales de vente pourraient donner lieu, concernant tant leur validité, leur interprétation, leur exécution, leur résiliation, leurs conséquences et leurs suites et qui n'auraient pas pu être résolus à l'amiable entre l’Entreprise et le Client, seront soumis aux tribunaux du ressort de la ville du lieu de l’établissement principal de l’Entreprise dans les conditions de droit commun. Si vous n’êtes pas parvenu à résoudre votre litige après nous avoir adressé une réclamation écrite (courrier ou courriel), datée, rappelant les circonstances qui ont donné lieu au différend et ce que vous réclamez, vous pourrez saisir le médiateur de la consommation, désigné ci- dessous, si vous avez reçu une réponse écrite négative de notre part ou pas de réponse deux mois après l’envoi de votre réclamation.
Conformément aux articles L.616-1 et R.616-1 du code de la consommation, notre société a mis en place un dispositif de médiation de la consommation. L'entité de médiation retenue est :
MEDIATION CONSOMMATION DÉVELOPPEMENT/MED CONSO DEV
En cas de litige, vous pouvez déposer votre réclamation sur son site : https://www.medconsodev.eu
ou par voie postale en écrivant à :
MEDIATION CONSOMMATION DÉVELOPPEMENT/MED CONSO DEV
Centre d’Affaires Stéphanois SAS
IMMEUBLE L’HORIZON – ESPLANADE DE FRANCE
3, RUE J. CONSTANT MILLERET – 42000 SAINT-ÉTIENNE
À défaut de règlement amiable, tout différend résultant des présentes relèvera de la juridiction compétente en la matière.`;

const appendedText = `

---

Mentions Légales 

1.1. Éditeur du site 
Floureto Férigoule – Méthode Poyet Entreprise individuelle de droit français 
Numéro SIREN / SIRET : 832 565 410 00020 
Adresse de domiciliation : 29, rue du Mont Berny – 60350 Pierrefonds 
Adresse e-mail : floureto.ferigoule@gmail.com 
Téléphone : 07 69 05 10 87 
TVA : TVA non applicable, article 293 B du Code général des impôts 

2.2. Activité exercée 
L’activité présentée sur ce site relève de l’accompagnement au bien-être selon la Méthode Poyet. Les prestations proposées ne constituent ni un acte médical, ni un diagnostic, ni un traitement, et ne se substituent en aucun cas à un suivi médical ou paramédical assuré par un professionnel de santé. L’activité est exercée en dehors de tout parcours de soins coordonné. 

3.3. Assurance responsabilité civile professionnelle 
L’éditrice du site a souscrit une assurance responsabilité civile professionnelle couvrant l’ensemble des prestations proposées. 
Assureur : MEDINAT 
Intermédiaire : +Simple 
Adresse : 2 rue Grignan – 13001 Marseille 
Numéro de contrat : HXFRME000008897 

4.4. Médiation de la consommation 
Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, en cas de litige non résolu après une réclamation écrite préalable, le client peut recourir gratuitement à un médiateur de la consommation. 
Entité de médiation retenue : MÉDIATION CONSOMMATION DÉVELOPPEMENT / MED CONSO DEV 
Site internet : https://www.medconsodev.eu 
Adresse postale : MÉDIATION CONSOMMATION DÉVELOPPEMENT / MED CONSO DEV Centre d’Affaires Stéphanois SAS Immeuble L’Horizon – Esplanade de France 3, rue J. Constant Milleret 42000 Saint-Étienne 

5.5. Hébergement du site 
Le site est hébergé par : [À COMPLÉTER] 
Raison sociale de l’hébergeur : 
Adresse : 
Téléphone : 

6.6. Propriété intellectuelle 
L’ensemble des contenus présents sur ce site (textes, images, logos, documents) est protégé par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite. 

7.7. Données personnelles – RGPD 
Les données personnelles éventuellement collectées via le site sont utilisées uniquement dans le cadre de la relation professionnelle. Conformément au Règlement Général sur la Protection des Données (RGPD), l’utilisateur dispose d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de ses données. Ces droits peuvent être exercés par courriel à l’adresse : floureto.ferigoule@gmail.com ou par courrier à l’adresse de domiciliation. 

8.8. Cookies 
Le site peut utiliser des cookies strictement nécessaires à son fonctionnement. Lorsque des cookies non essentiels sont utilisés, le consentement de l’utilisateur est requis. 

9.9. Conditions générales de vente 
Les conditions générales de vente applicables aux prestations proposées sont consultables sur simple demande ou disponibles au cabinet.`;

const finalContent = existingContent + appendedText;

const mentionsData = [
    {
      id: 'mentions-text',
      type: 'text',
      content: {
        title: '',
        content: finalContent
      }
    }
];

async function updateMentions() {
    console.log("Updating mentions.sections with appended text...");
    
    const { error } = await supabase
        .from('site_content')
        .upsert({ 
            key: 'mentions.sections', 
            data: mentionsData 
        });

    if (error) {
        console.error("Error updating mentions:", error);
    } else {
        console.log("Successfully updated mentions.sections in Supabase.");
    }
}

updateMentions();
