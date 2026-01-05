import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, User, ArrowLeft, Tag, Home, ChevronRight, BookOpen, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const [blogRes, relatedRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/blog/slug/${slug}`),
        axios.get(`${import.meta.env.VITE_API_URL}/blog?limit=3`)
      ]);
      setBlog(blogRes.data.data);
      setRelatedBlogs(relatedRes.data.data?.filter(b => b.slug !== slug) || []);
    } catch (error) {
      toast.error('Article non trouvé');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600"></div>
          <BookOpen className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-600" size={24} />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="section container text-center">
        <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
        <Link to="/blog" className="btn-primary">Retour au blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={blog.title}
        description={blog.excerpt || `${blog.title} - Article de blog par Bedeew Digital à Dakar.`}
        keywords={`${blog.category} Dakar, ${blog.tags?.join(', ') || ''}, blog digital Sénégal`}
        url={`/blog/${blog.slug}`}
        image={blog.image?.url}
        type="article"
        author={`${blog.author?.firstName || ''} ${blog.author?.lastName || ''}`}
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600 transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={16} />
            <Link to="/blog" className="hover:text-primary-600 transition-colors">
              Blog
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium line-clamp-1">{blog.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
                {blog.category}
              </span>
              <div className="flex items-center space-x-4 text-sm text-primary-100">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{new Date(blog.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{blog.readTime} min de lecture</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold">
                  {blog.author?.firstName?.charAt(0)}{blog.author?.lastName?.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">
                    {blog.author?.firstName} {blog.author?.lastName}
                  </div>
                  <div className="text-sm text-primary-200">
                    {blog.views || 0} vues
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 lg:py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-8 lg:p-12"
          >

            {/* Featured Image */}
            {blog.image?.url && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img
                  src={blog.image.url}
                  alt={blog.image.alt || blog.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {blog.excerpt}
              </p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
                <Tag size={20} className="text-gray-400" />
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio */}
            <div className="bg-primary-50 rounded-2xl p-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {blog.author?.firstName?.charAt(0)}{blog.author?.lastName?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {blog.author?.firstName} {blog.author?.lastName}
                  </h3>
                  <p className="text-gray-600">
                    Rédacteur chez Bedeew Digital
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="section bg-white">
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Articles Similaires</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  to={`/blog/${relatedBlog.slug}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    {relatedBlog.image?.url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedBlog.image.url}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d'Aide pour Votre Projet Digital ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Contactez-nous pour discuter de vos besoins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/devis" className="btn-lg bg-white text-primary-600 hover:bg-gray-100">
              Demander un Devis
            </Link>
            <Link to="/contact" className="btn-lg border-2 border-white text-white hover:bg-white/10">
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
