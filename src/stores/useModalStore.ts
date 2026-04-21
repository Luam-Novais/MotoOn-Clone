import { create } from "zustand";

interface Modal{
    modal:boolean,
    handleModal: (param: boolean) => void
}
export const useModal = create<Modal>((set)=>{
    return{
        modal:false,
        handleModal: (value) => set((state) => ({modal: value}))
    }
})