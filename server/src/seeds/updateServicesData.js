import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Service from '../models/Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const processSteps = [
  {
    number: '01',
    title: 'Analyse & Consultation',
    description: 'Nous étudions vos besoins et définissons ensemble les objectifs du projet.',
    duration: '1-2 jours'
  },
  {
    number: '02',
    title: 'Planification',
    description: 'Création d\'un plan détaillé avec timeline et jalons du projet.',
    duration: '2-3 jours'
  },
  {
    number: '03',
    title: 'Développement',
    description: 'Réalisation du projet avec des points de contrôle réguliers.',
    duration: '2-6 semaines'
  },
  {
    number: '04',
    title: 'Tests & Validation',
    description: 'Tests approfondis et ajustements selon vos retours.',
    duration: '3-5 jours'
  },
  {
    number: '05',
    title: 'Livraison & Support',
    description: 'Mise en ligne et accompagnement post-lancement.',
    duration: '1-2 jours'
  }
];

const faqs = [
  {
    question: 'Quel est le délai de réalisation ?',
    answer: 'Le délai varie selon la complexité du projet. En moyenne, comptez 4 à 8 semaines pour un projet standard. Nous vous fournirons un planning détaillé après l\'analyse de vos besoins.'
  },
  {
    question: 'Proposez-vous un suivi après la livraison ?',
    answer: 'Oui, nous offrons un support technique de 30 jours inclus après la livraison. Des formules de maintenance mensuelle sont également disponibles.'
  },
  {
    question: 'Puis-je modifier mon projet en cours de route ?',
    answer: 'Oui, nous sommes flexibles. Les modifications mineures sont incluses. Pour des changements majeurs, nous ajusterons le devis et le planning en conséquence.'
  },
  {
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons les virements bancaires, Mobile Money (Orange Money, Wave) et les paiements échelonnés selon le montant du projet.'
  },
  {
    question: 'Fournissez-vous la formation ?',
    answer: 'Oui, nous proposons une formation complète pour vous permettre de gérer votre solution en toute autonomie. Des sessions de formation supplémentaires peuvent être organisées si nécessaire.'
  }
];

const testimonials = [
  {
    name: 'Amadou Diallo',
    company: 'E-commerce Fashion',
    text: 'Excellente collaboration ! L\'équipe a su comprendre nos besoins et livrer un site qui dépasse nos attentes. Les ventes ont augmenté de 60% depuis le lancement.',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Amadou+Diallo&background=0D8ABC&color=fff'
  },
  {
    name: 'Fatou Sow',
    company: 'Restaurant Le Palmier',
    text: 'Professionnels et réactifs. Notre nouveau site a boosté nos réservations de 40% en 2 mois ! Le design est magnifique et très facile à utiliser.',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Fatou+Sow&background=10b981&color=fff'
  }
];

const updateServices = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas');

    console.log('📝 Mise à jour des services...');
    
    const services = await Service.find({});
    
    for (const service of services) {
      service.processSteps = processSteps;
      service.faqs = faqs;
      service.testimonials = testimonials;
      await service.save();
      console.log(`✅ Service "${service.title}" mis à jour`);
    }

    console.log('\n🎉 Tous les services ont été mis à jour avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

updateServices();
