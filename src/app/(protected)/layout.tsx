'use client';
import { Header } from '@/src/components/header';
import { usePathname } from 'next/navigation';
import AuthProvider from '../../providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { useNotificationStore } from '@/src/store/useNotificationStore';
import { EnableNotificationsPrompt } from '@/src/components/modals';
import { useState } from 'react';
import PushProvider from '@/src/providers/PushProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showModalNotification, setShowModalNotification] = useState<boolean>(false);
  const pathname = usePathname().split('/')[1];
  const { permission } = useNotificationStore();
  return (
    <AuthProvider className="mb-40 relative">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      {children}
      <Header href={pathname} />
    </AuthProvider>
  );
}
