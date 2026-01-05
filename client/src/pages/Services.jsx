import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Code, Palette, TrendingUp, Search, Video, Smartphone, ArrowRight, Sparkles, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredService, setHoveredService] = useState(null);

  const iconMap = {
    code: Code,
    palette: Palette,
    'trending-up': TrendingUp,
    search: Search,
    video: Video,
    smartphone: Smartphone,
  };

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-teal-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      setServices(res.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des services');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-600" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-24 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
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
              <span className="text-sm font-medium">Solutions digitales sur mesure</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Nos Services Digitaux
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                à Dakar
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-10">
              Des solutions innovantes pour propulser votre entreprise vers le succès numérique au Sénégal
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/devis" 
                className="group inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Demander un devis</span>
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

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que nous offrons
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des services complets pour répondre à tous vos besoins digitaux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              const gradient = gradients[index % gradients.length];
              
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredService(service._id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                  
                  <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Features Preview */}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-6 space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-500">
                            <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                            <span className="truncate">{feature.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* CTA */}
                    <Link
                      to={`/services/${service.slug}`}
                      className={`inline-flex items-center space-x-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradient} group-hover:space-x-3 transition-all duration-300`}
                    >
                      <span>Découvrir</span>
                      <ArrowRight size={18} className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient}`} style={{stroke: 'url(#gradient)'}} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {services.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">Aucun service disponible pour le moment.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projets réalisés' },
              { number: '30+', label: 'Clients satisfaits' },
              { number: '5+', label: 'Années d\'expérience' },
              { number: '100%', label: 'Satisfaction client' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
            <div className="inline-flex items-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à transformer votre présence digitale ?
            </h2>
            
            <p className="text-xl text-primary-100 mb-10">
              Contactez notre équipe à Dakar pour discuter de votre projet et obtenir un devis personnalisé gratuit
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/devis" 
                className="group inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Obtenir un devis gratuit</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="tel:+221770555445" 
                className="inline-flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <span>📞 77 055 54 45</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
