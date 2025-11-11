import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Service from '../models/Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const checkData = async () => {
  try {
    console.log('🔗 Connexion à:', process.env.MONGODB_URI?.substring(0, 80) + '...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas');
    console.log('📊 Base de données:', conn.connection.name);

    const services = await Service.find({});
    console.log(`\n📊 Nombre de services trouvés: ${services.length}`);
    
    if (services.length > 0) {
      console.log('\n✅ Services dans la base:');
      services.forEach((service, index) => {
        console.log(`${index + 1}. ${service.title} (${service.slug})`);
      });
    } else {
      console.log('\n❌ Aucun service trouvé dans la base de données!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

checkData();
