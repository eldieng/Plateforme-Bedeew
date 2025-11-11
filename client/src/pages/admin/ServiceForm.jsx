import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/admin/ImageUpload';

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    icon: 'code',
    image: '',
    category: 'development',
    features: [],
    pricing: {
      startingPrice: '',
      currency: 'FCFA',
      pricingType: 'project'
    },
    processSteps: [],
    faqs: [],
    testimonials: [],
    published: true
  });

  useEffect(() => {
    if (isEdit) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`);
      setFormData(res.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement du service');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('pricing.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [field]: field === 'startingPrice' ? Number(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { title: '', description: '' }]
    }));
  };

  const updateFeature = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addProcessStep = () => {
    const nextNumber = String(formData.processSteps.length + 1).padStart(2, '0');
    setFormData(prev => ({
      ...prev,
      processSteps: [...prev.processSteps, { number: nextNumber, title: '', description: '', duration: '' }]
    }));
  };

  const updateProcessStep = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      processSteps: prev.processSteps.map((step, i) => 
        i === index ? { ...step, [field]: value } : step
      )
    }));
  };

  const removeProcessStep = (index) => {
    setFormData(prev => ({
      ...prev,
      processSteps: prev.processSteps.filter((_, i) => i !== index)
    }));
  };

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const updateFaq = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', company: '', text: '', rating: 5, image: '' }]
    }));
  };

  const updateTestimonial = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };

  const removeTestimonial = (index) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}/services/${id}`, formData);
        toast.success('Service mis à jour avec succès');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/services`, formData);
        toast.success('Service créé avec succès');
      }
      navigate('/admin/services');
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
            {isEdit ? 'Modifier le Service' : 'Créer un Service'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Modifiez les informations du service' : 'Ajoutez un nouveau service à votre catalogue'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/services')}
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
                Titre du Service *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input"
                placeholder="Ex: Développement Web & Mobile"
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
                <option value="development">Développement</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="seo">SEO</option>
                <option value="content">Contenu</option>
                <option value="consulting">Consulting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icône
              </label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="input"
              >
                <option value="code">Code</option>
                <option value="palette">Palette</option>
                <option value="trending-up">Trending Up</option>
                <option value="video">Video</option>
                <option value="smartphone">Smartphone</option>
                <option value="search">Search</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description Courte *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                rows={2}
                className="input"
                placeholder="Description courte pour les cartes (max 150 caractères)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description Complète *
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                required
                rows={4}
                className="input"
                placeholder="Description détaillée du service"
              />
            </div>
          </div>
        </div>

        {/* Image du Service */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Image du Service</h2>
          
          <ImageUpload
            images={formData.image ? [{ url: formData.image, alt: formData.title }] : []}
            onImagesChange={(images) => setFormData(prev => ({ 
              ...prev, 
              image: images[0]?.url || ''
            }))}
            multiple={false}
          />
          
          <p className="text-sm text-gray-500 mt-4">
            💡 Image optionnelle pour illustrer le service
          </p>
        </div>

        {/* Tarification */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tarification</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix de Départ
              </label>
              <input
                type="number"
                name="pricing.startingPrice"
                value={formData.pricing.startingPrice}
                onChange={handleChange}
                className="input"
                placeholder="500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Devise
              </label>
              <select
                name="pricing.currency"
                value={formData.pricing.currency}
                onChange={handleChange}
                className="input"
              >
                <option value="FCFA">FCFA</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de Tarif
              </label>
              <select
                name="pricing.pricingType"
                value={formData.pricing.pricingType}
                onChange={handleChange}
                className="input"
              >
                <option value="fixed">Fixe</option>
                <option value="hourly">Horaire</option>
                <option value="project">Par Projet</option>
                <option value="monthly">Mensuel</option>
                <option value="custom">Personnalisé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Fonctionnalités</h2>
            <button
              type="button"
              onClick={addFeature}
              className="btn-primary btn-sm inline-flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Ajouter</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    placeholder="Titre de la fonctionnalité"
                    className="input"
                  />
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                    placeholder="Description"
                    className="input"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
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
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-gray-700">Publier ce service</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
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

export default ServiceForm;
