import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, CheckCircle, Clock, DollarSign, Users, 
  Star, ChevronDown, ChevronUp, ArrowRight, Quote,
  Home, ChevronRight, Sparkles, Shield, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchService();
  }, [slug]);

  const fetchService = async () => {
    try {
      const [serviceRes, projectsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/services/slug/${slug}`),
        axios.get(`${import.meta.env.VITE_API_URL}/portfolio?limit=3`)
      ]);
      setService(serviceRes.data.data);
      setRelatedProjects(projectsRes.data.data || []);
    } catch (error) {
      toast.error('Service non trouvé');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Utiliser les données du service depuis l'API
  const processSteps = service?.processSteps || [];
  const faqs = service?.faqs || [];
  const testimonials = service?.testimonials || [];

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

  if (!service) {
    return (
      <div className="section container text-center">
        <h1 className="text-3xl font-bold mb-4">Service non trouvé</h1>
        <Link to="/services" className="btn-primary">Retour aux services</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={service.title}
        description={`${service.shortDescription} - Service professionnel à Dakar, Sénégal. Obtenez un devis gratuit.`}
        keywords={`${service.title} Dakar, ${service.category || 'service digital'} Sénégal`}
        url={`/services/${service.slug}`}
        image={service.image?.url}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600 transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={16} />
            <Link to="/services" className="hover:text-primary-600 transition-colors">
              Services
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 lg:py-28">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles size={18} className="text-yellow-300" />
              <span className="text-sm font-medium">Service professionnel</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{service.title}</h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-10">{service.shortDescription}</p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                <Clock className="text-yellow-300" size={20} />
                <span>Délai selon projet</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                <Shield className="text-yellow-300" size={20} />
                <span>Support inclus</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                <Zap className="text-yellow-300" size={20} />
                <span>Devis gratuit</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Description détaillée */}
      <section className="section bg-white">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Description</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
                <p className="text-lg">{service.fullDescription}</p>
              </div>

              {/* Fonctionnalités */}
              {service.features && service.features.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Ce qui est inclus</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white border-2 border-primary-200 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Prêt à démarrer ?</h3>
                  <p className="text-gray-600 mb-6">
                    Obtenez un devis personnalisé pour votre projet
                  </p>
                  <Link 
                    to="/devis" 
                    className="btn-primary w-full justify-center mb-3"
                  >
                    Demander un Devis
                  </Link>
                  <Link 
                    to="/contact" 
                    className="btn-outline w-full justify-center"
                  >
                    Nous Contacter
                  </Link>
                </div>

                <div className="bg-primary-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Besoin d'aide ?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Notre équipe à Dakar est là pour répondre à toutes vos questions
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="tel:+221770555445" 
                      className="block text-primary-600 font-semibold hover:underline"
                    >
                      📞 77 055 54 45
                    </a>
                    <a 
                      href="tel:+221774548661" 
                      className="block text-primary-600 font-semibold hover:underline"
                    >
                      📞 77 454 86 61
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus de travail */}
      <section className="section bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Processus de Travail
            </h2>
            <p className="text-xl text-gray-600">
              Une méthodologie éprouvée pour garantir votre succès
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform -translate-x-1/2"></div>

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
                }`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock size={14} className="mr-1" />
                          {step.duration}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:block absolute top-8 left-1/2 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-1/2 border-4 border-white"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce Que Disent Nos Clients
            </h2>
            <p className="text-xl text-gray-600">
              Des résultats concrets et des clients satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 relative"
              >
                <Quote className="absolute top-6 right-6 text-primary-200" size={48} />
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="text-primary-600 flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projets liés */}
      {relatedProjects.length > 0 && (
        <section className="section bg-white">
          <div className="container max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Projets Similaires
                </h2>
                <p className="text-gray-600">Découvrez nos réalisations</p>
              </div>
              <Link 
                to="/portfolio" 
                className="hidden md:inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
              >
                Voir tout
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/portfolio/${project.slug}`}>
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                      {project.images && project.images[0] ? (
                        <img 
                          src={project.images[0].url} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                        <p className="text-white/80 text-sm">{project.category}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link to="/portfolio" className="btn-outline">
                Voir tous les projets
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contactez-nous dès aujourd'hui pour obtenir un devis gratuit et personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/devis" 
                className="btn-lg bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center justify-center"
              >
                Demander un Devis
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link 
                to="/contact" 
                className="btn-lg border-2 border-white text-white hover:bg-white/10 inline-flex items-center justify-center"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
