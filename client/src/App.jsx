import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Devis from './pages/Devis';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ServicesList from './pages/admin/ServicesList';
import ServiceForm from './pages/admin/ServiceForm';
import PortfolioList from './pages/admin/PortfolioList';
import PortfolioForm from './pages/admin/PortfolioForm';
import BlogList from './pages/admin/BlogList';
import BlogForm from './pages/admin/BlogForm';
import QuotesList from './pages/admin/QuotesList';
import MessagesList from './pages/admin/MessagesList';
import UsersList from './pages/admin/UsersList';
import UserForm from './pages/admin/UserForm';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<PortfolioDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="devis" element={<Devis />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          
          {/* Services */}
          <Route path="services" element={<ServicesList />} />
          <Route path="services/create" element={<ServiceForm />} />
          <Route path="services/edit/:id" element={<ServiceForm />} />
          
          {/* Portfolio */}
          <Route path="portfolio" element={<PortfolioList />} />
          <Route path="portfolio/create" element={<PortfolioForm />} />
          <Route path="portfolio/edit/:id" element={<PortfolioForm />} />
          
          {/* Blog */}
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/create" element={<BlogForm />} />
          <Route path="blog/edit/:id" element={<BlogForm />} />
          
          {/* Autres */}
          <Route path="quotes" element={<QuotesList />} />
          <Route path="messages" element={<MessagesList />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/create" element={<UserForm />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
