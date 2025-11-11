import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, Eye, Search, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/portfolio`);
      setPortfolios(res.data.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des réalisations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/portfolio/${id}`);
      toast.success('Réalisation supprimée avec succès');
      fetchPortfolios();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portfolio.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Réalisations</h1>
          <p className="text-gray-600">{portfolios.length} réalisation(s) au total</p>
        </div>
        <Link
          to="/admin/portfolio/create"
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Créer une Réalisation</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher une réalisation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolios.length > 0 ? (
          filteredPortfolios.map((portfolio) => (
            <div key={portfolio._id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {portfolio.images && portfolio.images[0] ? (
                  <img
                    src={portfolio.images[0].url}
                    alt={portfolio.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500"></div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-900 capitalize">
                    {portfolio.category}
                  </span>
                  {portfolio.featured && (
                    <span className="px-2 py-1 bg-yellow-400 rounded text-xs font-medium text-gray-900 flex items-center space-x-1">
                      <Star size={12} />
                      <span>Vedette</span>
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    portfolio.published
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {portfolio.published ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                  {portfolio.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {portfolio.description}
                </p>

                {/* Technologies */}
                {portfolio.technologies && portfolio.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {portfolio.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {portfolio.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{portfolio.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/portfolio/${portfolio.slug}`}
                      target="_blank"
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Voir"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/admin/portfolio/edit/${portfolio._id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(portfolio._id, portfolio.title)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {portfolio.client?.name && (
                    <span className="text-xs text-gray-500">
                      {portfolio.client.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            {searchTerm ? 'Aucune réalisation trouvée' : 'Aucune réalisation pour le moment'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
