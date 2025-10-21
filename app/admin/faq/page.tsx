'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/admin/faq');
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບ FAQ ນີ້?')) return;

    try {
      await fetch(`/api/admin/faq/${id}`, { method: 'DELETE' });
      fetchFaqs();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent, formData: Partial<FAQ>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingFaq ? `/api/admin/faq/${editingFaq.id}` : '/api/admin/faq';
      const method = editingFaq ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      fetchFaqs();
      setShowForm(false);
      setEditingFaq(null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && faqs.length === 0) {
    return <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ຈັດການ FAQ</h1>
          <p className="text-gray-400">ຄຳຖາມທີ່ພົບເລື້ອຍ</p>
        </div>
        <button
          onClick={() => {
            setEditingFaq(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl"
        >
          <Plus className="w-5 h-5" />
          ເພີ່ມ FAQ ໃໝ່
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                  </div>
                  <p className="text-gray-400 ml-8">{faq.answer}</p>
                  <div className="flex gap-2 mt-3 ml-8">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                      {faq.category}
                    </span>
                    {faq.published && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        ເຜີຍແຜ່
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setShowForm(true);
                    }}
                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <FAQForm
          faq={editingFaq}
          onClose={() => {
            setShowForm(false);
            setEditingFaq(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

function FAQForm({ faq, onClose, onSubmit }: { faq: FAQ | null; onClose: () => void; onSubmit: (e: React.FormEvent, formData: Partial<FAQ>) => void }) {
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'ທົ່ວໄປ',
    order: faq?.order || 0,
    published: faq?.published !== false,
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-white mb-6">
          {faq ? 'ແກ້ໄຂ FAQ' : 'ເພີ່ມ FAQ ໃໝ່'}
        </h2>

        <form onSubmit={(e) => onSubmit(e, formData)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ຄຳຖາມ *
            </label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ຄຳຕອບ *
            </label>
            <textarea
              required
              rows={5}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ໝວດໝູ່
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ລຳດັບ
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
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
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-xl"
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl"
            >
              ບັນທຶກ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
