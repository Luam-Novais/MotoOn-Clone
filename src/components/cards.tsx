import Image from 'next/image';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SheduleDTO } from '../types/ride';
import { UseFormRegisterReturn } from 'react-hook-form';

export function ContainerCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-container p-2 rounded-xl shadow-md shadow-black/50 border-l-2 border-amber-500 ${className}`}>{children}</div>;
}
interface HighlightCardProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}
export function HighlightCard({ children, icon: Icon }: HighlightCardProps) {
  return (
    <div className="p-4 relative flex flex-col justify-between gap-x-2 bg-linear-to-b from-amber-300 to-amber-600  min-h-40 rounded-xl  shadow-md shadow-black/50">
      {children}
      {Icon && <Icon className=" absolute opacity-25 top-5 right-5" size={120} color="#4A2C00" />}
    </div>
  );
}

export function CardMotoboy() {
  return (
    <div className="bg-container p-4 grid grid-cols-[50px_1fr] gap-x-6 gap-y-4 rounded-xl shadow-md shadow-black/50">
      <Image src={'/user.jpg'} height={50} width={50} alt="foto do motoboy" className="rounded-full border-2 border-amber-500" />
      <div>
        <span>
          <p className="text-[#bbb] text-sm">Seu Piloto</p>
          <h3 className="text-xl">Arthur</h3>
        </span>
      </div>
      <div className="col-start-1 col-end-3">
        <h3>Informações</h3>
        <span className="flex justify-between">
          <p className="text-[#bbb]">
            Placa: <span className="text-white">HFK-990</span>
          </p>
          <p className="text-[#bbb]">
            Modelo da moto: <span className="text-white">Titan</span>
          </p>
        </span>
      </div>
    </div>
  );
}

export function CardShedule({ shedule, register }: { shedule: SheduleDTO; register: UseFormRegisterReturn }) {
  return (
    <li
      className={`relative py-2 px-4 border-2 border-transparent rounded-md shadow-md shadow-black 
    ${shedule.isAvailable ? 'has-[input:checked]:border-amber-500 has-[input:checked]:text-amber-500 bg-container ' : 'bg-[#191919] text-[#777] backdrop-opacity-80'}`}
    >
      <label className="has-[input:checked]:text-amber-500" htmlFor={shedule.slot.toString()}>
        {shedule.formatedShedule}
      </label>
      <input type="radio" value={shedule.formatedShedule} {...register} id={shedule.slot.toString()} disabled={!shedule.isAvailable} className="absolute inset-0 min-w-full min-h-full opacity-0" />
    </li>
  );
}
