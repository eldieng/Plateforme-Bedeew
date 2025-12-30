import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Send, CheckCircle, Code, Palette, TrendingUp, Video, 
  Smartphone, Search, Mail, Phone, MapPin, FileText,
  User, Building, DollarSign, Clock, Sparkles, ArrowRight, Zap,
  MessageSquare
} from 'lucide-react';

const Contact = () => {
  const [isQuote, setIsQuote] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    projectType: '',
    budget: '',
    deadline: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const projectTypes = [
    { value: 'web', label: 'Site Web', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { value: 'mobile', label: 'App Mobile', icon: Smartphone, color: 'from-purple-500 to-pink-500' },
    { value: 'design', label: 'Design', icon: Palette, color: 'from-orange-500 to-red-500' },
    { value: 'marketing', label: 'Marketing', icon: TrendingUp, color: 'from-green-500 to-teal-500' },
    { value: 'video', label: 'Vidéo', icon: Video, color: 'from-pink-500 to-rose-500' },
    { value: 'seo', label: 'SEO', icon: Search, color: 'from-indigo-500 to-blue-500' },
    { value: 'other', label: 'Autre', icon: FileText, color: 'from-gray-500 to-slate-500' },
  ];

  const deadlines = [
    { value: 'urgent', label: 'Urgent (moins d\'1 mois)', icon: '🚀' },
    { value: '1-3months', label: '1 à 3 mois', icon: '⚡' },
    { value: '3-6months', label: '3 à 6 mois', icon: '📅' },
    { value: 'flexible', label: 'Flexible', icon: '🎯' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: isQuote 
          ? `Demande de Devis - ${projectTypes.find(p => p.value === formData.projectType)?.label || 'Projet'}`
          : formData.subject,
        message: formData.message,
        projectType: formData.projectType,
        budget: formData.budget,
        deadline: formData.deadline,
        isQuote,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, dataToSend);

      toast.success(
        isQuote 
          ? '🎉 Demande de devis envoyée avec succès ! Nous vous contacterons sous 24h.'
          : '✅ Message envoyé avec succès ! Nous vous répondrons rapidement.',
        { duration: 5000 }
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        projectType: '',
        budget: '',
        deadline: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const selectedProject = projectTypes.find(p => p.value === formData.projectType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-secondary-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6bTAgMjRjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Sparkles className="text-yellow-400" size={20} />
              <span className="text-white font-medium">Nous Sommes Là Pour Vous</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Contactez
              <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Bedeew Digital
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              Une question ? Un projet à Dakar ? Notre équipe au Sénégal est à votre écoute
            </p>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Mail className="mx-auto mb-3 text-primary-400" size={32} />
                <div className="text-white font-semibold mb-1">Email</div>
                <div className="text-primary-300 text-sm">
                  <a href="mailto:babacarsambayatte@gmail.com" className="hover:text-primary-200 block">babacarsambayatte@gmail.com</a>
                  <a href="mailto:el.elhadji.dieng@gmail.com" className="hover:text-primary-200 block">el.elhadji.dieng@gmail.com</a>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Phone className="mx-auto mb-3 text-primary-400" size={32} />
                <div className="text-white font-semibold mb-1">Téléphone</div>
                <div className="text-primary-300 text-sm">
                  <div>77 055 54 45</div>
                  <div>77 454 86 61</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <MapPin className="mx-auto mb-3 text-primary-400" size={32} />
                <div className="text-white font-semibold mb-1">Adresse</div>
                <div className="text-primary-300 text-sm">
                  <div>Dakar, Sénégal</div>
                  <div>Pharmacie Mame Diarra, Parcelle Soprim</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section -mt-20 relative z-20">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                {/* Toggle Message/Devis */}
                <div className="flex space-x-4 mb-10">
                  <button
                    type="button"
                    onClick={() => setIsQuote(false)}
                    className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center ${
                      !isQuote 
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <MessageSquare className="mr-2" size={20} />
                    Message Simple
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsQuote(true)}
                    className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center ${
                      isQuote 
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FileText className="mr-2" size={20} />
                    Demande de Devis
                  </button>
                </div>

                {/* Type de Projet (Devis uniquement) */}
                {isQuote && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                      <Zap className="mr-3 text-primary-600" size={28} />
                      Type de Projet
                    </h2>
                    <p className="text-gray-600 mb-6">Sélectionnez le type de projet qui vous intéresse</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {projectTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = formData.projectType === type.value;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, projectType: type.value })}
                            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                              isSelected
                                ? 'border-primary-600 bg-primary-50 shadow-lg scale-105'
                                : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br ${type.color} ${
                              isSelected ? 'scale-110' : 'group-hover:scale-110'
                            } transition-transform duration-300`}>
                              <Icon className="text-white" size={24} />
                            </div>
                            <span className={`text-sm font-semibold ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                              {type.label}
                            </span>
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                                <CheckCircle size={16} className="text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Informations Personnelles */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                    <User className="mr-3 text-primary-600" size={28} />
                    Vos Informations
                  </h2>
                  <p className="text-gray-600 mb-6">Comment pouvons-nous vous contacter ?</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input pl-11"
                          placeholder="Votre nom complet"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="input pl-11"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="input pl-11"
                          placeholder="77 123 45 67"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Entreprise (optionnel)
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="input pl-11"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Simple OU Détails du Projet */}
                {!isQuote ? (
                  /* Message Simple */
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                      <MessageSquare className="mr-3 text-primary-600" size={28} />
                      Votre Message
                    </h2>
                    <p className="text-gray-600 mb-6">Dites-nous comment nous pouvons vous aider</p>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required={!isQuote}
                        className="input"
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="input resize-none"
                        placeholder="Écrivez votre message ici..."
                      />
                    </div>
                  </div>
                ) : (
                  /* Détails du Projet (Devis) */
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                      <FileText className="mr-3 text-primary-600" size={28} />
                      Détails du Projet
                    </h2>
                    <p className="text-gray-600 mb-6">Parlez-nous de votre projet</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Budget estimé *
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required={isQuote}
                            className="input pl-11"
                            placeholder="Ex: 500 000 FCFA ou À discuter"
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Indiquez votre budget ou "À discuter"
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Délai souhaité *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {deadlines.map((deadline) => (
                            <button
                              key={deadline.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, deadline: deadline.value })}
                              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                                formData.deadline === deadline.value
                                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-primary-300'
                              }`}
                            >
                              <span className="mr-1">{deadline.icon}</span>
                              {deadline.label.split('(')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description du projet *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="input resize-none"
                        placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, public cible, etc."
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Plus vous êtes précis, plus notre devis sera adapté à vos besoins.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    * Champs obligatoires
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
                        <span>{isQuote ? 'Envoyer ma demande' : 'Envoyer le message'}</span>
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Récapitulatif (Devis uniquement) */}
              {isQuote && (
                <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <CheckCircle className="mr-2 text-green-500" size={24} />
                    Récapitulatif
                  </h3>

                  <div className="space-y-4 mb-8">
                    {formData.projectType && (
                      <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
                        {selectedProject && (
                          <>
                            <selectedProject.icon className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                              <div className="text-xs text-gray-600 font-medium">Type de projet</div>
                              <div className="text-sm font-semibold text-gray-900">{selectedProject.label}</div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {formData.budget && (
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <DollarSign className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                          <div className="text-xs text-gray-600 font-medium">Budget</div>
                          <div className="text-sm font-semibold text-gray-900">{formData.budget}</div>
                        </div>
                      </div>
                    )}

                    {formData.deadline && (
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                          <div className="text-xs text-gray-600 font-medium">Délai</div>
                          <div className="text-sm font-semibold text-gray-900">
                            {deadlines.find(d => d.value === formData.deadline)?.label}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-200 space-y-3">
                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircle size={20} />
                      <span className="text-sm font-medium">Réponse sous 24h</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircle size={20} />
                      <span className="text-sm font-medium">Devis gratuit</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircle size={20} />
                      <span className="text-sm font-medium">Sans engagement</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl shadow-xl p-8 text-white">
                <h3 className="font-bold text-xl mb-4">
                  {isQuote ? 'Ce qui se passe ensuite :' : 'Pourquoi nous contacter ?'}
                </h3>
                {isQuote ? (
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">1️⃣</span>
                      <span>Nous étudions votre demande sous 24 heures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">2️⃣</span>
                      <span>Vous recevez un devis détaillé par email</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3️⃣</span>
                      <span>Nous planifions un appel pour discuter</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">4️⃣</span>
                      <span>Démarrage du projet après validation</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span>Questions sur nos services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span>Informations sur nos formations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span>Partenariats et collaborations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span>Support technique</span>
                    </li>
                  </ul>
                )}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
