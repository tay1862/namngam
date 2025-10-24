'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Shield, User, Mail, Key, AlertTriangle } from 'lucide-react';
import { canManageUsers, getRoleDisplayName, getAllRoles } from '@/lib/rbac';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor' as string,
  });

  // Check permission
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated' && !canManageUsers(session?.user?.role)) {
      toast.error('ທ່ານບໍ່ມີສິດເຂົ້າເຖິງໜ້ານີ້');
      router.push('/admin/dashboard');
    }
  }, [status, session, router]);

  // Fetch users
  useEffect(() => {
    if (status === 'authenticated' && canManageUsers(session?.user?.role)) {
      fetchUsers();
    }
  }, [status, session]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error('ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ');
      }
    } catch (error) {
      toast.error('ເກີດຂໍ້ຜິດພາດ');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'editor',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '', role: 'editor' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingUser
        ? `/api/admin/users/${editingUser.id}`
        : '/api/admin/users';
      
      const response = await fetch(url, {
        method: editingUser ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingUser ? 'ອັບເດດສຳເລັດ' : 'ສ້າງຜູ້ໃຊ້ສຳເລັດ');
        handleCloseModal();
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.error || 'ເກີດຂໍ້ຜິດພາດ');
      }
    } catch (error) {
      toast.error('ເກີດຂໍ້ຜິດພາດ');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('ລົບຜູ້ໃຊ້ສຳເລັດ');
        setShowDeleteConfirm(null);
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.error || 'ເກີດຂໍ້ຜິດພາດ');
      }
    } catch (error) {
      toast.error('ເກີດຂໍ້ຜິດພາດ');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'admin':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'editor':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ຈັດການຜູ້ໃຊ້</h1>
          <p className="text-gray-400">ເພີ່ມ ແກ້ໄຂ ຫຼື ລົບຜູ້ໃຊ້ລະບົບ</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all"
        >
          <Plus className="w-5 h-5" />
          ເພີ່ມຜູ້ໃຊ້ໃໝ່
        </motion.button>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-amber-500/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ຜູ້ໃຊ້</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ອີເມວ</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ສິດທິ່</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ວັນທີສ້າງ</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        {user.id === session?.user?.id && (
                          <span className="text-xs text-amber-400">(ທ່ານ)</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                      <Shield className="w-3 h-3" />
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString('lo-LA')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleOpenModal(user)}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      {user.id !== session?.user?.id && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowDeleteConfirm(user.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-amber-500/20 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingUser ? 'ແກ້ໄຂຜູ້ໃຊ້' : 'ເພີ່ມຜູ້ໃຊ້ໃໝ່'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ຊື່
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    placeholder="ຊື່ຜູ້ໃຊ້"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ອີເມວ
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ລະຫັດຜ່ານ {editingUser && <span className="text-gray-500">(ປ່ອຍວ່າງຖ້າບໍ່ປ່ຽນ)</span>}
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                    minLength={8}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    placeholder="ຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ສິດທິ່
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    disabled={editingUser?.id === session?.user?.id}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 disabled:opacity-50"
                  >
                    {getAllRoles().map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {getAllRoles().find(r => r.value === formData.role)?.description}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                >
                  ຍົກເລີກ
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all"
                >
                  {editingUser ? 'ບັນທຶກ' : 'ສ້າງຜູ້ໃຊ້'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-red-500/20 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">ຢືນຢັນການລົບ</h3>
            </div>
            <p className="text-gray-400 mb-6">
              ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບຜູ້ໃຊ້ນີ້? ການກະທຳນີ້ບໍ່ສາມາດຍົກເລີກໄດ້.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                ຍົກເລີກ
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
              >
                ລົບຜູ້ໃຊ້
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
