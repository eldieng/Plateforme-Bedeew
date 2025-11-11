import { useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube, Github } from 'lucide-react';
import { FaTiktok, FaBehance } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Bedeew Digital',
    siteDescription: 'Agence digitale au Sénégal',
    siteUrl: 'https://bedeew.digital',
    email: 'contact@bedeew.digital',
    phone: '77 055 54 45',
    phone2: '77 454 86 61',
    address: 'Pharmacie Mame Diarra, Parcelle Soprim',
    facebook: 'https://www.facebook.com/bedeewdigital',
    instagram: 'https://www.instagram.com/bedeewdigital/',
    linkedin: 'https://www.linkedin.com/company/bedeew-digital/posts/?feedView=all',
    tiktok: 'https://www.tiktok.com/@bedeewdigital',
    youtube: 'https://www.youtube.com/@BedeewDigital',
    behance: 'https://www.behance.net/bedeewdigitale/appreciated',
    github: 'https://github.com/Yade814',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Paramètres enregistrés avec succès');
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Configuration générale du site</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations Générales */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Globe className="mr-2 text-primary-600" size={24} />
            Informations Générales
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du Site
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                rows={3}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL du Site
              </label>
              <input
                type="url"
                name="siteUrl"
                value={settings.siteUrl}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Mail className="mr-2 text-primary-600" size={24} />
            Informations de Contact
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone 1
              </label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="input"
                placeholder="77 055 54 45"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone 2
              </label>
              <input
                type="tel"
                name="phone2"
                value={settings.phone2}
                onChange={handleChange}
                className="input"
                placeholder="77 454 86 61"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="input"
                placeholder="Pharmacie Mame Diarra, Parcelle Soprim"
              />
            </div>
          </div>
        </div>

        {/* Réseaux Sociaux */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Réseaux Sociaux
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Facebook size={16} className="mr-2 text-blue-600" />
                Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={settings.facebook}
                onChange={handleChange}
                className="input"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Instagram size={16} className="mr-2 text-pink-600" />
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                className="input"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Linkedin size={16} className="mr-2 text-blue-700" />
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={settings.linkedin}
                onChange={handleChange}
                className="input"
                placeholder="https://linkedin.com/company/..."
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaTiktok size={16} className="mr-2 text-black" />
                TikTok
              </label>
              <input
                type="url"
                name="tiktok"
                value={settings.tiktok}
                onChange={handleChange}
                className="input"
                placeholder="https://tiktok.com/@..."
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Youtube size={16} className="mr-2 text-red-600" />
                YouTube
              </label>
              <input
                type="url"
                name="youtube"
                value={settings.youtube}
                onChange={handleChange}
                className="input"
                placeholder="https://youtube.com/@..."
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaBehance size={16} className="mr-2 text-blue-500" />
                Behance
              </label>
              <input
                type="url"
                name="behance"
                value={settings.behance}
                onChange={handleChange}
                className="input"
                placeholder="https://behance.net/..."
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Github size={16} className="mr-2 text-gray-800" />
                GitHub
              </label>
              <input
                type="url"
                name="github"
                value={settings.github}
                onChange={handleChange}
                className="input"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Options du Site
          </h2>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <span className="text-gray-700 font-medium">Mode Maintenance</span>
                <p className="text-sm text-gray-500">Désactiver temporairement le site pour les visiteurs</p>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="allowRegistration"
                checked={settings.allowRegistration}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <span className="text-gray-700 font-medium">Autoriser les Inscriptions</span>
                <p className="text-sm text-gray-500">Permettre aux nouveaux utilisateurs de s'inscrire</p>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <span className="text-gray-700 font-medium">Notifications Email</span>
                <p className="text-sm text-gray-500">Recevoir des emails pour les nouveaux messages et devis</p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Save size={20} />
            <span>{loading ? 'Enregistrement...' : 'Enregistrer les Paramètres'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
