import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const enrichedDesignData = {
  title: 'Design Graphique & Identité Visuelle',
  shortDescription: 'Création d\'identités visuelles uniques et percutantes qui reflètent l\'essence de votre marque.',
  description: `# Votre Image de Marque, Notre Passion

Dans un monde où l'image est reine, votre identité visuelle est votre premier ambassadeur. Chez Bedeew Digital, nous créons des designs qui captivent, communiquent et convertissent.

## L'Importance du Design

### Pourquoi Investir dans le Design ?

- **94% des premières impressions** sont liées au design
- **75% des consommateurs** jugent la crédibilité d'une entreprise sur son design
- **Un bon design augmente les conversions de 200%**
- **Le branding cohérent augmente les revenus de 33%**

### Les Défis des Entreprises

- Absence d'identité visuelle cohérente
- Logo amateur qui ne reflète pas le professionnalisme
- Communication visuelle incohérente
- Difficulté à se démarquer de la concurrence
- Manque de supports de communication professionnels

## Notre Approche Design

### 1. Identité Visuelle Complète

Nous créons votre identité de marque de A à Z :
- **Logo professionnel** : Unique, mémorable et intemporel
- **Charte graphique** : Couleurs, typographies, règles d'utilisation
- **Déclinaisons** : Versions couleur, noir & blanc, monochrome
- **Guide de style** : Documentation complète pour maintenir la cohérence

### 2. Supports de Communication

Nous concevons tous vos supports print et digital :
- **Print** : Cartes de visite, flyers, brochures, affiches, roll-ups
- **Digital** : Bannières web, posts réseaux sociaux, newsletters, présentations
- **Packaging** : Emballages produits, étiquettes, sacs personnalisés
- **Signalétique** : Enseignes, panneaux, habillage de véhicules

### 3. Design Web et Mobile

Nous créons des interfaces modernes et intuitives :
- **UI Design** : Interfaces utilisateur esthétiques
- **UX Design** : Expérience utilisateur optimisée
- **Responsive** : Adaptation parfaite sur tous les écrans
- **Prototypes** : Maquettes interactives avant développement

### 4. Branding et Stratégie

Nous définissons votre positionnement de marque :
- **Analyse de marché** : Étude de la concurrence et des tendances
- **Positionnement** : Définition de votre différenciation
- **Storytelling** : Narration de votre histoire de marque
- **Guidelines** : Règles d'utilisation de votre identité

## Nos Services Design

### Pack Identité Starter
- Logo professionnel (3 propositions)
- Charte graphique de base
- Carte de visite
- Papier en-tête
- Fichiers sources

### Pack Identité Business
- Tout du Pack Starter
- Déclinaisons logo (5 versions)
- Charte graphique complète
- 5 templates réseaux sociaux
- Guide de style détaillé
- Mockups 3D

### Pack Identité Premium
- Tout du Pack Business
- Étude de marché et positionnement
- Naming et baseline
- 10 supports de communication
- Animation logo
- Présentation de marque
- Suivi 6 mois

## Notre Processus Créatif

### 1. Brief et Découverte
- Réunion de lancement
- Questionnaire détaillé
- Analyse de la concurrence
- Moodboard et inspirations

### 2. Recherche et Concepts
- Brainstorming créatif
- Esquisses et croquis
- 3 concepts différents
- Présentation et explications

### 3. Développement
- Affinement du concept choisi
- Déclinaisons et variations
- Tests de lisibilité
- Validation client

### 4. Finalisation
- Optimisation technique
- Création des fichiers sources
- Guide d'utilisation
- Livraison complète

## Résultats de Nos Clients

### Startup Tech
- Identité moderne et professionnelle
- +300% de reconnaissance de marque
- Levée de fonds facilitée

### Restaurant Gastronomique
- Rebranding complet
- +150% de fréquentation
- Présence dans les médias

### Boutique de Mode
- Identité élégante et cohérente
- +200% d'engagement sur les réseaux
- Expansion à 3 nouvelles boutiques

## Pourquoi Choisir Bedeew Digital ?

✅ **Créativité** : Designs uniques et sur mesure

✅ **Expertise** : Designers expérimentés et passionnés

✅ **Écoute** : Nous comprenons votre vision

✅ **Qualité** : Fichiers professionnels haute résolution

✅ **Support** : Accompagnement et conseils continus

## Nos Outils

Nous travaillons avec les meilleurs logiciels :
- **Adobe Creative Suite** : Photoshop, Illustrator, InDesign
- **Figma** : Design d'interfaces
- **After Effects** : Animations
- **Cinema 4D** : Modélisation 3D

## Garanties

🎨 **Originalité** : Designs 100% uniques et personnalisés
📁 **Fichiers** : Tous les formats (AI, PSD, PDF, PNG, SVG)
♾️ **Révisions** : Modifications illimitées jusqu'à satisfaction
⚖️ **Propriété** : Vous êtes propriétaire de tous les fichiers
📚 **Documentation** : Guide d'utilisation complet

## Prêt à Créer Votre Identité ?

Contactez-nous pour un devis gratuit et des exemples de notre travail.

📞 WhatsApp : +221 77 454 8661
📧 Email : contact@bedeew.com
🌐 Site web : www.bedeew.com`,
  
  processSteps: [
    {
      title: 'Brief et Découverte',
      description: 'Réunion de lancement, questionnaire détaillé, analyse de la concurrence et création du moodboard.',
      duration: '3-5 jours'
    },
    {
      title: 'Recherche et Concepts',
      description: 'Brainstorming créatif, esquisses et présentation de 3 concepts différents.',
      duration: '1 semaine'
    },
    {
      title: 'Développement',
      description: 'Affinement du concept choisi, déclinaisons, tests et validation client.',
      duration: '1 semaine'
    },
    {
      title: 'Finalisation',
      description: 'Optimisation technique, création des fichiers sources et guide d\'utilisation.',
      duration: '3-5 jours'
    },
    {
      title: 'Livraison',
      description: 'Remise de tous les fichiers, guide de style et formation à l\'utilisation.',
      duration: '1 jour'
    },
    {
      title: 'Support',
      description: 'Accompagnement post-livraison et ajustements si nécessaire.',
      duration: '1-3 mois'
    }
  ],
  
  faqs: [
    {
      question: 'Combien coûte la création d\'un logo ?',
      answer: 'Un logo professionnel coûte entre 150 000 et 500 000 FCFA selon la complexité. Cela inclut 3 propositions, révisions illimitées et tous les fichiers sources.'
    },
    {
      question: 'Combien de temps pour créer une identité visuelle ?',
      answer: 'Comptez 3-4 semaines pour une identité complète : 1 semaine de recherche, 1 semaine de création, 1 semaine de développement et quelques jours de finalisation.'
    },
    {
      question: 'Puis-je avoir des révisions illimitées ?',
      answer: 'Oui ! Nous offrons des révisions illimitées jusqu\'à ce que vous soyez 100% satisfait. Votre satisfaction est notre priorité.'
    },
    {
      question: 'Quels fichiers vais-je recevoir ?',
      answer: 'Vous recevez tous les formats : AI (Adobe Illustrator), PSD (Photoshop), PDF, PNG (haute résolution), SVG (vectoriel), et JPG. Vous êtes propriétaire de tous les fichiers.'
    },
    {
      question: 'Créez-vous des logos animés ?',
      answer: 'Oui, nous créons des logos animés pour vos vidéos, sites web et réseaux sociaux. C\'est un excellent moyen de dynamiser votre identité.'
    },
    {
      question: 'Proposez-vous du design pour les réseaux sociaux ?',
      answer: 'Absolument ! Nous créons des templates personnalisés pour Facebook, Instagram, LinkedIn, etc. Vous pourrez facilement créer vos propres posts en gardant une cohérence visuelle.'
    },
    {
      question: 'Faites-vous du print (impression) ?',
      answer: 'Nous créons les designs et pouvons gérer l\'impression via nos partenaires imprimeurs à Dakar. Vous recevez vos supports imprimés clés en main.'
    },
    {
      question: 'Que se passe-t-il si je n\'aime aucune proposition ?',
      answer: 'C\'est rare, mais si aucune des 3 propositions ne vous convient, nous repartons de zéro avec un nouveau brief. Votre satisfaction est garantie.'
    }
  ],
  
  testimonials: [
    {
      client: 'Khadija Mbaye',
      company: 'Boutique Elegance & Style',
      content: 'Logo magnifique et identité visuelle cohérente ! Mes clients adorent le nouveau branding. L\'équipe a parfaitement compris ma vision. Bravo !',
      rating: 5
    },
    {
      client: 'Cheikh Tidiane Sy',
      company: 'Cabinet d\'Architecture SY',
      content: 'Design professionnel et moderne. Le logo reflète parfaitement notre expertise. Les supports de communication sont de très haute qualité. Je recommande !',
      rating: 5
    },
    {
      client: 'Mariama Diallo',
      company: 'Restaurant Teranga',
      content: 'Rebranding complet réussi ! Notre nouvelle identité attire beaucoup plus de clients. Les menus, cartes et enseignes sont superbes. Merci Bedeew Digital !',
      rating: 5
    }
  ]
};

const enrichDesignService = async () => {
  try {
    await connectDB();
    
    console.log('🔍 Recherche du service Design Graphique...');
    
    const service = await Service.findOne({
      $or: [
        { slug: { $regex: /design/i } },
        { title: { $regex: /design|graphique/i } }
      ]
    });
    
    if (!service) {
      console.log('❌ Service Design Graphique non trouvé');
      console.log('💡 Créez d\'abord le service via l\'interface admin');
      process.exit(0);
    }
    
    console.log(`✅ Service trouvé : "${service.title}"`);
    console.log('📝 Mise à jour du contenu...');
    
    service.title = enrichedDesignData.title;
    service.shortDescription = enrichedDesignData.shortDescription;
    service.description = enrichedDesignData.description;
    service.processSteps = enrichedDesignData.processSteps;
    service.faqs = enrichedDesignData.faqs;
    service.testimonials = enrichedDesignData.testimonials;
    service.published = true;
    service.featured = true;
    
    await service.save();
    
    console.log('✅ Service Design Graphique enrichi avec succès !');
    console.log(`📊 Description : ${enrichedDesignData.description.length} caractères`);
    console.log(`🔄 Process Steps : ${enrichedDesignData.processSteps.length} étapes`);
    console.log(`❓ FAQs : ${enrichedDesignData.faqs.length} questions`);
    console.log(`💬 Testimonials : ${enrichedDesignData.testimonials.length} témoignages`);
    console.log('\n🎉 Enrichissement terminé !');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

enrichDesignService();
