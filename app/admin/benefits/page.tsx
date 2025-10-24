'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Save, Trash2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import MultiLanguageTabs, { MultiLanguageInput, Language } from '@/app/components/MultiLanguageTabs';
import ImageUpload from '@/app/components/ImageUpload';

interface BenefitItem {
  id: string;
  title: string;
  titleTh?: string;
  titleEn?: string;
  titleZh?: string;
  description: string;
  descriptionTh?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  icon?: string;
  image?: string;
  published: boolean;
  order: number;
}

export default function BenefitsManagementPage() {
  const [benefits, setBenefits] = useState<BenefitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<BenefitItem>>({
    title: '',
    titleTh: '',
    titleEn: '',
    titleZh: '',
    description: '',
    descriptionTh: '',
    descriptionEn: '',
    descriptionZh: '',
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
      toast.error('ໂຫຼດຂໍ້ມູນລົ້ມເຫລວ');
    } finally {
      setLoading(false);
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
        toast.success(editingId ? 'ອັບເດດສຳເລັດ' : 'ເພີ່ມສຳເລັດ');
        await fetchBenefits();
        resetForm();
      } else {
        toast.error('ລົ້ມເຫລວ');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('ເກີດຂໍ້ຜິດພາດ');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (benefit: BenefitItem) => {
    setFormData(benefit);
    setEditingId(benefit.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບ?')) return;

    try {
      await fetch(`/api/admin/benefits/${id}`, { method: 'DELETE' });
      toast.success('ລຶບສຳເລັດ');
      await fetchBenefits();
    } catch (error) {
      console.error('Error:', error);
      toast.error('ລຶບລົ້ມເຫລວ');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      titleTh: '',
      titleEn: '',
      titleZh: '',
      description: '',
      descriptionTh: '',
      descriptionEn: '',
      descriptionZh: '',
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ຈັດການປະໂຫຍດ (Benefits)</h1>
            <p className="text-gray-400 text-sm">ແກ້ໄຂປະໂຫຍດຂອງ Gua Sha - 4 ພາສາ</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Multi-Language Tabs */}
          <MultiLanguageTabs>
            {(activeTab: Language) => (
              <div className="space-y-4">
                <MultiLanguageInput
                  label="ຫົວຂໍ້"
                  baseId="title"
                  currentLang={activeTab}
                  value={
                    activeTab === 'lo' ? formData.title || '' :
                    activeTab === 'th' ? formData.titleTh || '' :
                    activeTab === 'en' ? formData.titleEn || '' :
                    formData.titleZh || ''
                  }
                  onChange={(value) => {
                    if (activeTab === 'lo') setFormData({ ...formData, title: value });
                    else if (activeTab === 'th') setFormData({ ...formData, titleTh: value });
                    else if (activeTab === 'en') setFormData({ ...formData, titleEn: value });
                    else setFormData({ ...formData, titleZh: value });
                  }}
                  required
                  type="text"
                />

                <MultiLanguageInput
                  label="ລາຍລະອຽດ"
                  baseId="description"
                  currentLang={activeTab}
                  value={
                    activeTab === 'lo' ? formData.description || '' :
                    activeTab === 'th' ? formData.descriptionTh || '' :
                    activeTab === 'en' ? formData.descriptionEn || '' :
                    formData.descriptionZh || ''
                  }
                  onChange={(value) => {
                    if (activeTab === 'lo') setFormData({ ...formData, description: value });
                    else if (activeTab === 'th') setFormData({ ...formData, descriptionTh: value });
                    else if (activeTab === 'en') setFormData({ ...formData, descriptionEn: value });
                    else setFormData({ ...formData, descriptionZh: value });
                  }}
                  required
                  type="textarea"
                  rows={4}
                />
              </div>
            )}
          </MultiLanguageTabs>

          {/* Image & Icon */}
          <div className="grid md:grid-cols-2 gap-6">
            <ImageUpload
              label="ຮູບພາບ"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              aspectRatio="square"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon (Emoji ຫຼື Unicode)
              </label>
              <input
                type="text"
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                placeholder="✨ 💆‍♀️ 🌸"
              />
              <p className="text-xs text-gray-500 mt-1">
                ໃຊ້ Emoji ຫຼື Icon ທີ່ຕ້ອງການ
              </p>
            </div>
          </div>

          {/* Other Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ລຳດັບການສະແດງ
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-900/50 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-gray-300">ເຜີຍແຜ່</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-medium"
            >
              <Save className="w-5 h-5 inline mr-2" />
              {editingId ? 'ອັບເດດ' : 'ເພີ່ມໃໝ່'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                ຍົກເລີກ
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">ລາຍການທັງໝົດ ({benefits.length})</h2>
        {benefits.map((benefit) => (
          <div key={benefit.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  {benefit.image && (
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image src={benefit.image} alt="Benefit" fill className="object-cover rounded-lg" />
                    </div>
                  )}
                  {benefit.icon && (
                    <div className="text-4xl flex-shrink-0">{benefit.icon}</div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <div className="space-y-1 text-sm">
                      {benefit.titleTh && (
                        <p className="text-gray-400">🇹🇭 {benefit.titleTh}</p>
                      )}
                      {benefit.titleEn && (
                        <p className="text-gray-400">🇺🇸 {benefit.titleEn}</p>
                      )}
                      {benefit.titleZh && (
                        <p className="text-gray-400">🇨🇳 {benefit.titleZh}</p>
                      )}
                    </div>
                    <p className="text-gray-300 mt-3 line-clamp-2">{benefit.description}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                        Order: {benefit.order}
                      </span>
                      {benefit.published ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                          ເຜີຍແຜ່
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                          ບໍ່ເຜີຍແຜ່
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(benefit)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ແກ້ໄຂ
                </button>
                <button
                  onClick={() => handleDelete(benefit.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
