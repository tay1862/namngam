'use client';

import { useState, useEffect } from 'react';
import { Info, Save, Upload, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface AboutSection {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
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
  const [uploading, setUploading] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'backgroundImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.url) {
        setFormData(prev => ({ ...prev, [field]: data.url }));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('ອັບໂຫຼດຮູບລົ້ມເຫລວ');
    } finally {
      setUploading(false);
    }
  };

  const [formData, setFormData] = useState<Partial<AboutSection>>({
    title: '',
    titleEn: '',
    description: '',
    image: '',
    backgroundType: 'image',
    backgroundImage: '',
    backgroundColor: '#fdf2f8',
    videoUrl: '',
    published: true,
    order: 0,
  });

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
        await fetchSections();
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section: AboutSection) => {
    setFormData(section);
    setEditingId(section.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບ?')) return;

    try {
      await fetch(`/api/admin/about/${id}`, { method: 'DELETE' });
      await fetchSections();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      titleEn: '',
      description: '',
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ຈັດການໜ້າກ່ຽວກັບ (About)</h1>
            <p className="text-gray-400 text-sm">ແກ້ໄຂເນື້ອຫາໜ້າກ່ຽວກັບເຮົາ</p>
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
              ເນື້ອຫາ *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Main Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ຮູບພາບຫຼັກ
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'image')}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white"
                  disabled={uploading}
                />
                {formData.image && (
                  <div className="relative w-full h-32">
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

            {/* Background Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ປະເພດພື້ນຫຼັງ
              </label>
              <div className="space-y-2">
                <select
                  value={formData.backgroundType}
                  onChange={(e) => setFormData({ ...formData, backgroundType: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
                >
                  <option value="image">ຮູບພາບ</option>
                  <option value="gradient">ສີເກຣດຽນ</option>
                  <option value="solid">ສີທຶບ</option>
                </select>
                
                {formData.backgroundType === 'image' && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'backgroundImage')}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white"
                      disabled={uploading}
                    />
                    {formData.backgroundImage && (
                      <div className="relative w-full h-32">
                        <Image
                          src={formData.backgroundImage}
                          alt="Background Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </>
                )}
                
                {(formData.backgroundType === 'solid' || formData.backgroundType === 'gradient') && (
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      {formData.backgroundType === 'gradient' 
                        ? 'Tailwind Gradient Class (e.g., from-pink-50 via-white to-rococo-50)'
                        : 'Hex Color (e.g., #fdf2f8)'}
                    </label>
                    <input
                      type="text"
                      value={formData.backgroundColor || ''}
                      onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm"
                      placeholder={formData.backgroundType === 'gradient' 
                        ? 'from-pink-50 via-white to-rococo-50'
                        : '#fdf2f8'}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={formData.videoUrl || ''}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
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

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || uploading}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
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
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                {section.titleEn && (
                  <p className="text-gray-400 text-sm mb-2">{section.titleEn}</p>
                )}
                <p className="text-gray-300 mb-4">{section.description.substring(0, 150)}...</p>
                <div className="flex gap-4 items-center">
                  {section.image && (
                    <div className="relative w-24 h-24">
                      <Image src={section.image} alt="Main" fill className="object-cover rounded-lg" />
                    </div>
                  )}
                  {section.backgroundImage && (
                    <div className="relative w-24 h-24">
                      <Image src={section.backgroundImage} alt="Background" fill className="object-cover rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(section)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  ແກ້ໄຂ
                </button>
                <button
                  onClick={() => handleDelete(section.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
