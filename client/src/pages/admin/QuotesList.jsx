import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Eye, Trash2, Mail, Phone, Calendar, DollarSign, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const QuotesList = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact?isQuote=true`);
      setQuotes(res.data.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des devis');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/contact/${id}`);
      toast.success('Demande supprimée avec succès');
      fetchQuotes();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.projectType?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Demandes de Devis</h1>
        <p className="text-gray-600">{quotes.length} demande(s) au total</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher une demande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Quotes List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <tr key={quote._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{quote.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Mail size={14} />
                          <span>{quote.email}</span>
                        </div>
                        {quote.phone && (
                          <div className="text-sm text-gray-500 flex items-center space-x-1">
                            <Phone size={14} />
                            <span>{quote.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full capitalize">
                        {quote.projectType || 'Non spécifié'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {quote.budget ? (
                        <span className="flex items-center space-x-1">
                          <DollarSign size={14} />
                          <span>{quote.budget}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400">Non spécifié</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(quote.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Voir les détails"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(quote._id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? 'Aucune demande trouvée' : 'Aucune demande de devis pour le moment'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Details */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Détails de la Demande</h2>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Informations Client</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 w-24">Nom:</span>
                    <span className="font-medium">{selectedQuote.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 w-24">Email:</span>
                    <a href={`mailto:${selectedQuote.email}`} className="font-medium text-primary-600 hover:underline">
                      {selectedQuote.email}
                    </a>
                  </div>
                  {selectedQuote.phone && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 w-24">Téléphone:</span>
                      <a href={`tel:${selectedQuote.phone}`} className="font-medium text-primary-600 hover:underline">
                        {selectedQuote.phone}
                      </a>
                    </div>
                  )}
                  {selectedQuote.company && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 w-24">Entreprise:</span>
                      <span className="font-medium">{selectedQuote.company}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Détails du Projet</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 w-24">Type:</span>
                    <span className="font-medium capitalize">{selectedQuote.projectType || 'Non spécifié'}</span>
                  </div>
                  {selectedQuote.budget && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 w-24">Budget:</span>
                      <span className="font-medium">{selectedQuote.budget}</span>
                    </div>
                  )}
                  {selectedQuote.deadline && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 w-24">Délai:</span>
                      <span className="font-medium">{selectedQuote.deadline}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {selectedQuote.description && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {selectedQuote.description}
                  </p>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                <span>Reçu le {new Date(selectedQuote.createdAt).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
              <a
                href={`mailto:${selectedQuote.email}`}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Répondre par Email
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuotesList;
