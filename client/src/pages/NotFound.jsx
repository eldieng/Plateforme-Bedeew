import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="section min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Non Trouvée</h2>
          <p className="text-xl text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary btn-lg">
              <Home size={20} className="mr-2" />
              Retour à l'accueil
            </Link>
            <button onClick={() => window.history.back()} className="btn-outline btn-lg">
              <ArrowLeft size={20} className="mr-2" />
              Page précédente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
