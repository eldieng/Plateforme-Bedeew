import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, User, ArrowRight, Search, Sparkles, BookOpen, TrendingUp, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
      setBlogs(res.data.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des articles');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'Tous les articles', icon: BookOpen },
    { value: 'design', label: 'Design', icon: null },
    { value: 'marketing', label: 'Marketing', icon: null },
    { value: 'development', label: 'Développement', icon: null },
    { value: 'seo', label: 'SEO', icon: null },
    { value: 'business', label: 'Business', icon: null },
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory && blog.published;
  });

  const featuredBlog = filteredBlogs.find(blog => blog.featured) || filteredBlogs[0];
  const otherBlogs = filteredBlogs.filter(blog => blog._id !== featuredBlog?._id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-600" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-primary-600 to-secondary-600 text-white py-24 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <BookOpen size={18} className="text-yellow-300" />
              <span className="text-sm font-medium">Ressources & Actualités</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Notre Blog
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Digital
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-10">
              Conseils, tutoriels et actualités pour booster votre présence digitale
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 sticky top-0 z-40">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-lg border border-gray-100 overflow-x-auto max-w-full">
              <div className="hidden sm:flex items-center px-4 text-gray-400">
                <Tag size={18} />
              </div>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === cat.value
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-7xl">
          <AnimatePresence mode="wait">
            {filteredBlogs.length > 0 ? (
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Featured Article */}
                {featuredBlog && (
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                  >
                    <Link to={`/blog/${featuredBlog.slug}`} className="group block">
                      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                        <div className="grid lg:grid-cols-2 gap-0">
                          {/* Image */}
                          <div className="relative h-72 lg:h-96 overflow-hidden">
                            {featuredBlog.image?.url ? (
                              <img
                                src={featuredBlog.image.url}
                                alt={featuredBlog.image.alt || featuredBlog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                <BookOpen size={64} className="text-white/50" />
                              </div>
                            )}
                            <div className="absolute top-6 left-6 flex items-center space-x-2">
                              <span className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full text-sm font-semibold text-white shadow-lg">
                                ⭐ Article à la une
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                              <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full font-medium capitalize">
                                {featuredBlog.category}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar size={14} />
                                <span>{new Date(featuredBlog.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              </div>
                            </div>

                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                              {featuredBlog.title}
                            </h2>

                            <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">
                              {featuredBlog.excerpt}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                                  {featuredBlog.author?.firstName?.charAt(0) || 'B'}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {featuredBlog.author?.firstName} {featuredBlog.author?.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500 flex items-center space-x-1">
                                    <Clock size={12} />
                                    <span>{featuredBlog.readTime} min de lecture</span>
                                  </div>
                                </div>
                              </div>
                              <span className="inline-flex items-center space-x-2 text-primary-600 font-semibold group-hover:space-x-3 transition-all">
                                <span>Lire l'article</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                )}

                {/* Other Articles Grid */}
                {otherBlogs.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-gray-900">Autres articles</h3>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <TrendingUp size={18} />
                        <span>{otherBlogs.length} article{otherBlogs.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {otherBlogs.map((blog, index) => (
                        <motion.article
                          key={blog._id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group"
                        >
                          <Link to={`/blog/${blog.slug}`} className="block">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                              {/* Image */}
                              <div className="relative h-52 overflow-hidden">
                                {blog.image?.url ? (
                                  <img
                                    src={blog.image.url}
                                    alt={blog.image.alt || blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                    <BookOpen size={40} className="text-gray-400" />
                                  </div>
                                )}
                                <div className="absolute top-4 left-4">
                                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 capitalize shadow-sm">
                                    {blog.category}
                                  </span>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                  <div className="flex items-center space-x-1">
                                    <Calendar size={14} />
                                    <span>{new Date(blog.createdAt).toLocaleDateString('fr-FR')}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock size={14} />
                                    <span>{blog.readTime} min</span>
                                  </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                  {blog.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                                  {blog.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                      {blog.author?.firstName?.charAt(0) || 'B'}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                      {blog.author?.firstName}
                                    </span>
                                  </div>
                                  <span className="text-primary-600 font-medium flex items-center space-x-1 group-hover:space-x-2 transition-all">
                                    <span>Lire</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Aucun article trouvé' 
                    : 'Aucun article pour le moment'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Essayez avec d\'autres mots-clés' 
                    : 'Revenez bientôt pour découvrir nos articles'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-primary-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <BookOpen size={48} className="mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Restez informé des dernières tendances
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Suivez notre blog pour découvrir les meilleures pratiques du digital et booster votre présence en ligne
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Nous contacter</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <span>Nos services</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
