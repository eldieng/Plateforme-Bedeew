import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Settings, LogOut, Shield } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Rediriger les admins vers le dashboard admin
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="section min-h-screen bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="btn-outline btn-sm flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Déconnexion</span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Rôle</p>
                <p className="font-semibold capitalize">{user?.role}</p>
              </div>
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Statut</p>
                <p className="font-semibold text-green-600">Actif</p>
              </div>
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Membre depuis</p>
                <p className="font-semibold">
                  {new Date(user?.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="text-primary-600" size={24} />
              <h2 className="text-xl font-bold">Paramètres du compte</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Gérez vos informations personnelles et vos préférences
            </p>
            <button className="btn-primary btn-sm">
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
