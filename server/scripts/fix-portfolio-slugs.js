import mongoose from 'mongoose';
import slugify from 'slugify';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

// Import Portfolio model
const portfolioSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  category: String,
  images: Array,
  published: Boolean
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

async function fixPortfolioSlugs() {
  try {
    console.log('🔌 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    // Récupérer tous les portfolios
    const portfolios = await Portfolio.find({});
    console.log(`📊 ${portfolios.length} projets trouvés\n`);

    let fixed = 0;
    let alreadyOk = 0;

    for (const portfolio of portfolios) {
      console.log(`\n📁 Projet: ${portfolio.title}`);
      console.log(`   ID: ${portfolio._id}`);
      console.log(`   Slug actuel: ${portfolio.slug || 'AUCUN'}`);
      
      // Générer un nouveau slug
      const newSlug = slugify(portfolio.title, { lower: true, strict: true });
      console.log(`   Slug généré: ${newSlug}`);

      if (!portfolio.slug || portfolio.slug !== newSlug) {
        // Mettre à jour le slug
        await Portfolio.findByIdAndUpdate(portfolio._id, { slug: newSlug });
        console.log(`   ✅ Slug mis à jour`);
        fixed++;
      } else {
        console.log(`   ✓ Slug déjà correct`);
        alreadyOk++;
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 RÉSUMÉ:`);
    console.log(`   - Projets corrigés: ${fixed}`);
    console.log(`   - Déjà corrects: ${alreadyOk}`);
    console.log(`   - Total: ${portfolios.length}`);
    console.log(`${'='.repeat(50)}\n`);

    // Afficher tous les slugs
    const updatedPortfolios = await Portfolio.find({}, 'title slug');
    console.log('📋 Liste des slugs:');
    updatedPortfolios.forEach(p => {
      console.log(`   - ${p.title}: /portfolio/${p.slug}`);
    });

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Déconnecté de MongoDB');
  }
}

fixPortfolioSlugs();
