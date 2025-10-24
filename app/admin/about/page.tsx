'use client';

import { useState, useEffect } from 'react';
import { Info, Save, Trash2, Languages } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import MultiLanguageTabs, { MultiLanguageInput, Language } from '@/app/components/MultiLanguageTabs';
import ImageUpload from '@/app/components/ImageUpload';

interface AboutSection {
  id: string;
  title: string;
  titleTh?: string;
  titleEn?: string;
  titleZh?: string;
  description: string;
  descriptionTh?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  image?: string;
  backgroundType?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  videoUrl?: string;
  published: boolean;
  order: number;
}

export default function AboutManagementPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);

  const [formData, setFormData] = useState<Partial<AboutSection>>({
    title: '',
    titleTh: '',
    titleEn: '',
    titleZh: '',
    description: '',
    descriptionTh: '',
    descriptionEn: '',
    descriptionZh: '',
    image: '',
    backgroundType: 'image',
    backgroundImage: '',
    backgroundColor: '#fdf2f8',
    videoUrl: '',
    published: true,
    order: 0,
  });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/admin/about');
      const data = await res.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('ໂຫຼດຂໍ້ມູນລົ້ມເຫລວ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/admin/about/${editingId}` : '/api/admin/about';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? 'ອັບເດດສຳເລັດ' : 'ເພີ່ມສຳເລັດ');
        await fetchSections();
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

  const handleEdit = (section: AboutSection) => {
    setFormData(section);
    setEditingId(section.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບ?')) return;

    try {
      await fetch(`/api/admin/about/${id}`, { method: 'DELETE' });
      toast.success('ລຶບສຳເລັດ');
      await fetchSections();
    } catch (error) {
      console.error('Error:', error);
      toast.error('ລຶບລົ້ມເຫລວ');
    }
  };

  const handleAutoTranslate = async () => {
    if (!formData.title || !formData.description) {
      toast.error('ກະລຸນາກຣອກຂໍ້ມູນພາສາລາວກ່ອນ');
      return;
    }

    setTranslating(true);
    const toastId = toast.loading('ກຳລັງແປນພາສາອັດຕະໂນມັດ...');

    try {
      // Translate to all languages in parallel
      const [titleTh, titleEn, titleZh, descTh, descEn, descZh] = await Promise.all([
        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: formData.title, targetLang: 'th' }),
        }).then(r => r.json()).then(d => d.translatedText),
        
        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: formData.title, targetLang: 'en' }),
        }).then(r => r.json()).then(d => d.translatedText),
        
        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: formData.title, targetLang: 'zh' }),
        }).then(r => r.json()).then(d => d.translatedText),
        
        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: formData.description, targetLang: 'th' }),
        }).then(r => r.json()).then(d => d.translatedText),
        
        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: formData.description, targetLang: 'en' }),
        }).then(r => r.json()).then(d => d.translatedText),
        
        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: formData.description, targetLang: 'zh' }),
        }).then(r => r.json()).then(d => d.translatedText),
      ]);

      setFormData({
        ...formData,
        titleTh,
        titleEn,
        titleZh,
        descriptionTh: descTh,
        descriptionEn: descEn,
        descriptionZh: descZh,
      });

      toast.success('ແປນສຳເລັດ! ກະລຸນາກວດສອບແລະແກ້ໄຂຖ້າຈຳເປັນ', { id: toastId });
    } catch (error) {
      console.error('Translation error:', error);
      toast.error('ແປນລົ້ມເຫລວ', { id: toastId });
    } finally {
      setTranslating(false);
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
      image: '',
      backgroundType: 'image',
      backgroundImage: '',
      backgroundColor: '#fdf2f8',
      videoUrl: '',
      published: true,
      order: 0,
    });
    setEditingId(null);
  };

  if (loading && sections.length === 0) {
    return <div className="p-6 text-white">ກຳລັງໂຫຼດ...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ຈັດການໜ້າກ່ຽວກັບ (About)</h1>
            <p className="text-gray-400 text-sm">ແກ້ໄຂເນື້ອຫາໜ້າກ່ຽວກັບເຮົາ - 4 ພາສາ</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Auto-Translate Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAutoTranslate}
              disabled={translating || !formData.title}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-medium flex items-center gap-2"
            >
              <Languages className="w-5 h-5" />
              {translating ? 'ກຳລັງແປນ...' : '🪄 ແປນອັດຕະໂນມັດ (ທຸກພາສາ)'}
            </button>
          </div>

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
                  label="ເນື້ອຫາ"
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
                  rows={6}
                />
              </div>
            )}
          </MultiLanguageTabs>

          {/* Images */}
          <div className="grid md:grid-cols-2 gap-6">
            <ImageUpload
              label="ຮູບພາບຫຼັກ"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              aspectRatio="video"
            />

            {formData.backgroundType === 'image' && (
              <ImageUpload
                label="ຮູບພາບພື້ນຫຼັງ"
                value={formData.backgroundImage}
                onChange={(url) => setFormData({ ...formData, backgroundImage: url })}
                aspectRatio="video"
              />
            )}
          </div>

          {/* Background Settings */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ປະເພດພື້ນຫຼັງ
              </label>
              <select
                value={formData.backgroundType}
                onChange={(e) => setFormData({ ...formData, backgroundType: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                <option value="image">ຮູບພາບ</option>
                <option value="gradient">ສີເກຣດຽນ</option>
                <option value="solid">ສີທຶບ</option>
              </select>
            </div>

            {(formData.backgroundType === 'solid' || formData.backgroundType === 'gradient') && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {formData.backgroundType === 'gradient' ? 'Tailwind Gradient Class' : 'Hex Color'}
                </label>
                <input
                  type="text"
                  value={formData.backgroundColor || ''}
                  onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  placeholder={formData.backgroundType === 'gradient' 
                    ? 'from-pink-50 via-white to-rococo-50'
                    : '#fdf2f8'}
                />
              </div>
            )}
          </div>

          {/* Other Fields */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={formData.videoUrl || ''}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ລຳດັບ
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
        <h2 className="text-xl font-bold text-white">ລາຍການທັງໝົດ ({sections.length})</h2>
        {sections.map((section) => (
          <div key={section.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  {section.image && (
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image src={section.image} alt="Main" fill className="object-cover rounded-lg" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {section.title}
                    </h3>
                    <div className="space-y-1 text-sm">
                      {section.titleTh && (
                        <p className="text-gray-400">🇹🇭 {section.titleTh}</p>
                      )}
                      {section.titleEn && (
                        <p className="text-gray-400">🇺🇸 {section.titleEn}</p>
                      )}
                      {section.titleZh && (
                        <p className="text-gray-400">🇨🇳 {section.titleZh}</p>
                      )}
                    </div>
                    <p className="text-gray-300 mt-3 line-clamp-2">{section.description}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                        Order: {section.order}
                      </span>
                      {section.published ? (
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
                  onClick={() => handleEdit(section)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ແກ້ໄຂ
                </button>
                <button
                  onClick={() => handleDelete(section.id)}
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
