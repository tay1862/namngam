'use client';

import { useState, useEffect } from 'react';
import { Download, Trash2 } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/subscribers');
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບຜູ້ສະໝັກນີ້?')) return;

    try {
      await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' });
      fetchSubscribers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Email', 'Status', 'Source', 'Created At'],
      ...subscribers.map((s) => [s.email, s.status, s.source, s.createdAt]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ຜູ້ສະໝັກຮັບຂ່າວສານ</h1>
          <p className="text-gray-400">{subscribers.length} ຜູ້ສະໝັກ</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-gray-400 font-medium">ອີເມວ</th>
              <th className="px-6 py-4 text-left text-gray-400 font-medium">ສະຖານະ</th>
              <th className="px-6 py-4 text-left text-gray-400 font-medium">ແຫຼ່ງ</th>
              <th className="px-6 py-4 text-left text-gray-400 font-medium">ວັນທີ່</th>
              <th className="px-6 py-4 text-right text-gray-400 font-medium">ຈັດການ</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-t border-gray-700">
                <td className="px-6 py-4 text-white">{subscriber.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                    {subscriber.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{subscriber.source}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(subscriber.createdAt).toLocaleDateString('lo-LA')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleDelete(subscriber.id)}
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
