import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Portfolio from '../models/Portfolio.js';
import Blog from '../models/Blog.js';

// Charger le .env depuis le dossier server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Données de seed
const users = [
  {
    firstName: 'Admin',
    lastName: 'Bedeew',
    email: 'admin@bedeew.digital',
    password: 'Admin123!',
    role: 'admin',
    isActive: true,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'User123!',
    role: 'user',
    isActive: true,
  },
];

const services = [
  {
    title: 'Développement Web & Mobile',
    shortDescription: 'Création de sites web et applications mobiles sur mesure, performants et évolutifs.',
    fullDescription: 'Nous concevons et développons des sites web modernes et des applications mobiles natives ou hybrides. Notre expertise couvre React, React Native, Node.js, et les dernières technologies web. Chaque projet est conçu pour être responsive, rapide et optimisé pour le SEO.',
    icon: 'code',
    category: 'development',
    features: [
      {
        title: 'Sites Web Responsives',
        description: 'Design adaptatif pour tous les appareils (mobile, tablette, desktop)',
      },
      {
        title: 'Applications Mobiles',
        description: 'Applications iOS et Android natives ou hybrides',
      },
      {
        title: 'E-commerce',
        description: 'Boutiques en ligne complètes avec paiement sécurisé',
      },
      {
        title: 'Web Apps',
        description: 'Applications web progressives (PWA) performantes',
      },
    ],
    pricing: {
      startingPrice: 500000,
      currency: 'FCFA',
      pricingType: 'project',
    },
    published: true,
    order: 1,
  },
  {
    title: 'Design Graphique & UI/UX',
    shortDescription: 'Créations visuelles impactantes et expériences utilisateur optimales pour votre marque.',
    fullDescription: 'Notre équipe de designers crée des identités visuelles fortes et des interfaces utilisateur intuitives. Du logo à la charte graphique complète, en passant par le design d\'interface, nous donnons vie à votre vision avec créativité et professionnalisme.',
    icon: 'palette',
    category: 'design',
    features: [
      {
        title: 'Identité Visuelle',
        description: 'Logo, charte graphique, guide de style',
      },
      {
        title: 'UI/UX Design',
        description: 'Interfaces utilisateur intuitives et attractives',
      },
      {
        title: 'Design Print',
        description: 'Flyers, cartes de visite, affiches, brochures',
      },
      {
        title: 'Illustrations',
        description: 'Illustrations personnalisées pour vos supports',
      },
    ],
    pricing: {
      startingPrice: 200000,
      currency: 'FCFA',
      pricingType: 'project',
    },
    published: true,
    order: 2,
  },
  {
    title: 'Marketing Digital & SEO',
    shortDescription: 'Stratégies digitales pour booster votre visibilité en ligne et vos conversions.',
    fullDescription: 'Augmentez votre présence en ligne avec nos services de marketing digital. SEO, publicité en ligne, email marketing, et stratégie de contenu pour atteindre vos objectifs business. Nous analysons, optimisons et mesurons chaque action pour un ROI maximal.',
    icon: 'trending-up',
    category: 'marketing',
    features: [
      {
        title: 'Référencement SEO',
        description: 'Optimisation pour les moteurs de recherche',
      },
      {
        title: 'Publicité en Ligne',
        description: 'Google Ads, Facebook Ads, Instagram Ads',
      },
      {
        title: 'Email Marketing',
        description: 'Campagnes d\'emailing ciblées et performantes',
      },
      {
        title: 'Stratégie de Contenu',
        description: 'Création de contenu engageant et optimisé',
      },
    ],
    pricing: {
      startingPrice: 300000,
      currency: 'FCFA',
      pricingType: 'monthly',
    },
    published: true,
    order: 3,
  },
  {
    title: 'Community Management',
    shortDescription: 'Gestion professionnelle de vos réseaux sociaux pour engager votre communauté.',
    fullDescription: 'Confiez-nous la gestion de vos réseaux sociaux. Nous créons du contenu engageant, animons votre communauté, et développons votre présence sur Facebook, Instagram, LinkedIn, Twitter et TikTok. Stratégie, création de contenu, et reporting inclus.',
    icon: 'trending-up',
    category: 'marketing',
    features: [
      {
        title: 'Gestion Multi-Plateformes',
        description: 'Facebook, Instagram, LinkedIn, Twitter, TikTok',
      },
      {
        title: 'Création de Contenu',
        description: 'Posts, stories, visuels attractifs',
      },
      {
        title: 'Animation de Communauté',
        description: 'Réponses aux commentaires, engagement',
      },
      {
        title: 'Reporting Mensuel',
        description: 'Statistiques et analyses de performance',
      },
    ],
    pricing: {
      startingPrice: 150000,
      currency: 'FCFA',
      pricingType: 'monthly',
    },
    published: true,
    order: 4,
  },
  {
    title: 'Production Audiovisuelle',
    shortDescription: 'Création de vidéos professionnelles pour promouvoir votre marque et vos produits.',
    fullDescription: 'De la conception au montage final, nous produisons des vidéos de qualité professionnelle. Vidéos promotionnelles, tutoriels, interviews, événements, motion design - nous transformons vos idées en contenus visuels captivants.',
    icon: 'video',
    category: 'content',
    features: [
      {
        title: 'Vidéos Promotionnelles',
        description: 'Présentations produits, services, entreprise',
      },
      {
        title: 'Motion Design',
        description: 'Animations et graphismes animés',
      },
      {
        title: 'Montage Vidéo',
        description: 'Post-production professionnelle',
      },
      {
        title: 'Couverture Événements',
        description: 'Captation et montage d\'événements',
      },
    ],
    pricing: {
      startingPrice: 400000,
      currency: 'FCFA',
      pricingType: 'project',
    },
    published: true,
    order: 5,
  },
  {
    title: 'Intégration CMS',
    shortDescription: 'Mise en place de systèmes de gestion de contenu pour une autonomie totale.',
    fullDescription: 'Nous intégrons et personnalisons des CMS (WordPress, Strapi, Contentful) pour vous permettre de gérer facilement votre contenu. Formation incluse pour une prise en main rapide et efficace.',
    icon: 'code',
    category: 'development',
    features: [
      {
        title: 'WordPress',
        description: 'Installation, personnalisation, thèmes sur mesure',
      },
      {
        title: 'CMS Headless',
        description: 'Strapi, Contentful, Sanity',
      },
      {
        title: 'Formation',
        description: 'Formation complète à l\'utilisation du CMS',
      },
      {
        title: 'Maintenance',
        description: 'Support et mises à jour régulières',
      },
    ],
    pricing: {
      startingPrice: 350000,
      currency: 'FCFA',
      pricingType: 'project',
    },
    published: true,
    order: 6,
  },
];

const portfolios = [
  {
    title: 'Site E-commerce Fashion Store',
    description: 'Boutique en ligne moderne pour une marque de vêtements sénégalaise',
    fullDescription: 'Développement complet d\'une plateforme e-commerce avec catalogue produits, panier, paiement sécurisé (Wave, Orange Money), gestion des commandes et espace client. Interface moderne et responsive.',
    category: 'web',
    tags: ['ecommerce', 'react', 'nodejs', 'mongodb', 'stripe'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
        alt: 'Fashion Store Homepage',
        isPrimary: true,
      },
    ],
    client: {
      name: 'Fashion Store Dakar',
      website: 'https://example.com',
    },
    technologies: ['React', 'Node.js', 'MongoDB', 'TailwindCSS', 'Stripe'],
    completionDate: new Date('2024-01-15'),
    featured: true,
    published: true,
  },
  {
    title: 'Application Mobile de Livraison',
    description: 'Application de livraison de repas avec géolocalisation en temps réel',
    fullDescription: 'Application mobile iOS et Android permettant de commander des repas, suivre la livraison en temps réel, et payer en ligne. Interface intuitive pour les clients et les livreurs.',
    category: 'mobile',
    tags: ['react-native', 'firebase', 'maps', 'mobile'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800',
        alt: 'Delivery App Interface',
        isPrimary: true,
      },
    ],
    client: {
      name: 'QuickFood Sénégal',
    },
    technologies: ['React Native', 'Firebase', 'Google Maps API', 'Stripe'],
    completionDate: new Date('2024-02-20'),
    featured: true,
    published: true,
  },
  {
    title: 'Identité Visuelle - Tech Startup',
    description: 'Création complète de l\'identité visuelle pour une startup technologique',
    fullDescription: 'Design du logo, charte graphique complète, cartes de visite, papeterie, templates réseaux sociaux. Une identité moderne et professionnelle qui reflète l\'innovation.',
    category: 'design',
    tags: ['branding', 'logo', 'identity', 'design'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        alt: 'Brand Identity',
        isPrimary: true,
      },
    ],
    client: {
      name: 'TechVision Africa',
    },
    technologies: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    completionDate: new Date('2023-12-10'),
    featured: false,
    published: true,
  },
  {
    title: 'Campagne SEO - Agence Immobilière',
    description: 'Optimisation SEO complète pour une agence immobilière de Dakar',
    fullDescription: 'Audit SEO, optimisation on-page et off-page, création de contenu optimisé, netlinking. Résultat : +150% de trafic organique en 6 mois.',
    category: 'seo',
    tags: ['seo', 'marketing', 'content', 'analytics'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        alt: 'SEO Analytics Dashboard',
        isPrimary: true,
      },
    ],
    client: {
      name: 'Immo Dakar Premium',
    },
    technologies: ['Google Analytics', 'SEMrush', 'WordPress', 'Yoast SEO'],
    completionDate: new Date('2024-03-01'),
    featured: true,
    published: true,
  },
  {
    title: 'Gestion Réseaux Sociaux - Restaurant',
    description: 'Community management pour une chaîne de restaurants',
    fullDescription: 'Gestion complète des réseaux sociaux (Facebook, Instagram), création de contenu visuel, animation de communauté, campagnes publicitaires. +300% d\'engagement en 3 mois.',
    category: 'social-media',
    tags: ['social-media', 'content', 'marketing', 'instagram'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
        alt: 'Social Media Content',
        isPrimary: true,
      },
    ],
    client: {
      name: 'Les Délices du Sahel',
    },
    technologies: ['Canva', 'Buffer', 'Facebook Ads', 'Instagram'],
    completionDate: new Date('2024-01-30'),
    featured: false,
    published: true,
  },
  {
    title: 'Vidéo Promotionnelle - ONG',
    description: 'Production d\'une vidéo promotionnelle pour une ONG locale',
    fullDescription: 'Conception, tournage et montage d\'une vidéo de 3 minutes présentant les actions de l\'ONG. Interviews, images de terrain, motion design. Diffusion sur réseaux sociaux et site web.',
    category: 'video',
    tags: ['video', 'production', 'motion-design', 'editing'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800',
        alt: 'Video Production',
        isPrimary: true,
      },
    ],
    client: {
      name: 'Action Solidaire Sénégal',
    },
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    completionDate: new Date('2023-11-20'),
    featured: false,
    published: true,
  },
];

const blogs = [
  {
    title: "Les Tendances du Design Web en 2025",
    excerpt: "Découvrez les dernières tendances qui façonnent le design web moderne et comment les intégrer à votre site pour rester compétitif.",
    content: "Le design web évolue constamment. En 2025, nous observons plusieurs tendances majeures : le minimalisme audacieux, les animations micro-interactions, le dark mode par défaut, et l'utilisation créative de la typographie. Ces tendances ne sont pas seulement esthétiques, elles améliorent l'expérience utilisateur et l'accessibilité.",
    image: {
      url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      alt: "Design web moderne"
    },
    category: "design",
    tags: ["design", "tendances", "UI/UX", "web"],
    readTime: 5,
    published: true,
    featured: true
  },
  {
    title: "SEO Local : Boostez Votre Visibilité au Sénégal",
    excerpt: "Stratégies efficaces pour améliorer votre référencement local et attirer plus de clients dans votre région.",
    content: "Le SEO local est crucial pour les entreprises sénégalaises. Optimisez votre fiche Google My Business, utilisez des mots-clés locaux, obtenez des avis clients, et créez du contenu pertinent pour votre audience locale. Ces stratégies vous aideront à dominer les résultats de recherche locaux.",
    image: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      alt: "SEO Local Sénégal"
    },
    category: "seo",
    tags: ["SEO", "marketing", "local", "Sénégal"],
    readTime: 7,
    published: true,
    featured: true
  },
  {
    title: "React vs Vue : Quel Framework Choisir ?",
    excerpt: "Comparaison détaillée des deux frameworks JavaScript les plus populaires pour votre prochain projet web.",
    content: "React et Vue sont deux excellents choix pour le développement frontend. React offre une grande flexibilité et un écosystème riche, tandis que Vue est plus facile à apprendre et offre une courbe d'apprentissage douce. Le choix dépend de vos besoins spécifiques, de votre équipe et de votre projet.",
    image: {
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      alt: "React vs Vue"
    },
    category: "development",
    tags: ["React", "Vue", "JavaScript", "frontend"],
    readTime: 10,
    published: true,
    featured: true
  },
  {
    title: "Marketing Digital : Stratégies Gagnantes 2025",
    excerpt: "Les meilleures stratégies de marketing digital pour développer votre entreprise cette année.",
    content: "Le marketing digital en 2025 se concentre sur la personnalisation, l'authenticité et l'engagement. Utilisez le marketing de contenu, les réseaux sociaux, l'email marketing et le SEO de manière cohérente pour créer une présence en ligne forte et convertir vos prospects en clients fidèles.",
    image: {
      url: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800",
      alt: "Marketing Digital"
    },
    category: "marketing",
    tags: ["marketing", "digital", "stratégie", "business"],
    readTime: 8,
    published: true,
    featured: false
  },
  {
    title: "Créer une Identité Visuelle Forte",
    excerpt: "Guide complet pour développer une identité visuelle qui marque les esprits et renforce votre marque.",
    content: "Une identité visuelle forte est essentielle pour se démarquer. Elle comprend votre logo, vos couleurs, votre typographie et votre style graphique. Chaque élément doit raconter l'histoire de votre marque et créer une connexion émotionnelle avec votre audience.",
    image: {
      url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
      alt: "Identité Visuelle"
    },
    category: "design",
    tags: ["branding", "identité", "design", "logo"],
    readTime: 6,
    published: true,
    featured: false
  },
  {
    title: "Sécurité Web : Protégez Votre Site",
    excerpt: "Les meilleures pratiques pour sécuriser votre site web et protéger les données de vos utilisateurs.",
    content: "La sécurité web est primordiale. Utilisez HTTPS, mettez à jour régulièrement vos dépendances, implémentez l'authentification forte, protégez contre les injections SQL et XSS, et effectuez des audits de sécurité réguliers. La sécurité doit être une priorité dès le début du développement.",
    image: {
      url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800",
      alt: "Sécurité Web"
    },
    category: "development",
    tags: ["sécurité", "web", "HTTPS", "protection"],
    readTime: 9,
    published: true,
    featured: false
  }
];

// Fonction pour hasher les mots de passe
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Fonction principale de seed
const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    console.log('🔗 URI MongoDB:', process.env.MONGODB_URI?.substring(0, 80) + '...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas');
    console.log('📊 Base de données:', conn.connection.name);

    // Supprimer les données existantes
    console.log('🗑️  Suppression des données existantes...');
    await User.deleteMany({});
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    await Blog.deleteMany({});
    console.log('✅ Données existantes supprimées');

    // Créer les utilisateurs
    console.log('👥 Création des utilisateurs...');
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      }))
    );
    await User.insertMany(hashedUsers);
    console.log(`✅ ${hashedUsers.length} utilisateurs créés`);

    // Créer les services (un par un pour générer les slugs)
    console.log('🛠️  Création des services...');
    for (const service of services) {
      await Service.create(service);
    }
    console.log(`✅ ${services.length} services créés`);

    // Créer les portfolios (un par un pour générer les slugs)
    console.log('🎨 Création des portfolios...');
    for (const portfolio of portfolios) {
      await Portfolio.create(portfolio);
    }
    console.log(`✅ ${portfolios.length} portfolios créés`);

    // Créer les blogs (un par un pour générer les slugs)
    console.log('📝 Création des articles de blog...');
    const adminUser = await User.findOne({ email: 'admin@bedeew.digital' });
    for (const blog of blogs) {
      await Blog.create({ ...blog, author: adminUser._id });
    }
    console.log(`✅ ${blogs.length} articles de blog créés`);

    console.log('\n🎉 Base de données peuplée avec succès !');
    console.log('\n📊 Résumé :');
    console.log(`   - ${hashedUsers.length} utilisateurs`);
    console.log(`   - ${services.length} services`);
    console.log(`   - ${portfolios.length} projets portfolio`);
    console.log(`   - ${blogs.length} articles de blog`);
    console.log('\n🔐 Compte Admin :');
    console.log('   Email: admin@bedeew.digital');
    console.log('   Mot de passe: Admin123!');
    console.log('\n🔐 Compte Utilisateur :');
    console.log('   Email: john@example.com');
    console.log('   Mot de passe: User123!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
};

// Exécuter le seed
seedDatabase();
