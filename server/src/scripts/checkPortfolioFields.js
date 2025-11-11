import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const checkFields = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas\n');

    const portfolios = await mongoose.connection.db.collection('portfolios').find({}).limit(3).toArray();
    
    console.log('📊 Vérification des champs Portfolio:\n');
    
    portfolios.forEach((portfolio, index) => {
      console.log(`${index + 1}. ${portfolio.title}`);
      console.log(`   _id: ${portfolio._id}`);
      console.log(`   slug: ${portfolio.slug || '❌ MANQUANT'}`);
      console.log(`   category: ${portfolio.category || '❌ MANQUANT'}`);
      console.log(`   description: ${portfolio.description ? '✅' : '❌ MANQUANT'}`);
      console.log(`   images: ${portfolio.images ? `✅ (${portfolio.images.length})` : '❌ MANQUANT'}`);
      console.log(`   Tous les champs:`, Object.keys(portfolio));
      console.log('');
    });

    console.log('\n🎉 Vérification terminée !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

checkFields();
