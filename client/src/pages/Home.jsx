import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, Code, Palette, TrendingUp, Users, Award, CheckCircle, 
  Video, Smartphone, Search, Target, Zap, Heart, Star, Eye, Calendar,
  ExternalLink, Sparkles, Rocket, Shield, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Pour debug
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    code: Code,
    palette: Palette,
    'trending-up': TrendingUp,
    video: Video,
    smartphone: Smartphone,
    search: Search,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, portfoliosRes, blogsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/services?limit=3`),
        axios.get(`${import.meta.env.VITE_API_URL}/portfolio?limit=3`),
        axios.get(`${import.meta.env.VITE_API_URL}/blog?limit=3`),
      ]);
      
      const portfolioData = portfoliosRes.data.data || [];
      console.log('Portfolios chargés:', portfolioData);
      console.log('Premier portfolio:', portfolioData[0]);
      console.log('Slug du premier:', portfolioData[0]?.slug);
      
      setServices(servicesRes.data.data || []);
      setPortfolios(portfolioData);
      setBlogs(blogsRes.data.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast.error('Erreur lors du chargement des données');
      // Initialiser avec des tableaux vides en cas d'erreur
      setServices([]);
      setPortfolios([]);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { value: '50+', label: 'Projets Réalisés' },
    { value: '30+', label: 'Clients Satisfaits' },
    { value: '5+', label: 'Années d\'Expérience' },
    { value: '100%', label: 'Satisfaction Client' },
  ];

  const features = [
    'Équipe d\'experts qualifiés',
    'Méthodologie agile',
    'Support technique 24/7',
    'Prix compétitifs',
    'Délais respectés',
    'Qualité garantie',
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - Ultra Moderne */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-secondary-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6bTAgMjRjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="text-yellow-400" size={20} />
                <span className="text-white text-sm font-medium">Votre Partenaire Digital au Sénégal</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Transformez Votre
                <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Vision Digitale
                </span>
                en Réalité
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Agence de communication digitale, formations gratuites et plateforme de recrutement. 
                Nous propulsons votre entreprise vers le succès numérique.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/devis" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Rocket className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                  Démarrer un Projet
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link 
                  to="/services" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Découvrir nos Services
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-sm text-gray-400">Projets Réalisés</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">30+</div>
                  <div className="text-sm text-gray-400">Clients Satisfaits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - 3D Card Effect */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Floating Cards */}
                <div className="relative h-[600px]">
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-0 right-0 w-64 h-80 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-2xl p-6 transform rotate-6"
                  >
                    <div className="text-white">
                      <Code size={48} className="mb-4" />
                      <h3 className="text-xl font-bold mb-2">Développement</h3>
                      <p className="text-sm opacity-90">Sites web & applications mobiles performants</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute top-32 left-0 w-64 h-80 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-2xl shadow-2xl p-6 transform -rotate-6"
                  >
                    <div className="text-white">
                      <Palette size={48} className="mb-4" />
                      <h3 className="text-xl font-bold mb-2">Design</h3>
                      <p className="text-sm opacity-90">Créations visuelles qui captivent</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-0 right-12 w-64 h-80 bg-gradient-to-br from-pink-500 to-purple-700 rounded-2xl shadow-2xl p-6"
                  >
                    <div className="text-white">
                      <TrendingUp size={48} className="mb-4" />
                      <h3 className="text-xl font-bold mb-2">Marketing</h3>
                      <p className="text-sm opacity-90">Stratégies qui convertissent</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Section À Propos */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Award size={80} className="mx-auto mb-6" />
                    <h3 className="text-4xl font-bold mb-4">5+ Années</h3>
                    <p className="text-xl">d'Excellence Digitale</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Clients Satisfaits</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
                <Heart size={20} />
                <span className="text-sm font-semibold">À Propos de Nous</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Votre Partenaire Digital de Confiance
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong className="text-gray-900">Bedeew Digital</strong> est une plateforme innovante qui centralise 
                trois piliers essentiels : une agence de communication digitale, un espace de formations gratuites 
                et un module de recrutement.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Notre mission est de démocratiser l'accès aux services digitaux de qualité, faciliter l'apprentissage 
                des compétences numériques et améliorer l'employabilité au Sénégal.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Target, text: 'Expertise Reconnue' },
                  { icon: Zap, text: 'Résultats Rapides' },
                  { icon: Shield, text: 'Qualité Garantie' },
                  { icon: Heart, text: 'Support Dédié' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary-600" size={20} />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/about" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 group"
              >
                En Savoir Plus
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Vedettes */}
      <section className="section bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <Star size={20} />
              <span className="text-sm font-semibold">Nos Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Services Vedettes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions digitales complètes pour propulser votre entreprise vers le succès
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 3).map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  
                  {/* CTA */}
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors"
                  >
                    En savoir plus
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link 
              to="/services" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 group"
            >
              Voir Tous nos Services
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Réalisations / Portfolio */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full mb-6">
              <Eye size={20} />
              <span className="text-sm font-semibold">Nos Réalisations</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Projets qui Inspirent
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos dernières créations et laissez-vous inspirer par notre travail
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {portfolios.slice(0, 3).map((project, index) => {
              console.log(`Projet ${index}:`, project.title, 'Slug:', project.slug);
              return (
              <Link
                key={project._id}
                to={project.slug ? `/portfolio/${project.slug}` : '#'}
                onClick={(e) => {
                  console.log('Clic sur carte projet:', {
                    title: project.title,
                    slug: project.slug,
                    id: project._id
                  });
                  if (!project.slug) {
                    e.preventDefault();
                    toast.error('Ce projet n\'a pas de lien disponible');
                  }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                  {project.images && project.images[0] ? (
                    <img 
                      src={project.images[0].url} 
                      alt={project.images[0].alt || project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-200 mb-4 line-clamp-2">{project.description}</p>
                    <div className="inline-flex items-center text-white font-semibold">
                      Voir le projet
                      <ExternalLink size={16} className="ml-2" />
                    </div>
                  </div>
                </div>

                {/* Card Content (visible by default) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-200">{project.category}</p>
                </div>
              </motion.div>
            </Link>
            );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link 
              to="/portfolio" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-secondary-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 group"
            >
              Voir Toutes nos Réalisations
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog / Articles */}
      <section className="section bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
              <Calendar size={20} />
              <span className="text-sm font-semibold">Blog & Actualités</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Derniers Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conseils, tendances et actualités du monde digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogs.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={article.image?.url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'} 
                    alt={article.image?.alt || article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 capitalize">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{article.readTime} min</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <Link 
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors"
                  >
                    Lire la suite
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link 
              to="/blog"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 group"
            >
              Voir Tous les Articles
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="section bg-gradient-to-br from-gray-900 via-primary-900 to-secondary-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Rocket size={64} className="mx-auto mb-6 text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à Transformer Votre Présence Digitale ?
            </h2>
            <p className="text-xl mb-10 text-gray-300 leading-relaxed">
              Rejoignez les entreprises qui nous font confiance et propulsez votre business vers de nouveaux sommets. 
              Obtenez un devis gratuit dès aujourd'hui !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/devis" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Rocket className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                Démarrer un Projet
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link 
                to="/portfolio" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Voir nos Réalisations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
