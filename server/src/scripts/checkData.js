import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const checkData = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas\n');

    const collections = [
      { name: 'services', model: 'Service' },
      { name: 'portfolios', model: 'Portfolio' },
      { name: 'blogs', model: 'Blog' },
      { name: 'users', model: 'User' },
      { name: 'contacts', model: 'Contact' }
    ];

    console.log('📊 Vérification des données:\n');
    
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`✅ ${col.model.padEnd(15)} : ${count} document(s)`);
    }

    // Détail des contacts (Messages vs Devis)
    const messages = await mongoose.connection.db.collection('contacts').countDocuments({ isQuote: false });
    const quotes = await mongoose.connection.db.collection('contacts').countDocuments({ isQuote: true });
    console.log(`\n📧 Détail Contacts:`);
    console.log(`   - Messages      : ${messages} document(s)`);
    console.log(`   - Devis         : ${quotes} document(s)`);

    console.log('\n🎉 Vérification terminée !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

checkData();
