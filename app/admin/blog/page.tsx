'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບບົດຄວາມນີ້?')) return;

    try {
      await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (error) {
      console.error('Error:', error);
      alert('ເກີດຂໍ້ຜິດພາດ');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  if (showForm) {
    return (
      <BlogForm
        post={editingPost}
        onClose={() => {
          setShowForm(false);
          setEditingPost(null);
        }}
        onSuccess={() => {
          fetchPosts();
          setShowForm(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ຈັດການບົດຄວາມ</h1>
          <p className="text-gray-400">ສ້າງແລະແກ້ໄຂບົດຄວາມ</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl"
        >
          <Plus className="w-5 h-5" />
          ສ້າງບົດຄວາມໃໝ່
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">ທັງໝົດ</p>
              <p className="text-2xl font-bold text-white">{posts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">ເຜີຍແຜ່ແລ້ວ</p>
              <p className="text-2xl font-bold text-white">
                {posts.filter((p) => p.published).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <FileText className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">ແນະນຳ</p>
              <p className="text-2xl font-bold text-white">
                {posts.filter((p) => p.featured).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">ທັງໝົດ</p>
              <p className="text-2xl font-bold text-white">
                {posts.reduce((sum, p) => sum + p.views, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-gray-400 font-medium">ຫົວຂໍ້</th>
              <th className="px-6 py-4 text-left text-gray-400 font-medium">ໝວດໝູ່</th>
              <th className="px-6 py-4 text-left text-gray-400 font-medium">ສະຖານະ</th>
              <th className="px-6 py-4 text-left text-gray-400 font-medium">ຜູ້ເຂົ້າຊົມ</th>
              <th className="px-6 py-4 text-right text-gray-400 font-medium">ຈັດການ</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700/30">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-white">{post.title}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{post.excerpt}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {post.published ? (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                      ເຜີຍແຜ່
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 text-sm rounded-full">
                      ຮ່າງ
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-white">{post.views}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setShowForm(true);
                      }}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Blog Form Component (Simple)
function BlogForm({
  post,
  onClose,
  onSuccess,
}: {
  post: BlogPost | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    category: post?.category || 'ທົ່ວໄປ',
    published: post?.published || false,
    featured: post?.featured || false,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
      || `blog-${Date.now()}`;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      const data = await res.json();
      
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('ອັບໂຫຼດຮູບລົ້ມເຫລວ');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = post ? 'PUT' : 'POST';

      // Generate slug if creating new post
      const submitData = {
        ...formData,
        slug: post?.slug || generateSlug(formData.title),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert('ເກີດຂໍ້ຜິດພາດ');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('ເກີດຂໍ້ຜິດພາດ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          {post ? 'ແກ້ໄຂບົດຄວາມ' : 'ສ້າງບົດຄວາມໃໝ່'}
        </h1>
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-400 hover:text-white"
        >
          ກັບຄືນ
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ຫົວຂໍ້ *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ສະຫຼຸບສັ້ນ *
            </label>
            <textarea
              required
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ເນື້ອຫາ *
            </label>
            <textarea
              required
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="ເນື້ອຫາບົດຄວາມ (Markdown supported)"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ຮູບພາບບົດຄວາມ *
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-600 file:text-black file:font-semibold hover:file:bg-amber-700 disabled:opacity-50"
              />
              {formData.image && (
                <div className="relative w-full h-48 bg-gray-800 rounded-xl overflow-hidden">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {uploading && (
                <p className="text-sm text-amber-400">ກຳລັງອັບໂຫຼດ...</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ໝວດໝູ່
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5"
              />
              <span className="text-white">ເຜີຍແຜ່</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-5 h-5"
              />
              <span className="text-white">ແນະນຳ</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700"
          >
            ຍົກເລີກ
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl disabled:opacity-50"
          >
            {loading ? 'ກຳລັງບັນທຶກ...' : 'ບັນທຶກ'}
          </button>
        </div>
      </form>
    </div>
  );
}
