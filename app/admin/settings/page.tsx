'use client';

import { useState } from 'react';
import { Settings, Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'NAMNGAM',
    siteNameLao: 'ນຳງາມ',
    siteDescription: 'ກັວຊາ ສຸຂະພາບແລະຄວາມງາມ',
    email: 'Namngambrand@gmail.com',
    phone: '+856 20 55 485 622',
    whatsapp: '+856 20 55 485 622',
    facebook: 'https://www.facebook.com/profile.php?id=61576657104465',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      alert('ບັນທຶກສຳເລັດ!');
    } catch (error) {
      console.error('Error:', error);
      alert('ເກີດຂໍ້ຜິດພາດ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">ຕັ້ງຄ່າເວັບໄຊທ໌</h1>
        <p className="text-gray-400">ຈັດການຂໍ້ມູນເວັບໄຊທ໌</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            ຂໍ້ມູນພື້ນຖານ
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ຊື່ເວັບໄຊທ໌ (English)
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ຊື່ເວັບໄຊທ໌ (ລາວ)
              </label>
              <input
                type="text"
                value={settings.siteNameLao}
                onChange={(e) => setSettings({ ...settings, siteNameLao: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ຄຳອະທິບາຍ
            </label>
            <textarea
              rows={3}
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">ຂໍ້ມູນຕິດຕໍ່</h2>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ອີເມວ
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ເບີໂທລະສັບ
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              value={settings.facebook}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? 'ກຳລັງບັນທຶກ...' : 'ບັນທຶກການຕັ້ງຄ່າ'}
        </button>
      </form>
    </div>
  );
}
