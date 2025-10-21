'use client';

import { useSession } from 'next-auth/react';
import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 bg-gray-900/50 backdrop-blur-xl border-b border-amber-500/20">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="ຄົ້ນຫາ..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/30 rounded-xl border border-gray-700">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">{session?.user?.name || 'Admin'}</p>
              <p className="text-gray-500 text-xs">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
