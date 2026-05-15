'use client';
import { Header } from '@/src/components/header';
import { usePathname } from 'next/navigation';
import AuthLayout from './page';
import { ToastContainer } from 'react-toastify';
import { useNotificationStore } from '@/src/store/useNotificationStore';
import { EnableNotificationsPrompt } from '@/src/components/modals';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showModalNotification, setShowModalNotification] = useState<boolean>(false);
  const pathname = usePathname().split('/')[1];
  const { permission } = useNotificationStore();
  return (
    <AuthLayout className="mb-40 relative">
      {permission !== 'granted' && <EnableNotificationsPrompt showModal={showModalNotification} handleClose={() => setShowModalNotification(false)} handleOpen={() => setShowModalNotification(true)} />}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      {children}
      <Header href={pathname} />
    </AuthLayout>
  );
}
