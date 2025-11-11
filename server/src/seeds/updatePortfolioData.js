import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Portfolio from '../models/Portfolio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const updatePortfolios = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas');

    console.log('📝 Mise à jour des portfolios...');
    
    const portfolios = await Portfolio.find({});
    
    const metrics = [
      { label: 'Augmentation du trafic', value: '+150%', icon: 'TrendingUp' },
      { label: 'Nouveaux utilisateurs', value: '+2.5K', icon: 'Users' },
      { label: 'Temps de chargement', value: '-40%', icon: 'Clock' },
      { label: 'Taux de satisfaction', value: '98%', icon: 'Award' }
    ];

    for (const portfolio of portfolios) {
      // Ajouter des données supplémentaires
      portfolio.duration = '6 semaines';
      portfolio.teamSize = 4;
      portfolio.longDescription = `Ce projet ambitieux a nécessité une approche complète et stratégique. ${portfolio.description} Nous avons travaillé en étroite collaboration avec le client pour créer une solution sur mesure qui répond parfaitement à leurs besoins spécifiques.`;
      portfolio.challenges = 'Le principal défi était de créer une expérience utilisateur fluide tout en intégrant des fonctionnalités complexes. Nous avons surmonté ces obstacles grâce à une architecture technique solide et des tests utilisateurs réguliers.';
      portfolio.metrics = metrics;
      
      // Ajouter un témoignage client
      if (portfolio.client && portfolio.client.name) {
        portfolio.client.testimonial = `Travailler avec Bedeew Digital a été une expérience exceptionnelle. L'équipe a fait preuve d'un grand professionnalisme et a livré un produit qui a dépassé toutes nos attentes. Nous recommandons vivement leurs services !`;
        portfolio.client.position = 'Directeur Général';
      }
      
      await portfolio.save();
      console.log(`✅ Portfolio "${portfolio.title}" mis à jour`);
    }

    console.log('\n🎉 Tous les portfolios ont été mis à jour avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

updatePortfolios();
