import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, CheckCircle, Clock, DollarSign, Users, 
  Star, ChevronDown, ChevronUp, ArrowRight, Quote,
  Home, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
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
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-primary-100 mb-8">{service.shortDescription}</p>
            
            <div className="flex flex-wrap gap-6">
              {service.pricing?.startingPrice && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-primary-200" size={20} />
                  <span className="text-lg">
                    À partir de <strong>{service.pricing.startingPrice.toLocaleString()} {service.pricing.currency}</strong>
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Clock className="text-primary-200" size={20} />
                <span className="text-lg">4-8 semaines</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-primary-200" size={20} />
                <span className="text-lg">Support inclus</span>
              </div>
            </div>
          </motion.div>
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
                    Notre équipe est là pour répondre à toutes vos questions
                  </p>
                  <a 
                    href="tel:+221XXXXXXXXX" 
                    className="text-primary-600 font-semibold hover:underline"
                  >
                    +221 XX XXX XX XX
                  </a>
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
