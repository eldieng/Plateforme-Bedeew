import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaInstagram, FaTiktok, FaYoutube, FaBehance, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'À Propos', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Contact', to: '/contact' },
    ],
    services: [
      { label: 'Développement Web', to: '/services' },
      { label: 'Design Graphique', to: '/services' },
      { label: 'Marketing Digital', to: '/services' },
      { label: 'SEO', to: '/services' },
    ],
    legal: [
      { label: 'Mentions Légales', to: '/legal' },
      { label: 'Politique de Confidentialité', to: '/privacy' },
      { label: 'Conditions d\'Utilisation', to: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: 'https://www.facebook.com/bedeewdigital', label: 'Facebook' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/company/bedeew-digital/posts/?feedView=all', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/bedeewdigital/', label: 'Instagram' },
    { icon: FaTiktok, href: 'https://www.tiktok.com/@bedeewdigital', label: 'TikTok' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@BedeewDigital', label: 'YouTube' },
    { icon: FaBehance, href: 'https://www.behance.net/bedeewdigitale/appreciated', label: 'Behance' },
    { icon: FaGithub, href: 'https://github.com/Yade814', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-white">
                Bedeew Digital
              </span>
            </div>
            <p className="text-sm mb-4">
              Votre partenaire digital à Dakar pour la communication, la formation et le recrutement au Sénégal.
            </p>
            <div className="space-y-2">
              <a href="mailto:babacarsambayatte@gmail.com" className="flex items-center space-x-2 text-sm hover:text-primary-400 transition-colors">
                <Mail size={16} />
                <span>babacarsambayatte@gmail.com</span>
              </a>
              <a href="mailto:el.elhadji.dieng@gmail.com" className="flex items-center space-x-2 text-sm hover:text-primary-400 transition-colors">
                <Mail size={16} />
                <span>el.elhadji.dieng@gmail.com</span>
              </a>
              <a href="tel:+221770555445" className="flex items-center space-x-2 text-sm hover:text-primary-400 transition-colors">
                <Phone size={16} />
                <span>77 055 54 45</span>
              </a>
              <a href="tel:+221774548661" className="flex items-center space-x-2 text-sm hover:text-primary-400 transition-colors">
                <Phone size={16} />
                <span>77 454 86 61</span>
              </a>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={16} />
                <span>Dakar, Sénégal - Pharmacie Mame Diarra, Parcelle Soprim</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Restez informé de nos dernières actualités et offres.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                type="submit"
                className="w-full btn-primary btn-sm"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              © {currentYear} Bedeew Digital. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
