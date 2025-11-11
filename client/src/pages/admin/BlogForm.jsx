import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import ImageUpload from '../../components/admin/ImageUpload';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: {
      url: '',
      alt: ''
    },
    category: 'design',
    tags: [],
    readTime: 5,
    published: false,
    featured: false
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/blog/${id}`);
      setFormData(res.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement de l\'article');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('image.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        image: {
          ...prev.image,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (name === 'readTime' ? Number(value) : value)
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        author: user._id
      };

      if (isEdit) {
        await axios.put(`/blog/${id}`, dataToSend);
        toast.success('Article mis à jour avec succès');
      } else {
        await axios.post('/blog', dataToSend);
        toast.success('Article créé avec succès');
      }
      navigate('/admin/blog');
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
            {isEdit ? 'Modifier l\'Article' : 'Créer un Article'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Modifiez les informations de l\'article' : 'Ajoutez un nouvel article au blog'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/blog')}
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
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'Article *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input"
                placeholder="Ex: Les Tendances du Design Web en 2025"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="development">Développement</option>
                  <option value="seo">SEO</option>
                  <option value="business">Business</option>
                  <option value="tutorial">Tutorial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temps de Lecture (minutes) *
                </label>
                <input
                  type="number"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  required
                  min="1"
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extrait *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
                maxLength={300}
                className="input"
                placeholder="Résumé de l'article (max 300 caractères)"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.excerpt.length}/300 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenu *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="input"
                placeholder="Contenu complet de l'article..."
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Image de Couverture</h2>
          
          <ImageUpload
            images={formData.image.url ? [formData.image] : []}
            onImagesChange={(images) => setFormData(prev => ({ 
              ...prev, 
              image: images[0] || { url: '', alt: '' }
            }))}
            multiple={false}
          />
        </div>

        {/* Tags */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tags</h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Ajouter un tag"
                className="input flex-1"
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-primary btn-sm"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:text-primary-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
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
              <span className="text-gray-700">Publier cet article</span>
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
            onClick={() => navigate('/admin/blog')}
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

export default BlogForm;
