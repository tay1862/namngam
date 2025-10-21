'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  HelpCircle, 
  Users, 
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'ໜ້າຫຼັກ', href: '/admin/dashboard' },
  { icon: Package, label: 'ຈັດການສິນຄ້າ', href: '/admin/products' },
  { icon: FileText, label: 'ຈັດການບົດຄວາມ', href: '/admin/blog' },
  { icon: HelpCircle, label: 'ຄຳຖາມທີ່ພົບເລື້ອຍ', href: '/admin/faq' },
  { icon: Users, label: 'ຜູ້ສະໝັກຮັບຂ່າວສານ', href: '/admin/subscribers' },
  { icon: Settings, label: 'ຕັ້ງຄ່າເວັບໄຊທ໌', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900/95 backdrop-blur-xl border-r border-amber-500/20 z-50 hidden lg:block">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-amber-500/20">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-12 h-12 relative">
              <Image
              src="/Logo-namngam-white.png"
                alt="NAMNGAM"
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                NAMNGAM
              </h1>
              <p className="text-xs text-gray-500">ລະບົບຈັດການ</p>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-amber-500/20">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">ອອກຈາກລະບົບ</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-500/20">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Sparkles className="w-4 h-4" />
            <span>Made with ❤️ in Laos</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
