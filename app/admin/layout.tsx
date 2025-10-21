import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Allow login page without session
  if (!session && children && !children.toString().includes('login')) {
    redirect('/admin/login');
  }

  // Login page doesn't need layout
  if ((children && children.toString().includes('login')) || !session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
