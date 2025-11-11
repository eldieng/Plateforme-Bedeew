import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/admin/ImageUpload';

const PortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'web',
    images: [],
    client: {
      name: '',
      website: '',
      testimonial: '',
      position: ''
    },
    technologies: [],
    projectUrl: '',
    completionDate: '',
    duration: '',
    teamSize: 4,
    challenges: '',
    metrics: [],
    featured: false,
    published: true
  });

  const [newTech, setNewTech] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchPortfolio();
    }
  }, [id]);

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/portfolio/${id}`);
      const data = res.data.data;
      setFormData({
        ...data,
        completionDate: data.completionDate ? new Date(data.completionDate).toISOString().split('T')[0] : ''
      });
    } catch (error) {
      toast.error('Erreur lors du chargement du projet');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('client.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        client: {
          ...prev.client,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (name === 'teamSize' ? Number(value) : value)
      }));
    }
  };

  const addTechnology = () => {
    if (newTech.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, { url: newImageUrl.trim(), alt: formData.title }]
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { label: '', value: '', icon: 'TrendingUp' }]
    }));
  };

  const updateMetric = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    }));
  };

  const removeMetric = (index) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}/portfolio/${id}`, formData);
        toast.success('Projet mis à jour avec succès');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/portfolio`, formData);
        toast.success('Projet créé avec succès');
      }
      navigate('/admin/portfolio');
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEdit ? 'Modifier la Réalisation' : 'Créer une Réalisation'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Modifiez les informations du projet' : 'Ajoutez un nouveau projet à votre portfolio'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/portfolio')}
          className="btn-outline inline-flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de Base</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du Projet *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input"
                placeholder="Ex: Site E-commerce Fashion Store"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="web">Site Web</option>
                <option value="mobile">Application Mobile</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="video">Vidéo</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL du Projet
              </label>
              <input
                type="url"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleChange}
                className="input"
                placeholder="https://example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description Courte *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={2}
                className="input"
                placeholder="Description courte pour les cartes"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description Complète
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows={4}
                className="input"
                placeholder="Description détaillée du projet"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Défis & Solutions
              </label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows={3}
                className="input"
                placeholder="Décrivez les défis rencontrés et les solutions apportées"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Images du Projet</h2>
          
          <ImageUpload
            images={formData.images}
            onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
            multiple={true}
          />
          
          <p className="text-sm text-gray-500 mt-4">
            💡 La première image sera utilisée comme image principale
          </p>
        </div>

        {/* Client */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informations Client</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du Client
              </label>
              <input
                type="text"
                name="client.name"
                value={formData.client.name}
                onChange={handleChange}
                className="input"
                placeholder="Ex: Fashion Store SARL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Web du Client
              </label>
              <input
                type="url"
                name="client.website"
                value={formData.client.website}
                onChange={handleChange}
                className="input"
                placeholder="https://client.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poste du Contact
              </label>
              <input
                type="text"
                name="client.position"
                value={formData.client.position}
                onChange={handleChange}
                className="input"
                placeholder="Ex: Directeur Général"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Témoignage Client
              </label>
              <textarea
                name="client.testimonial"
                value={formData.client.testimonial}
                onChange={handleChange}
                rows={3}
                className="input"
                placeholder="Témoignage du client sur le projet"
              />
            </div>
          </div>
        </div>

        {/* Détails du Projet */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Détails du Projet</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de Livraison
              </label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input"
                placeholder="Ex: 6 semaines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille de l'Équipe
              </label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="input"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Technologies Utilisées</h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                placeholder="Ex: React, Node.js, MongoDB"
                className="input flex-1"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="btn-primary btn-sm"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="hover:text-primary-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Métriques */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Résultats / Métriques</h2>
            <button
              type="button"
              onClick={addMetric}
              className="btn-primary btn-sm inline-flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Ajouter</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.metrics.map((metric, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 grid md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={metric.label}
                    onChange={(e) => updateMetric(index, 'label', e.target.value)}
                    placeholder="Label (ex: Augmentation du trafic)"
                    className="input"
                  />
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => updateMetric(index, 'value', e.target.value)}
                    placeholder="Valeur (ex: +150%)"
                    className="input"
                  />
                  <select
                    value={metric.icon}
                    onChange={(e) => updateMetric(index, 'icon', e.target.value)}
                    className="input"
                  >
                    <option value="TrendingUp">Trending Up</option>
                    <option value="Users">Users</option>
                    <option value="Clock">Clock</option>
                    <option value="Award">Award</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeMetric(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Statut */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Publication</h2>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-gray-700">Publier ce projet</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-gray-700">Mettre en vedette</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/portfolio')}
            className="btn-outline"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Save size={20} />
            <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
