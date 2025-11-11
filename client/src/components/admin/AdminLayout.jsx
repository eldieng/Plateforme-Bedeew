import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, FileText, MessageSquare, 
  Users, Settings, LogOut, Menu, X, ChevronDown,
  Package, Image, BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../images/Bedeew_logo.png';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      exact: true
    },
    {
      title: 'Services',
      icon: Package,
      submenu: [
        { title: 'Liste des Services', path: '/admin/services' },
        { title: 'Créer un Service', path: '/admin/services/create' }
      ]
    },
    {
      title: 'Réalisations',
      icon: Image,
      submenu: [
        { title: 'Liste des Réalisations', path: '/admin/portfolio' },
        { title: 'Créer une Réalisation', path: '/admin/portfolio/create' }
      ]
    },
    {
      title: 'Blog',
      icon: BookOpen,
      submenu: [
        { title: 'Liste des Articles', path: '/admin/blog' },
        { title: 'Créer un Article', path: '/admin/blog/create' }
      ]
    },
    {
      title: 'Demandes de Devis',
      icon: FileText,
      path: '/admin/quotes'
    },
    {
      title: 'Messages',
      icon: MessageSquare,
      path: '/admin/messages'
    },
    {
      title: 'Utilisateurs',
      icon: Users,
      path: '/admin/users'
    },
    {
      title: 'Paramètres',
      icon: Settings,
      path: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-gray-900 w-64`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link to="/admin" className="flex items-center space-x-3">
              <img src={logo} alt="Bedeew Digital" className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.firstName?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item, index) => {
              if (item.submenu) {
                const isOpen = item.title === 'Services' ? servicesOpen : 
                               item.title === 'Réalisations' ? portfolioOpen : 
                               item.title === 'Blog' ? blogOpen : false;

                return (
                  <div key={index}>
                    <button
                      onClick={() => {
                        if (item.title === 'Services') setServicesOpen(!servicesOpen);
                        if (item.title === 'Réalisations') setPortfolioOpen(!portfolioOpen);
                        if (item.title === 'Blog') setBlogOpen(!blogOpen);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subitem, subindex) => (
                          <NavLink
                            key={subindex}
                            to={subitem.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm rounded-lg transition-colors ${
                                isActive
                                  ? 'bg-primary-600 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              }`
                            }
                          >
                            {subitem.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={index}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                target="_blank"
                className="text-sm text-gray-600 hover:text-primary-600"
              >
                Voir le site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
