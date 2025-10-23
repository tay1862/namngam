'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  nameTh?: string;
  nameEn?: string;
  nameZh?: string;
  description: string;
  descriptionTh?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  price?: string;
  image: string;
  features: string[];
  featuresTh?: string[];
  featuresEn?: string[];
  featuresZh?: string[];
  benefits: string[];
  benefitsTh?: string[];
  benefitsEn?: string[];
  benefitsZh?: string[];
  inStock: boolean;
  featured: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບສິນຄ້ານີ້?')) return;

    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('ເກີດຂໍ້ຜິດພາດໃນການລົບສິນຄ້າ');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ຈັດການສິນຄ້າ</h1>
          <p className="text-gray-400">ເພີ່ມ, ແກ້ໄຂ, ຫຼື ລົບສິນຄ້າ</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:shadow-lg transition-shadow"
        >
          <Plus className="w-5 h-5" />
          ເພີ່ມສິນຄ້າໃໝ່
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">ທັງໝົດ</p>
              <p className="text-2xl font-bold text-white">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Package className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">ມີສິນຄ້າ</p>
              <p className="text-2xl font-bold text-white">
                {products.filter((p) => p.inStock).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <Package className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">ສິນຄ້າແນະນຳ</p>
              <p className="text-2xl font-bold text-white">
                {products.filter((p) => p.featured).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all group"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-900">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-600" />
                </div>
              )}
              {product.featured && (
                <div className="absolute top-2 right-2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                  ແນະນຳ
                </div>
              )}
              {!product.inStock && (
                <div className="absolute top-2 left-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  ໝົດສະຕ໋ອກ
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
              {product.nameEn && (
                <p className="text-sm text-gray-400 mb-2">{product.nameEn}</p>
              )}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <p className="text-2xl font-bold text-amber-400 mb-4">{product.price}</p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setShowForm(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-xl transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  ແກ້ໄຂ
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  ລົບ
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show form modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            fetchProducts();
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Product Form Component
function ProductForm({
  product,
  onClose,
  onSuccess,
}: {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    nameTh: product?.nameTh || '',
    nameEn: product?.nameEn || '',
    nameZh: product?.nameZh || '',
    description: product?.description || '',
    descriptionTh: product?.descriptionTh || '',
    descriptionEn: product?.descriptionEn || '',
    descriptionZh: product?.descriptionZh || '',
    price: product?.price || '',
    image: product?.image || '',
    features: product?.features?.join('\n') || '',
    featuresTh: product?.featuresTh?.join('\n') || '',
    featuresEn: product?.featuresEn?.join('\n') || '',
    featuresZh: product?.featuresZh?.join('\n') || '',
    benefits: product?.benefits?.join('\n') || '',
    benefitsTh: product?.benefitsTh?.join('\n') || '',
    benefitsEn: product?.benefitsEn?.join('\n') || '',
    benefitsZh: product?.benefitsZh?.join('\n') || '',
    inStock: product?.inStock !== false,
    featured: product?.featured || false,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'lo' | 'th' | 'en' | 'zh'>('lo');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const url = product
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: formData.features.split('\n').filter((f) => f.trim()),
          featuresTh: formData.featuresTh.split('\n').filter((f) => f.trim()),
          featuresEn: formData.featuresEn.split('\n').filter((f) => f.trim()),
          featuresZh: formData.featuresZh.split('\n').filter((f) => f.trim()),
          benefits: formData.benefits.split('\n').filter((b) => b.trim()),
          benefitsTh: formData.benefitsTh.split('\n').filter((b) => b.trim()),
          benefitsEn: formData.benefitsEn.split('\n').filter((b) => b.trim()),
          benefitsZh: formData.benefitsZh.split('\n').filter((b) => b.trim()),
        }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert('ເກີດຂໍ້ຜິດພາດ');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {product ? 'ແກ້ໄຂສິນຄ້າ' : 'ເພີ່ມສິນຄ້າໃໝ່'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Language Tabs */}
          <div className="flex gap-2 bg-gray-800/70 border border-gray-700 rounded-xl p-2">
            <button
              type="button"
              onClick={() => setActiveTab('lo')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'lo' ? 'bg-amber-600 text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              🇱🇦 ລາວ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('th')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'th' ? 'bg-amber-600 text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              🇹🇭 ไทย
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'en' ? 'bg-amber-600 text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              🇬🇧 EN
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('zh')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'zh' ? 'bg-amber-600 text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              🇨🇳 中文
            </button>
          </div>

          {/* Lao Tab */}
          {activeTab === 'lo' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ຊື່ສິນຄ້າ (ລາວ) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ລາຍລະອຽດ (ລາວ) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ຄຸນສົມບັດ (ແຕ່ລະບັນທຶກຂຶ້ນບົດໃໝ່)
                </label>
                <textarea
                  rows={4}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="ໄມ້ກ່ຽງແທ້ 100%&#10;ຊ່ວຍຜ່ອນຄາຍກ້າມຊີ້ນໜ້າ"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ຜົນປະໂຫຍດ (ແຕ່ລະບັນທຶກຂຶ້ນບົດໃໝ່)
                </label>
                <textarea
                  rows={3}
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="ຜິວໜ້າກະຊັບ&#10;ຫຼຸດການບວມ"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Thai Tab */}
          {activeTab === 'th' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ชื่อสินค้า (ไทย)
                </label>
                <input
                  type="text"
                  value={formData.nameTh}
                  onChange={(e) => setFormData({ ...formData, nameTh: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  placeholder="ถ้าไม่ใส่ จะใช้ภาษาลาว"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  รายละเอียด (ไทย)
                </label>
                <textarea
                  rows={3}
                  value={formData.descriptionTh}
                  onChange={(e) => setFormData({ ...formData, descriptionTh: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  placeholder="ถ้าไม่ใส่ จะใช้ภาษาลาว"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  คุณสมบัติ (แต่ละบรรทัดขึ้นบรรทัดใหม่)
                </label>
                <textarea
                  rows={4}
                  value={formData.featuresTh}
                  onChange={(e) => setFormData({ ...formData, featuresTh: e.target.value })}
                  placeholder="หยกแท้ 100%&#10;ช่วยผ่อนคลายกล้ามเนื้อ"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ผลประโยชน์ (แต่ละบรรทัดขึ้นบรรทัดใหม่)
                </label>
                <textarea
                  rows={3}
                  value={formData.benefitsTh}
                  onChange={(e) => setFormData({ ...formData, benefitsTh: e.target.value })}
                  placeholder="ผิวกระชับ&#10;ลดการบวม"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* English Tab */}
          {activeTab === 'en' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name (English)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  placeholder="If empty, will use Lao"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  placeholder="If empty, will use Lao"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.featuresEn}
                  onChange={(e) => setFormData({ ...formData, featuresEn: e.target.value })}
                  placeholder="100% Authentic Jade&#10;Relaxes facial muscles"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Benefits (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.benefitsEn}
                  onChange={(e) => setFormData({ ...formData, benefitsEn: e.target.value })}
                  placeholder="Firm skin&#10;Reduce swelling"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Chinese Tab */}
          {activeTab === 'zh' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  产品名称 (中文)
                </label>
                <input
                  type="text"
                  value={formData.nameZh}
                  onChange={(e) => setFormData({ ...formData, nameZh: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  placeholder="如果为空，将使用老挝语"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  产品描述 (中文)
                </label>
                <textarea
                  rows={3}
                  value={formData.descriptionZh}
                  onChange={(e) => setFormData({ ...formData, descriptionZh: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  placeholder="如果为空，将使用老挝语"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  特点 (每行一个)
                </label>
                <textarea
                  rows={4}
                  value={formData.featuresZh}
                  onChange={(e) => setFormData({ ...formData, featuresZh: e.target.value })}
                  placeholder="100%真玉&#10;放松面部肌肉"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  益处 (每行一个)
                </label>
                <textarea
                  rows={3}
                  value={formData.benefitsZh}
                  onChange={(e) => setFormData({ ...formData, benefitsZh: e.target.value })}
                  placeholder="紧致肌肤&#10;减少肿胀"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Common Fields - Price, Image, Checkboxes */}
          <div className="pt-4 border-t border-gray-700 space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ລາຄາ (ຖ້າບໍ່ໃສ່ຈະສະແດງ &quot;ສອບຖາມລາຄາ&quot;)
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="250,000 ກີບ (ໃສ່ຫຼືບໍ່ໃສ່ກໍ່ໄດ້)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ຮູບພາບສິນຄ້າ *
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-600 file:text-black file:font-semibold hover:file:bg-amber-700 disabled:opacity-50"
              />
              {formData.image && (
                <div className="relative w-full h-48 bg-gray-800 rounded-xl overflow-hidden">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              {uploading && (
                <p className="text-sm text-amber-400">ກຳລັງອັບໂຫຼດ...</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData({ ...formData, inStock: e.target.checked })
                }
                className="w-5 h-5 rounded bg-gray-800 border-gray-700"
              />
              <span className="text-white">ມີສິນຄ້າ</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-5 h-5 rounded bg-gray-800 border-gray-700"
              />
              <span className="text-white">ສິນຄ້າແນະນຳ</span>
            </label>
          </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              {loading ? 'ກຳລັງບັນທຶກ...' : 'ບັນທຶກ'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
