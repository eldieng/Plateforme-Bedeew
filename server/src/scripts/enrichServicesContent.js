import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Contenu enrichi pour le service Développement Web
const enrichedWebDevData = {
  title: 'Développement Web Professionnel',
  shortDescription: 'Création de sites web modernes, performants et optimisés pour convertir vos visiteurs en clients.',
  description: `# Votre Site Web, Votre Vitrine Digitale

Dans un monde où la présence en ligne est devenue indispensable, disposer d'un site web professionnel n'est plus un luxe mais une nécessité. Chez Bedeew Digital, nous créons des sites web sur mesure qui reflètent l'identité de votre entreprise et répondent aux attentes de vos clients sénégalais et internationaux.

## La Problématique

De nombreuses entreprises sénégalaises font face à des défis majeurs :
- Absence de visibilité en ligne face à la concurrence
- Sites web obsolètes qui ne convertissent pas les visiteurs
- Manque d'expertise technique pour maintenir un site performant
- Budget limité pour investir dans le digital
- Difficulté à mesurer le retour sur investissement

## Notre Solution

Bedeew Digital propose une approche complète du développement web :

### 1. Analyse de Vos Besoins
- Étude de votre marché et de vos concurrents
- Définition de vos objectifs business
- Identification de votre audience cible

### 2. Conception Sur Mesure
- Design moderne et responsive (mobile-first)
- Expérience utilisateur (UX) optimisée
- Interface intuitive et accessible

### 3. Développement Technique
- Technologies modernes et performantes (React, Node.js)
- Architecture scalable et sécurisée
- Optimisation SEO dès la conception
- Intégration de solutions de paiement locales (Wave, Orange Money)

### 4. Formation et Support
- Formation à la gestion de contenu
- Documentation complète
- Support technique continu
- Maintenance et mises à jour

## Les Avantages de Nos Services

✅ **Expertise Locale** : Nous comprenons le marché sénégalais, ses spécificités culturelles et les attentes des consommateurs locaux.

✅ **Technologies Modernes** : Nous utilisons les dernières technologies pour garantir performance, sécurité et évolutivité.

✅ **Approche Personnalisée** : Chaque projet est unique. Nous adaptons nos solutions à vos besoins spécifiques et à votre budget.

✅ **Référencement Naturel** : Tous nos sites sont optimisés pour les moteurs de recherche dès leur création.

✅ **Support Continu** : Notre équipe reste à vos côtés après le lancement pour assurer le succès de votre projet.

## Résultats Attendus

En choisissant Bedeew Digital pour votre développement web, vous pouvez vous attendre à :
- **+150% de visibilité** : Augmentation du trafic web grâce au SEO
- **+80% de conversions** : Design optimisé pour transformer les visiteurs en clients
- **-50% de coûts** : Réduction des coûts marketing grâce à l'automatisation
- **24/7 disponibilité** : Votre vitrine ouverte jour et nuit

## Technologies et Outils

Nous travaillons avec les meilleures technologies du marché :
- **Frontend** : React, Vue.js, Next.js
- **Backend** : Node.js, Express, MongoDB
- **CMS** : WordPress, Strapi
- **E-commerce** : WooCommerce, Shopify
- **Hébergement** : Solutions cloud performantes et sécurisées

## Nos Engagements

🎯 **Qualité** : Code propre, testé et documenté
⏱️ **Délais** : Respect des échéances convenues
💰 **Transparence** : Devis détaillé et sans surprise
🔒 **Sécurité** : Protection des données et conformité RGPD
📈 **Performance** : Sites rapides et optimisés

## Types de Sites Web

### Site Vitrine
Présentation de votre entreprise, services et coordonnées. Idéal pour PME, artisans et professions libérales.

### E-commerce
Boutique en ligne complète avec paiement sécurisé, gestion des stocks et suivi des commandes.

### Application Web
Solutions sur mesure pour gérer vos processus métier (CRM, ERP, plateformes de réservation).

### Landing Page
Page unique optimisée pour convertir les visiteurs en clients lors de campagnes marketing.

## Contactez-nous

Prêt à lancer votre projet web ? Contactez-nous pour un devis gratuit et personnalisé.

📞 WhatsApp : +221 77 454 8661
📧 Email : contact@bedeew.com
🌐 Site web : www.bedeew.com`,
  
  processSteps: [
    {
      title: 'Analyse et Audit',
      description: 'Étude approfondie de vos besoins, de votre marché et de vos concurrents pour définir la meilleure stratégie.',
      duration: '1 semaine'
    },
    {
      title: 'Stratégie et Planification',
      description: 'Définition de l\'architecture du site, des fonctionnalités et du calendrier de réalisation.',
      duration: '1 semaine'
    },
    {
      title: 'Design et Maquettes',
      description: 'Création des maquettes graphiques et validation du design avec vous.',
      duration: '2 semaines'
    },
    {
      title: 'Développement',
      description: 'Codage du site avec les technologies modernes, tests et optimisations.',
      duration: '3-4 semaines'
    },
    {
      title: 'Tests et Optimisation',
      description: 'Tests de compatibilité, performance, sécurité et optimisation SEO.',
      duration: '1 semaine'
    },
    {
      title: 'Lancement et Formation',
      description: 'Mise en ligne du site, formation à la gestion de contenu et support continu.',
      duration: '1 semaine'
    }
  ],
  
  faqs: [
    {
      question: 'Quel est le délai de réalisation d\'un site web ?',
      answer: 'Le délai varie selon la complexité du projet. Un site vitrine prend 4-6 semaines, un e-commerce 8-12 semaines, et une application web 3-6 mois.'
    },
    {
      question: 'Proposez-vous un paiement échelonné ?',
      answer: 'Oui, nous proposons des facilités de paiement : 40% à la signature, 30% à la validation des maquettes, et 30% à la livraison.'
    },
    {
      question: 'Le site sera-t-il optimisé pour mobile ?',
      answer: 'Absolument ! Tous nos sites sont responsive et optimisés mobile-first, car 95% du trafic au Sénégal vient du mobile.'
    },
    {
      question: 'Qui sera propriétaire du site ?',
      answer: 'Vous êtes propriétaire à 100% du site, du code source, du design et de tous les contenus. Nous vous remettons tous les accès.'
    },
    {
      question: 'Offrez-vous une garantie ?',
      answer: 'Oui, nous offrons une garantie de 6 mois sur tous nos développements, incluant les corrections de bugs et le support technique.'
    },
    {
      question: 'Puis-je modifier le contenu moi-même après ?',
      answer: 'Oui, nous vous formons à la gestion de contenu et vous fournissons une documentation complète. Vous pourrez modifier textes, images et ajouter des pages facilement.'
    },
    {
      question: 'Le référencement (SEO) est-il inclus ?',
      answer: 'Oui, l\'optimisation SEO de base est incluse : structure technique, balises meta, sitemap, vitesse de chargement, etc.'
    },
    {
      question: 'Que se passe-t-il après le lancement ?',
      answer: 'Nous restons disponibles pour le support technique, les mises à jour de sécurité et les évolutions. Nous proposons également des contrats de maintenance mensuelle.'
    }
  ],
  
  testimonials: [
    {
      client: 'Fatou Diop',
      company: 'Boutique Elegance Dakar',
      content: 'Bedeew Digital a créé notre site e-commerce en 2 mois. Résultat : +200% de ventes en ligne et une présence professionnelle qui inspire confiance. Je recommande vivement !',
      rating: 5
    },
    {
      client: 'Mamadou Seck',
      company: 'Cabinet Juridique Seck & Associés',
      content: 'Site web professionnel, moderne et facile à gérer. L\'équipe est à l\'écoute et très réactive. Nous recevons maintenant 30+ demandes par mois via le site.',
      rating: 5
    },
    {
      client: 'Aminata Fall',
      company: 'Restaurant Le Lagon',
      content: 'Notre nouveau site a transformé notre activité. Les réservations en ligne ont augmenté de 150% et notre visibilité sur Google a explosé. Merci Bedeew Digital !',
      rating: 5
    }
  ]
};

// Fonction principale pour enrichir les services
const enrichServicesContent = async () => {
  try {
    await connectDB();
    
    console.log('🔍 Recherche du service Développement Web...');
    
    // Chercher le service par slug ou titre
    const service = await Service.findOne({
      $or: [
        { slug: { $regex: /developpement.*web/i } },
        { title: { $regex: /développement.*web/i } },
        { title: { $regex: /web/i } }
      ]
    });
    
    if (!service) {
      console.log('❌ Service Développement Web non trouvé');
      console.log('💡 Créez d\'abord le service via l\'interface admin, puis relancez ce script');
      process.exit(0);
    }
    
    console.log(`✅ Service trouvé : "${service.title}"`);
    console.log('📝 Mise à jour du contenu...');
    
    // Mettre à jour le service
    service.title = enrichedWebDevData.title;
    service.shortDescription = enrichedWebDevData.shortDescription;
    service.description = enrichedWebDevData.description;
    service.processSteps = enrichedWebDevData.processSteps;
    service.faqs = enrichedWebDevData.faqs;
    service.testimonials = enrichedWebDevData.testimonials;
    service.published = true;
    service.featured = true;
    
    await service.save();
    
    console.log('✅ Service enrichi avec succès !');
    console.log(`📊 Description : ${enrichedWebDevData.description.length} caractères`);
    console.log(`🔄 Process Steps : ${enrichedWebDevData.processSteps.length} étapes`);
    console.log(`❓ FAQs : ${enrichedWebDevData.faqs.length} questions`);
    console.log(`💬 Testimonials : ${enrichedWebDevData.testimonials.length} témoignages`);
    console.log('\n🎉 Enrichissement terminé !');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'enrichissement :', error);
    process.exit(1);
  }
};

// Exécuter le script
enrichServicesContent();
