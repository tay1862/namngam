'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Save, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface BenefitItem {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  icon?: string;
  image?: string;
  published: boolean;
  order: number;
}

export default function BenefitsManagementPage() {
  const [benefits, setBenefits] = useState<BenefitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<BenefitItem>>({
    title: '',
    titleEn: '',
    description: '',
    icon: '',
    image: '',
    published: true,
    order: 0,
  });

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const res = await fetch('/api/admin/benefits');
      const data = await res.json();
      setBenefits(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
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
      const url = editingId ? `/api/admin/benefits/${editingId}` : '/api/admin/benefits';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchBenefits();
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (benefit: BenefitItem) => {
    setFormData(benefit);
    setEditingId(benefit.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບ?')) return;

    try {
      await fetch(`/api/admin/benefits/${id}`, { method: 'DELETE' });
      await fetchBenefits();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      titleEn: '',
      description: '',
      icon: '',
      image: '',
      published: true,
      order: 0,
    });
    setEditingId(null);
  };

  if (loading && benefits.length === 0) {
    return <div className="p-6 text-white">ກຳລັງໂຫຼດ...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ຈັດການຜົນປະໂຫຍດ (Benefits)</h1>
            <p className="text-gray-400 text-sm">ແກ້ໄຂເນື້ອຫາຜົນປະໂຫຍດຂອງກັວຊາ</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ຫົວຂໍ້ (ລາວ) *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ຫົວຂໍ້ (English)
              </label>
              <input
                type="text"
                value={formData.titleEn || ''}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ລາຍລະອຽດ *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon (emoji ຫຼື text)
              </label>
              <input
                type="text"
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="✨, 💆‍♀️, ໜ້າກະຊັບ"
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ລຳດັບ
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-900/50"
                />
                <span className="text-gray-300">ເຜີຍແຜ່</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ຮູບພາບ (ຖ້າມີ)
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white"
                disabled={uploading}
              />
              {formData.image && (
                <div className="relative w-32 h-32">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || uploading}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              <Save className="w-5 h-5 inline mr-2" />
              {editingId ? 'ອັບເດດ' : 'ເພີ່ມໃໝ່'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                ຍົກເລີກ
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-4">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                {benefit.icon && (
                  <span className="text-3xl">{benefit.icon}</span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
                  {benefit.titleEn && (
                    <p className="text-gray-400 text-sm">{benefit.titleEn}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(benefit)}
                  className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
                >
                  ແກ້ໄຂ
                </button>
                <button
                  onClick={() => handleDelete(benefit.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{benefit.description}</p>
            {benefit.image && (
              <div className="mt-4 relative w-full h-32">
                <Image src={benefit.image} alt={benefit.title} fill className="object-cover rounded-lg" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
