import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Code, Palette, TrendingUp, Search, Video, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    code: Code,
    palette: Palette,
    'trending-up': TrendingUp,
    search: Search,
    video: Video,
    smartphone: Smartphone,
  };

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <section className="section bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Des solutions digitales complètes pour propulser votre entreprise vers le succès
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <div key={service._id} className="card p-8 hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.shortDescription}</p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    En savoir plus →
                  </Link>
                </div>
              );
            })}
          </div>

          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun service disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Besoin d'un Service Personnalisé ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos besoins spécifiques
          </p>
          <Link to="/contact" className="btn-lg bg-white text-primary-600 hover:bg-gray-100">
            Demander un devis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
