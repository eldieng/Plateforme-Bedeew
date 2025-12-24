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

// Tous les contenus enrichis
const allServicesData = {
  'developpement-web': {
    title: 'Développement Web Professionnel',
    shortDescription: 'Création de sites web modernes, performants et optimisés pour convertir vos visiteurs en clients.',
    keywords: ['développement', 'web', 'site'],
    // ... (contenu du fichier enrichServicesContent.js)
  },
  'marketing-digital': {
    title: 'Marketing Digital & Stratégie',
    shortDescription: 'Stratégies marketing sur mesure pour augmenter votre visibilité en ligne et attirer plus de clients qualifiés.',
    keywords: ['marketing', 'digital', 'stratégie'],
    // ... (contenu du fichier enrichMarketingService.js)
  },
  'design-graphique': {
    title: 'Design Graphique & Identité Visuelle',
    shortDescription: 'Création d\'identités visuelles uniques et percutantes qui reflètent l\'essence de votre marque.',
    keywords: ['design', 'graphique', 'identité', 'logo'],
    // ... (contenu du fichier enrichDesignService.js)
  }
};

const enrichAllServices = async () => {
  try {
    await connectDB();
    
    console.log('🚀 Démarrage de l\'enrichissement de tous les services...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    // Enrichir chaque service
    for (const [slug, data] of Object.entries(allServicesData)) {
      try {
        console.log(`🔍 Recherche du service : ${data.title}...`);
        
        // Chercher le service par mots-clés
        const regexPattern = data.keywords.join('|');
        const service = await Service.findOne({
          $or: [
            { slug: { $regex: new RegExp(regexPattern, 'i') } },
            { title: { $regex: new RegExp(regexPattern, 'i') } }
          ]
        });
        
        if (!service) {
          console.log(`⚠️  Service "${data.title}" non trouvé - Ignoré\n`);
          errorCount++;
          continue;
        }
        
        console.log(`✅ Service trouvé : "${service.title}"`);
        console.log('📝 Mise à jour du contenu...');
        
        // Mettre à jour le service
        service.title = data.title;
        service.shortDescription = data.shortDescription;
        if (data.description) service.description = data.description;
        if (data.processSteps) service.processSteps = data.processSteps;
        if (data.faqs) service.faqs = data.faqs;
        if (data.testimonials) service.testimonials = data.testimonials;
        service.published = true;
        service.featured = true;
        
        await service.save();
        
        console.log(`✅ Service "${data.title}" enrichi avec succès !`);
        console.log(`📊 Stats : ${data.description?.length || 0} caractères, ${data.processSteps?.length || 0} étapes, ${data.faqs?.length || 0} FAQs, ${data.testimonials?.length || 0} témoignages\n`);
        
        successCount++;
      } catch (error) {
        console.error(`❌ Erreur pour "${data.title}":`, error.message, '\n');
        errorCount++;
      }
    }
    
    // Résumé
    console.log('═══════════════════════════════════════');
    console.log('📊 RÉSUMÉ DE L\'ENRICHISSEMENT');
    console.log('═══════════════════════════════════════');
    console.log(`✅ Services enrichis : ${successCount}`);
    console.log(`❌ Erreurs : ${errorCount}`);
    console.log(`📝 Total traité : ${successCount + errorCount}`);
    console.log('═══════════════════════════════════════\n');
    
    if (successCount > 0) {
      console.log('🎉 Enrichissement terminé avec succès !');
      console.log('\n📋 Prochaines étapes :');
      console.log('1. Vérifiez le contenu dans l\'admin : https://bedeew.com/admin');
      console.log('2. Rebuild le frontend : npm run build');
      console.log('3. Uploadez sur le serveur avec FileZilla\n');
    }
    
    process.exit(errorCount > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Erreur globale:', error);
    process.exit(1);
  }
};

enrichAllServices();
