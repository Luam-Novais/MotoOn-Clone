'use client';
import { Header } from '@/src/components/header';
import { usePathname } from 'next/navigation';
import AuthLayout from './page';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split('/')[1];
  return (
    <AuthLayout className="mb-40">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      {children}
      <Header href={pathname} />
    </AuthLayout>
  );
}
