import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const runScript = async (scriptPath, name) => {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 Exécution : ${name}`);
    console.log('='.repeat(60));
    
    const { stdout, stderr } = await execPromise(`node ${scriptPath}`);
    
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    
    console.log(`✅ ${name} terminé !`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur dans ${name}:`, error.message);
    return false;
  }
};

const enrichAll = async () => {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║     🎨 ENRICHISSEMENT COMPLET DU CONTENU BEDEEW 🎨        ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n');
  
  const scripts = [
    {
      path: 'src/scripts/enrichBlogContent.js',
      name: 'Article Marketing Digital'
    },
    {
      path: 'src/scripts/enrichServicesContent.js',
      name: 'Service Développement Web'
    },
    {
      path: 'src/scripts/enrichMarketingService.js',
      name: 'Service Marketing Digital'
    },
    {
      path: 'src/scripts/enrichDesignService.js',
      name: 'Service Design Graphique'
    }
  ];
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const script of scripts) {
    const success = await runScript(script.path, script.name);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
  
  // Résumé final
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                    📊 RÉSUMÉ FINAL                         ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n');
  console.log(`✅ Scripts réussis : ${successCount}/${scripts.length}`);
  console.log(`❌ Scripts échoués : ${errorCount}/${scripts.length}`);
  console.log('\n');
  
  if (successCount === scripts.length) {
    console.log('🎉🎉🎉 TOUS LES CONTENUS ONT ÉTÉ ENRICHIS AVEC SUCCÈS ! 🎉🎉🎉');
    console.log('\n');
    console.log('📋 PROCHAINES ÉTAPES :');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('1. ✅ Vérifiez le contenu dans l\'admin');
    console.log('   👉 https://bedeew.com/admin');
    console.log('\n');
    console.log('2. 🔨 Rebuild le frontend');
    console.log('   👉 cd D:\\Plateforme_Bedeew\\client');
    console.log('   👉 npm run build');
    console.log('\n');
    console.log('3. 📤 Uploadez avec FileZilla');
    console.log('   👉 Source : D:\\Plateforme_Bedeew\\client\\dist\\');
    console.log('   👉 Destination : /domains/bedeew.com/public_html/');
    console.log('\n');
    console.log('4. 🌐 Testez le site');
    console.log('   👉 https://bedeew.com');
    console.log('═══════════════════════════════════════════════════════════');
  } else {
    console.log('⚠️  Certains scripts ont échoué. Vérifiez les erreurs ci-dessus.');
    console.log('\n💡 Assurez-vous que :');
    console.log('   - Les articles/services existent dans l\'admin');
    console.log('   - MongoDB est accessible');
    console.log('   - Le fichier .env est configuré');
  }
  
  console.log('\n');
  process.exit(errorCount > 0 ? 1 : 0);
};

enrichAll();
