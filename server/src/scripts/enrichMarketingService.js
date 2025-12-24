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

const enrichedMarketingData = {
  title: 'Marketing Digital & Stratégie',
  shortDescription: 'Stratégies marketing sur mesure pour augmenter votre visibilité en ligne et attirer plus de clients qualifiés.',
  description: `# Propulsez Votre Entreprise avec le Marketing Digital

Le marketing digital n'est plus une option pour les entreprises qui veulent rester compétitives. Au Sénégal, avec plus de 10 millions d'internautes, les opportunités sont immenses pour ceux qui savent les saisir.

## Pourquoi le Marketing Digital ?

### Les Chiffres Parlent

- **81% des consommateurs** recherchent en ligne avant d'acheter
- **63% de la population sénégalaise** est connectée à internet
- **3,5 millions** d'utilisateurs actifs sur Facebook
- **ROI moyen** : 5 FCFA générés pour chaque 1 FCFA investi

### Les Défis des Entreprises Sénégalaises

- Manque de visibilité face à la concurrence
- Budget marketing limité
- Difficulté à mesurer les résultats
- Absence de stratégie digitale structurée
- Méconnaissance des outils et canaux efficaces

## Notre Approche Marketing

Chez Bedeew Digital, nous créons des stratégies marketing sur mesure qui génèrent des résultats concrets et mesurables.

### 1. Audit et Stratégie

Nous commençons par un audit complet de votre présence digitale :
- Analyse de votre site web et réseaux sociaux
- Étude de la concurrence
- Identification de votre audience cible
- Définition d'objectifs SMART
- Création d'un plan d'action détaillé

### 2. SEO et Référencement Local

Nous optimisons votre visibilité sur Google :
- Recherche de mots-clés pertinents
- Optimisation technique de votre site
- Création de contenu SEO
- Backlinks de qualité
- Google My Business optimisé

**Résultats attendus :** +200% de trafic organique en 6 mois

### 3. Réseaux Sociaux

Nous gérons votre présence sur les réseaux sociaux :
- Stratégie de contenu adaptée à chaque plateforme
- Création de visuels professionnels
- Publication régulière et engageante
- Community management réactif
- Campagnes publicitaires ciblées

**Plateformes :** Facebook, Instagram, LinkedIn, TikTok

### 4. Publicité en Ligne

Nous créons et gérons vos campagnes publicitaires :
- Google Ads (recherche, display, shopping)
- Facebook & Instagram Ads
- LinkedIn Ads (B2B)
- Retargeting et remarketing
- Optimisation continue du ROI

**ROI moyen :** 4:1 à 6:1

### 5. Content Marketing

Nous créons du contenu qui attire et convertit :
- Articles de blog optimisés SEO
- Vidéos et infographies
- Études de cas et témoignages
- Newsletters et email marketing
- E-books et guides pratiques

### 6. Email Marketing

Nous construisons et animons votre liste email :
- Création de lead magnets
- Séquences d'emails automatisées
- Newsletters engageantes
- Segmentation et personnalisation
- Analyse et optimisation

**Taux d'ouverture moyen :** 25-35%

## Nos Services Marketing

### Pack Starter (PME)
- Audit digital complet
- Stratégie marketing 3 mois
- Gestion 2 réseaux sociaux
- 2 articles de blog/mois
- Reporting mensuel

### Pack Business (Croissance)
- Tout du Pack Starter
- Gestion 3 réseaux sociaux
- 4 articles de blog/mois
- Campagnes publicitaires
- Email marketing
- SEO avancé

### Pack Premium (Entreprises)
- Tout du Pack Business
- Stratégie complète multicanal
- Création vidéo
- Influenceurs marketing
- Support prioritaire
- Consultant dédié

## Résultats de Nos Clients

### E-commerce de Mode
- +350% de trafic web
- +280% de ventes en ligne
- ROI publicitaire : 6:1

### Cabinet de Conseil
- +200% de leads qualifiés
- -40% de coût par lead
- +150% de taux de conversion

### Restaurant
- +180% de réservations
- +250% de followers Instagram
- +90% de notoriété locale

## Pourquoi Choisir Bedeew Digital ?

✅ **Expertise Locale** : Connaissance approfondie du marché sénégalais

✅ **Résultats Mesurables** : Reporting transparent et KPIs clairs

✅ **Approche Data-Driven** : Décisions basées sur les données

✅ **Équipe Dédiée** : Consultants expérimentés à votre service

✅ **Support Réactif** : Disponible par WhatsApp, email et téléphone

## Outils et Technologies

Nous utilisons les meilleurs outils du marché :
- **Analytics** : Google Analytics, Meta Business Suite
- **SEO** : Ahrefs, SEMrush, Google Search Console
- **Social Media** : Hootsuite, Buffer, Canva
- **Email** : Mailchimp, Sendinblue
- **Publicité** : Google Ads, Facebook Ads Manager

## Garanties

🎯 **Résultats** : Objectifs clairs et mesurables
📊 **Transparence** : Reporting mensuel détaillé
💰 **ROI** : Optimisation continue pour maximiser votre retour
🔄 **Flexibilité** : Contrats mensuels sans engagement long terme

## Prêt à Booster Votre Marketing ?

Contactez-nous pour un audit gratuit et un plan d'action personnalisé.

📞 WhatsApp : +221 77 454 8661
📧 Email : contact@bedeew.com
🌐 Site web : www.bedeew.com`,
  
  processSteps: [
    {
      title: 'Audit Digital Complet',
      description: 'Analyse approfondie de votre présence en ligne, de votre concurrence et de votre marché.',
      duration: '1 semaine'
    },
    {
      title: 'Stratégie Marketing',
      description: 'Création d\'une stratégie sur mesure avec objectifs, KPIs et plan d\'action détaillé.',
      duration: '1 semaine'
    },
    {
      title: 'Mise en Place',
      description: 'Configuration des outils, création des comptes et mise en place de la stratégie.',
      duration: '1-2 semaines'
    },
    {
      title: 'Création de Contenu',
      description: 'Production de contenu optimisé : articles, visuels, vidéos, campagnes publicitaires.',
      duration: 'Continue'
    },
    {
      title: 'Gestion et Animation',
      description: 'Publication régulière, community management, gestion des campagnes publicitaires.',
      duration: 'Continue'
    },
    {
      title: 'Analyse et Optimisation',
      description: 'Suivi des performances, reporting mensuel et optimisation continue des campagnes.',
      duration: 'Mensuel'
    }
  ],
  
  faqs: [
    {
      question: 'Quel budget prévoir pour le marketing digital ?',
      answer: 'Le budget varie selon vos objectifs. Pour une PME, comptez 200 000 - 500 000 FCFA/mois pour une stratégie complète (gestion réseaux sociaux, SEO, publicité). Nous adaptons nos services à votre budget.'
    },
    {
      question: 'Combien de temps avant de voir des résultats ?',
      answer: 'Les premiers résultats apparaissent dès le 1er mois (engagement, trafic). Pour des résultats significatifs (conversions, ROI), comptez 3-6 mois. Le marketing digital est un investissement à moyen terme.'
    },
    {
      question: 'Gérez-vous tous les réseaux sociaux ?',
      answer: 'Oui, nous gérons Facebook, Instagram, LinkedIn, TikTok, Twitter et YouTube. Nous vous conseillons sur les plateformes les plus pertinentes pour votre activité.'
    },
    {
      question: 'Proposez-vous des contrats sans engagement ?',
      answer: 'Oui, nos contrats sont mensuels et résiliables avec un préavis de 30 jours. Nous préférons vous convaincre par nos résultats plutôt que par un engagement long terme.'
    },
    {
      question: 'Comment mesurez-vous les résultats ?',
      answer: 'Nous utilisons Google Analytics, Meta Business Suite et des tableaux de bord personnalisés. Vous recevez un reporting mensuel détaillé avec tous les KPIs : trafic, conversions, ROI, engagement, etc.'
    },
    {
      question: 'Créez-vous le contenu ou devons-nous le fournir ?',
      answer: 'Nous créons tout le contenu : textes, visuels, vidéos. Vous validez avant publication. Si vous avez du contenu existant, nous pouvons l\'optimiser et le réutiliser.'
    },
    {
      question: 'Travaillez-vous avec des influenceurs ?',
      answer: 'Oui, nous avons un réseau d\'influenceurs sénégalais (micro et macro). Nous gérons la sélection, la négociation et le suivi des campagnes d\'influence.'
    },
    {
      question: 'Que se passe-t-il si nous ne sommes pas satisfaits ?',
      answer: 'Nous nous engageons sur des résultats. Si après 3 mois vous n\'êtes pas satisfait, nous ajustons la stratégie ou vous pouvez résilier sans pénalité.'
    }
  ],
  
  testimonials: [
    {
      client: 'Ibrahima Sarr',
      company: 'E-commerce TechSenegal',
      content: 'En 6 mois avec Bedeew Digital, notre CA a triplé ! La stratégie Facebook Ads est redoutable. ROI de 6:1 sur nos campagnes. Je recommande à 100%.',
      rating: 5
    },
    {
      client: 'Aïssatou Ndiaye',
      company: 'Cabinet Expertise Comptable',
      content: 'Excellente gestion de nos réseaux sociaux. +200% de leads qualifiés en 4 mois. L\'équipe est professionnelle et très réactive. Merci !',
      rating: 5
    },
    {
      client: 'Ousmane Diallo',
      company: 'Restaurant Le Baobab',
      content: 'Notre visibilité a explosé ! +250% de followers Instagram, +180% de réservations. Les campagnes publicitaires sont très bien ciblées. Top !',
      rating: 5
    }
  ]
};

const enrichMarketingService = async () => {
  try {
    await connectDB();
    
    console.log('🔍 Recherche du service Marketing Digital...');
    
    const service = await Service.findOne({
      $or: [
        { slug: { $regex: /marketing/i } },
        { title: { $regex: /marketing/i } }
      ]
    });
    
    if (!service) {
      console.log('❌ Service Marketing Digital non trouvé');
      console.log('💡 Créez d\'abord le service via l\'interface admin');
      process.exit(0);
    }
    
    console.log(`✅ Service trouvé : "${service.title}"`);
    console.log('📝 Mise à jour du contenu...');
    
    service.title = enrichedMarketingData.title;
    service.shortDescription = enrichedMarketingData.shortDescription;
    service.description = enrichedMarketingData.description;
    service.processSteps = enrichedMarketingData.processSteps;
    service.faqs = enrichedMarketingData.faqs;
    service.testimonials = enrichedMarketingData.testimonials;
    service.published = true;
    service.featured = true;
    
    await service.save();
    
    console.log('✅ Service Marketing Digital enrichi avec succès !');
    console.log(`📊 Description : ${enrichedMarketingData.description.length} caractères`);
    console.log(`🔄 Process Steps : ${enrichedMarketingData.processSteps.length} étapes`);
    console.log(`❓ FAQs : ${enrichedMarketingData.faqs.length} questions`);
    console.log(`💬 Testimonials : ${enrichedMarketingData.testimonials.length} témoignages`);
    console.log('\n🎉 Enrichissement terminé !');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

enrichMarketingService();
