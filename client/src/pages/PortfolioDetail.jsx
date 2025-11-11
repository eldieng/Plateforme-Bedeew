import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Calendar, Tag, ExternalLink, Home, ChevronRight,
  TrendingUp, Users, Clock, Award, Code, Palette, CheckCircle,
  ArrowRight, Quote, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PortfolioDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      const [projectRes, similarRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/portfolio/slug/${slug}`),
        axios.get(`${import.meta.env.VITE_API_URL}/portfolio?limit=3`)
      ]);
      setProject(projectRes.data.data);
      setSimilarProjects(similarRes.data.data?.filter(p => p.slug !== slug) || []);
    } catch (error) {
      toast.error('Projet non trouvé');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section container text-center">
        <h1 className="text-3xl font-bold mb-4">Projet non trouvé</h1>
        <Link to="/portfolio" className="btn-primary">Retour au portfolio</Link>
      </div>
    );
  }

  // Utiliser les métriques depuis l'API
  const iconMap = {
    TrendingUp,
    Users,
    Clock,
    Award
  };

  const metrics = project?.metrics?.map(m => ({
    ...m,
    icon: iconMap[m.icon] || Award
  })) || [];

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
            <Link to="/portfolio" className="hover:text-primary-600 transition-colors">
              Portfolio
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">{project.title}</span>
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
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Tag size={16} />
              <span className="text-sm font-medium capitalize">{project.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-primary-100 mb-8">{project.description}</p>
            
            <div className="flex flex-wrap gap-6">
              {project.client?.name && (
                <div className="flex items-center space-x-2">
                  <Users className="text-primary-200" size={20} />
                  <span>Client: <strong>{project.client.name}</strong></span>
                </div>
              )}
              {project.completionDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="text-primary-200" size={20} />
                  <span>{new Date(project.completionDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                </div>
              )}
              {project.projectUrl && (
                <a 
                  href={project.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-primary-200 transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>Voir le site</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Galerie d'images */}
      <section className="section bg-white">
        <div className="container max-w-6xl">
          {project.images && project.images.length > 0 && (
            <div className="mb-12">
              {/* Image principale */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative h-[500px] rounded-2xl overflow-hidden mb-6 shadow-2xl"
              >
                <img 
                  src={project.images[selectedImage]?.url || project.images[0]?.url} 
                  alt={project.images[selectedImage]?.alt || project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Miniatures */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                        selectedImage === index 
                          ? 'ring-4 ring-primary-600 scale-105' 
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={image.url} 
                        alt={image.alt || `${project.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">À Propos du Projet</h2>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <p className="text-lg">{project.description}</p>
                  {project.longDescription && (
                    <p className="mt-4">{project.longDescription}</p>
                  )}
                </div>
              </div>

              {/* Défis & Solutions */}
              {project.challenges && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Défis & Solutions</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">{project.challenges}</p>
                  </div>
                </div>
              )}

              {/* Résultats / Métriques */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Résultats Obtenus</h3>
                <div className="grid grid-cols-2 gap-6">
                  {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 text-center"
                      >
                        <Icon className="mx-auto mb-3 text-primary-600" size={32} />
                        <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Témoignage client */}
              {project.client?.testimonial && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Témoignage Client</h3>
                  <div className="bg-primary-50 rounded-xl p-8 relative">
                    <Quote className="absolute top-6 right-6 text-primary-200" size={48} />
                    <p className="text-gray-700 italic leading-relaxed mb-6 text-lg">
                      "{project.client.testimonial}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                        {project.client.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{project.client.name}</div>
                        {project.client.position && (
                          <div className="text-sm text-gray-600">{project.client.position}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Détails techniques */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Code className="mr-2 text-primary-600" size={24} />
                    Détails Techniques
                  </h3>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Catégorie</span>
                      <span className="font-semibold text-gray-900 capitalize">{project.category}</span>
                    </div>
                    
                    {project.duration && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Durée</span>
                        <span className="font-semibold text-gray-900">{project.duration}</span>
                      </div>
                    )}

                    {project.teamSize && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Équipe</span>
                        <span className="font-semibold text-gray-900">{project.teamSize} personnes</span>
                      </div>
                    )}

                    {project.completionDate && (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-600">Livraison</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(project.completionDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">Un Projet Similaire ?</h3>
                  <p className="text-primary-100 mb-6">
                    Discutons de votre projet et créons quelque chose d'exceptionnel ensemble
                  </p>
                  <Link 
                    to="/devis" 
                    className="btn-lg bg-white text-primary-600 hover:bg-gray-100 w-full justify-center"
                  >
                    Demander un Devis
                  </Link>
                </div>

                {/* Partage */}
                {project.projectUrl && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Voir le Projet</h4>
                    <a 
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors font-medium"
                    >
                      <ExternalLink size={20} />
                      <span>Visiter le site</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projets similaires */}
      {similarProjects.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Projets Similaires
                </h2>
                <p className="text-gray-600">Découvrez d'autres réalisations</p>
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
              {similarProjects.slice(0, 3).map((proj, index) => (
                <motion.div
                  key={proj._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/portfolio/${proj.slug}`}>
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                      {proj.images && proj.images[0] ? (
                        <img 
                          src={proj.images[0].url} 
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white font-medium capitalize">
                            {proj.category}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">{proj.title}</h3>
                        <p className="text-white/80 text-sm line-clamp-2">{proj.description}</p>
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
            <Award size={64} className="mx-auto mb-6 text-primary-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transformons Votre Vision en Réalité
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Chaque projet est unique. Parlons du vôtre et créons ensemble quelque chose d'exceptionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/devis" 
                className="btn-lg bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center justify-center"
              >
                Démarrer un Projet
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link 
                to="/portfolio" 
                className="btn-lg border-2 border-white text-white hover:bg-white/10 inline-flex items-center justify-center"
              >
                Voir Plus de Projets
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetail;
