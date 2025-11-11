import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Package, Image, FileText, MessageSquare, 
  TrendingUp, Users, Eye, ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    portfolio: 0,
    blog: 0,
    messages: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [servicesRes, portfolioRes, blogRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/services`),
        axios.get(`${import.meta.env.VITE_API_URL}/portfolio`),
        axios.get(`${import.meta.env.VITE_API_URL}/blog`)
      ]);

      setStats({
        services: servicesRes.data.count || 0,
        portfolio: portfolioRes.data.count || 0,
        blog: blogRes.data.count || 0,
        messages: 0 // À implémenter
      });
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Services',
      value: stats.services,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/services'
    },
    {
      title: 'Réalisations',
      value: stats.portfolio,
      icon: Image,
      color: 'bg-purple-500',
      link: '/admin/portfolio'
    },
    {
      title: 'Articles',
      value: stats.blog,
      icon: FileText,
      color: 'bg-green-500',
      link: '/admin/blog'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      color: 'bg-orange-500',
      link: '/admin/messages'
    }
  ];

  const quickActions = [
    {
      title: 'Créer un Service',
      description: 'Ajouter un nouveau service',
      icon: Package,
      link: '/admin/services/create',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Créer une Réalisation',
      description: 'Ajouter un nouveau projet',
      icon: Image,
      link: '/admin/portfolio/create',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Créer un Article',
      description: 'Publier un nouvel article',
      icon: FileText,
      link: '/admin/blog/create',
      color: 'bg-green-50 text-green-600'
    }
  ];

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de Bord
        </h1>
        <p className="text-gray-600">
          Bienvenue sur votre espace d'administration
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={card.link}
                className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Actions Rapides
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="block p-6 border-2 border-gray-200 rounded-xl hover:border-primary-600 hover:shadow-md transition-all group"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Activité Récente
              </h2>
              <Link to="/admin/activity" className="text-primary-600 text-sm font-medium hover:underline">
                Voir tout
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aucune activité récente
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Liens Rapides</h3>
            <div className="space-y-2">
              <Link
                to="/admin/services"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <span className="text-sm text-gray-700">Gérer les Services</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link
                to="/admin/portfolio"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <span className="text-sm text-gray-700">Gérer les Réalisations</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link
                to="/admin/blog"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <span className="text-sm text-gray-700">Gérer les Articles</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link
                to="/admin/quotes"
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <span className="text-sm text-gray-700">Demandes de Devis</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* Site Stats */}
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl shadow-sm p-6 text-white">
            <h3 className="font-bold mb-4">Statistiques du Site</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-100">Vues totales</span>
                <span className="font-bold">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-100">Visiteurs uniques</span>
                <span className="font-bold">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-100">Taux de conversion</span>
                <span className="font-bold">-</span>
              </div>
            </div>
            <Link
              to="/"
              target="_blank"
              className="mt-4 flex items-center justify-center space-x-2 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Eye size={16} />
              <span className="text-sm">Voir le site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
