import { ReactNode, useEffect } from 'react';
import { useNotificationStore } from '../store/useNotificationStore';

export default function PushProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    async function init() {
      try {
        if (!('serviceWorker' in navigator)) {
          return;
        }
        const serviceWorkerExists = await navigator.serviceWorker.getRegistration();
        if (!serviceWorkerExists) {
          await navigator.serviceWorker.register('/sw.js');
        }
        useNotificationStore.getState().setPermission(Notification.permission);
      } catch (error) {
        console.error(error);
      }
      console.log('tudo certo aqui!!!')
    }
    init();
  }, []);

  return children;
}
