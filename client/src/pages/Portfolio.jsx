import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, ArrowRight, ExternalLink, Sparkles, Layers, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    { value: 'all', label: 'Tous', icon: Layers },
    { value: 'web', label: 'Web', icon: null },
    { value: 'mobile', label: 'Mobile', icon: null },
    { value: 'design', label: 'Design', icon: null },
    { value: 'seo', label: 'SEO', icon: null },
    { value: 'social-media', label: 'Réseaux Sociaux', icon: null },
    { value: 'video', label: 'Vidéo', icon: null },
  ];

  useEffect(() => {
    fetchPortfolios();
  }, [filter]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { category: filter } : {};
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/portfolio`, { params });
      setPortfolios(res.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement du portfolio');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Notre Portfolio"
        description="Découvrez nos réalisations digitales à Dakar : sites web, applications, designs et campagnes marketing. Projets réussis pour des clients au Sénégal et en Afrique."
        keywords="portfolio digital Dakar, réalisations web Sénégal, projets digitaux Dakar, agence web portfolio"
        url="/portfolio"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-600 via-primary-600 to-primary-700 text-white py-24 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles size={18} className="text-yellow-300" />
              <span className="text-sm font-medium">Nos réalisations</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Notre Portfolio
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Créatif
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Découvrez nos projets réussis et laissez-vous inspirer par notre expertise digitale
            </p>
          </motion.div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 55C480 50 600 70 720 80C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50 sticky top-0 z-40">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="hidden sm:flex items-center px-4 text-gray-400">
                <Filter size={18} />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.value}
                    onClick={() => setFilter(cat.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                      filter === cat.value
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600"></div>
                <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-600" size={24} />
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {portfolios.map((item, index) => {
                  const primaryImage = item.images?.find(img => img.isPrimary) || item.images?.[0];
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredItem(item._id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group"
                    >
                      <Link to={`/portfolio/${item.slug}`} className="block">
                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                          {/* Image Container */}
                          <div className="relative h-72 overflow-hidden">
                            {primaryImage ? (
                              <img
                                src={primaryImage.url}
                                alt={primaryImage.alt || item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                <Layers size={48} className="text-white/50" />
                              </div>
                            )}
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center space-x-3">
                                  <span className="inline-flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                                    <Eye size={16} />
                                    <span>Voir le projet</span>
                                  </span>
                                  {item.projectUrl && (
                                    <span className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                                      <ExternalLink size={18} />
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 capitalize shadow-sm">
                                {item.category}
                              </span>
                            </div>

                            {/* Featured Badge */}
                            {item.featured && (
                              <div className="absolute top-4 right-4">
                                <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-xs font-semibold text-white shadow-sm">
                                  ⭐ Featured
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 line-clamp-2 mb-4">
                              {item.description}
                            </p>

                            {/* Tags */}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.slice(0, 3).map((tag, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* CTA */}
                            <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                              <span>Découvrir</span>
                              <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && portfolios.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Layers size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-600">Aucun projet disponible dans cette catégorie pour le moment.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Transformons ensemble votre vision en réalité digitale. Contactez-nous pour discuter de votre projet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/devis"
                className="group inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Démarrer un projet</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <span>Nous contacter</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
