import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, User, ArrowLeft, Tag, Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
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

      {/* Article */}
      <article className="section">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium capitalize">
                  {blog.category}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
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

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {blog.title}
              </h1>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {blog.author?.firstName?.charAt(0)}{blog.author?.lastName?.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {blog.author?.firstName} {blog.author?.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {blog.views || 0} vues
                  </div>
                </div>
              </div>
            </div>

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
