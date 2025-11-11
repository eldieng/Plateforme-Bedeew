import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'design', label: 'Design' },
    { value: 'seo', label: 'SEO' },
    { value: 'social-media', label: 'Réseaux Sociaux' },
    { value: 'video', label: 'Vidéo' },
  ];

  useEffect(() => {
    fetchPortfolios();
  }, [filter]);

  const fetchPortfolios = async () => {
    try {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Découvrez nos réalisations et projets réussis
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === cat.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((item) => {
              const primaryImage = item.images?.find(img => img.isPrimary) || item.images?.[0];
              return (
                <Link
                  key={item._id}
                  to={`/portfolio/${item.slug}`}
                  className="card overflow-hidden group"
                >
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    {primaryImage && (
                      <img
                        src={primaryImage.url}
                        alt={primaryImage.alt || item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-medium mb-2">
                      {item.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {portfolios.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun projet disponible dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
