import { motion } from 'framer-motion';
import { 
  Users, Target, Award, Heart, Zap, Shield, TrendingUp, 
  Sparkles, Rocket, Star, CheckCircle, ArrowRight 
} from 'lucide-react';

const About = () => {
  const stats = [
    { value: '50+', label: 'Projets Réalisés', icon: Rocket },
    { value: '30+', label: 'Clients Satisfaits', icon: Users },
    { value: '5+', label: 'Années d\'Expérience', icon: Award },
    { value: '100%', label: 'Satisfaction Client', icon: Star },
  ];

  const values = [
    { 
      icon: Target, 
      title: 'Excellence', 
      description: 'Nous visons l\'excellence dans chaque projet, en dépassant les attentes de nos clients',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Users, 
      title: 'Collaboration', 
      description: 'Nous travaillons en étroite collaboration avec nos clients pour co-créer des solutions',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Zap, 
      title: 'Innovation', 
      description: 'Nous adoptons les dernières technologies pour rester à la pointe de l\'innovation',
      color: 'from-orange-500 to-red-500'
    },
    { 
      icon: Heart, 
      title: 'Passion', 
      description: 'Nous sommes passionnés par ce que nous faisons et cela se reflète dans notre travail',
      color: 'from-green-500 to-teal-500'
    },
  ];

  const services = [
    {
      title: 'Communication & Marketing Digital',
      description: 'Stratégies digitales complètes pour booster votre présence en ligne',
      features: ['Réseaux sociaux', 'SEO/SEA', 'Content Marketing', 'Branding']
    },
    {
      title: 'Formations Gratuites',
      description: 'Programmes de formation orientés métiers du digital',
      features: ['Développement Web', 'Design', 'Marketing Digital', 'E-commerce']
    },
    {
      title: 'Recrutement Digital',
      description: 'Plateforme de mise en relation candidats-entreprises',
      features: ['Offres d\'emploi', 'Matching IA', 'Gestion candidatures', 'Suivi RH']
    },
  ];

  const team = [
    {
      name: 'Équipe Créative',
      description: 'Designers et créatifs passionnés',
      icon: Sparkles
    },
    {
      name: 'Équipe Technique',
      description: 'Développeurs experts',
      icon: Zap
    },
    {
      name: 'Équipe Marketing',
      description: 'Stratèges digitaux',
      icon: TrendingUp
    },
    {
      name: 'Support Client',
      description: 'Assistance 24/7',
      icon: Shield
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Ultra Moderne */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-secondary-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6bTAgMjRjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Sparkles className="text-yellow-400" size={20} />
              <span className="text-white font-medium">Votre Partenaire Digital au Sénégal</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              À Propos de
              <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Bedeew Digital
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              Communication • Formation • Recrutement
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#mission" className="btn-primary btn-lg">
                Découvrir Notre Mission
                <ArrowRight className="ml-2" size={20} />
              </a>
              <a href="/contact" className="btn-outline-white btn-lg">
                Nous Contacter
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="text-white" size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="section bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
                <Target size={20} />
                <span className="text-sm font-semibold">Notre Mission</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transformer le Digital au Sénégal
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                <strong>Bedeew Digital</strong> est une plateforme digitale innovante qui centralise trois piliers essentiels : 
                une agence de communication et marketing digital, un espace de formations gratuites orientées 
                métiers du digital, et un module de recrutement mettant en relation candidats et entreprises.
              </p>
              
              <p className="text-lg text-gray-600 mb-8">
                Notre objectif est de <strong>démocratiser l'accès aux services digitaux de qualité</strong>, de faciliter 
                l'apprentissage des compétences numériques et d'améliorer l'employabilité des jeunes au Sénégal.
              </p>

              <div className="space-y-4">
                {['Innovation Continue', 'Excellence Opérationnelle', 'Impact Social'].map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" 
                  alt="Team collaboration" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Clients Satisfaits</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
              <Heart size={20} />
              <span className="text-sm font-semibold">Nos Valeurs</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ce Qui Nous Anime
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des valeurs fortes qui guident chacune de nos actions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  
                  {/* Decorative Element */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${value.color} opacity-10 rounded-bl-full`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Trois Piliers
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Une plateforme complète pour répondre à tous vos besoins digitaux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-primary-100 mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Users size={20} />
              <span className="text-sm font-semibold">Notre Équipe</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Une Équipe Passionnée
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts dédiés à votre succès
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <member.icon size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui et transformons ensemble vos idées en réalité
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-white btn-lg">
                Nous Contacter
                <ArrowRight className="ml-2" size={20} />
              </a>
              <a href="/portfolio" className="btn-outline-white btn-lg">
                Voir Nos Réalisations
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
