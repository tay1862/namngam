import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { 
  Package, 
  FileText, 
  Users, 
  TrendingUp,
  Eye,
  ShoppingBag 
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // Get stats
  const [productsCount, blogPostsCount, subscribersCount, publishedPosts] = await Promise.all([
    prisma.product.count(),
    prisma.blogPost.count(),
    prisma.subscriber.count(),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  const stats = [
    {
      icon: Package,
      label: 'ຈຳນວນສິນຄ້າ',
      value: productsCount,
      change: '+2 ມື້ນີ້',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileText,
      label: 'ບົດຄວາມ',
      value: `${publishedPosts}/${blogPostsCount}`,
      change: 'ເຜີຍແຜ່ແລ້ວ',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Users,
      label: 'ຜູ້ສະໝັກຮັບຂ່າວສານ',
      value: subscribersCount,
      change: '+5 ອາທິດນີ້',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Eye,
      label: 'ຜູ້ເຂົ້າຊົມ',
      value: '1.2K',
      change: '+12% ມື້ນີ້',
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          ສະບາຍດີ, {session?.user?.name || 'Admin'}! 👋
        </h1>
        <p className="text-gray-400">ນີ້ແມ່ນພາບລວມຂອງເວັບໄຊທ໌ NAMNGAM</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">ກິດຈະກຳລ່າສຸດ</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">ເພີ່ມບົດຄວາມໃໝ່</p>
                <p className="text-gray-500 text-xs">5 ນາທີ​ຜ່ານມາ</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">ອັບເດດສິນຄ້າ</p>
                <p className="text-gray-500 text-xs">2 ຊົ່ວໂມງຜ່ານມາ</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">ຜູ້ສະໝັກຮັບຂ່າວສານໃໝ່</p>
                <p className="text-gray-500 text-xs">1 ວັນຜ່ານມາ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">ສິນຄ້າຍອດນິຍົມ</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">ກັວຊາໄມ້ກ່ຽງ</p>
                <p className="text-gray-500 text-xs">250,000 ກີບ</p>
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">ກັວຊາກົ້ນໝູ</p>
                <p className="text-gray-500 text-xs">320,000 ກີບ</p>
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">ຊຸດກັວຊາ</p>
                <p className="text-gray-500 text-xs">580,000 ກີບ</p>
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
