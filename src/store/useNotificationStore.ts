import {create} from 'zustand'

type NotificationStoreTypes = {
    permission: NotificationPermission
    setPermission: (permission: NotificationPermission) => void
}

export const useNotificationStore = create<NotificationStoreTypes>((set)=>({
    permission: 'default',
    setPermission: (permission) => set({permission})
}))