import { Ride, RideWithClient } from '../types/ride';
import { minutesToHoursFormated } from '../utils/functionsFormat';
import { MapPin, Navigation, Clock10, CheckCheck, Phone, LucideIcon } from 'lucide-react';
import { SheduleDTO } from '../types/ride';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Button } from './button';
import Image from 'next/image';

import React from 'react';

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

function RideHeader({ ride, muted }: { ride: RideWithClient; muted?: boolean }) {
  return (
    <div className={`relative flex items-start justify-between border-b-2 border-[#222] pb-3 ${muted ? 'opacity-50' : ''}`}>
      <span className="flex flex-col">
        <p className="text-xs text-[#ccc]">cliente</p>
        <p className="text-xl font-semibold capitalize">{ride.client.name.split(' ')[0]}</p>
        <span className="flex items-center gap-2 text-[#ddd] text-base">
          {ride.client.phone} <Phone size={16} />
        </span>
      </span>

      <div className="flex flex-col gap-2">
        <span className="flex gap-1 text-amber-500">
          <p className="font-medium">R$</p>
          <p className="text-4xl font-semibold italic">{ride.value.toFixed(2).replace('.', ',')}</p>
        </span>

        <span className="flex gap-2 text-xs self-end">
          <span className="flex gap-2 items-start">
            <Clock10 size={14} color="#FFE3B4bb" />
            <span>
              <p className="text-[#FFE3B4bb] text-[0.75rem] uppercase">Horário</p>
              <p className="text-xl">{minutesToHoursFormated(ride.start_ride)}</p>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}
function RideRoute({ ride }: { ride: RideWithClient }) {
  return (
    <div className="bg-dark rounded-xl p-4 flex gap-4">
      <div className="relative flex flex-col items-center">
        <span className="w-3 h-3 rounded-full border-2 border-amber-400" />
        <span className="w-0.5 flex-1 bg-[#333] my-1" />
        <MapPin size={16} />
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="text-xs tracking-widest text-[#888] uppercase">Origem</p>
          <p className="text-lg font-semibold text-[#eee] capitalize">{ride.origin}</p>
          <p>({ride.address})</p>
        </div>

        <div>
          <p className="text-xs tracking-widest text-[#888] uppercase">Destino</p>
          <p className="text-lg font-semibold text-[#eee] capitalize">{ride.destination}</p>
        </div>
      </div>
    </div>
  );
}

type CardRidesTodayProps = {
  ride: RideWithClient;
  index: number;
  onClick?: () => void;
};

export function CardRidesToday({ ride, index, onClick }: CardRidesTodayProps) {
  const isFirst = index === 0;

  return (
    <li className="flex flex-col gap-4 bg-dark p-4 rounded-md shadow-md shadow-black/50 border-l-2 border-amber-500">
      <RideHeader ride={ride} muted={!isFirst} />

      {isFirst && (
        <>
          <RideRoute ride={ride} />

          <Button type="button" onClick={onClick}>
            Finalizar Corrida
            <CheckCheck size={18} />
          </Button>
        </>
      )}
    </li>
  );
}
export function CardRide({ ride, index }: CardRidesTodayProps) {
  const statusRideStyle: Record<string, string> = {
    PENDENTE: 'amber-500',
    CONFIRMADA: 'green-500',
    CONCLUIDA: 'green-500',
    CANCELADA: 'red-500',
  };
  const date = new Date(ride.date_ride).toLocaleDateString();
  return (
    <ContainerCard>
      <div className="grid gap-0.5">
        <div className="flex justify-between">
          <p className={`lowercase text-xs text-${statusRideStyle[ride.status]}`}>{ride.status}</p>
          <span className="text-xs">
            <p className="text-[#ccc]">{date}</p>
            <p>{ride.number_ride}</p>
          </span>
        </div>
        <div className="bg-dark p-2 rounded-xl">
          <p className="capitalize">{ride.client.name}</p>
        </div>
      </div>
    </ContainerCard>
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
export default function Banner({ src }: { src: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '120px' }}>
      <Image className="rounded-tl-xl rounded-tr-xl shadow-md shadow-black/20" src={src} alt="Mapa" fill style={{ objectFit: 'cover' }} />
    </div>
  );
}
export function CardClientViewRide({ ride, index }: { ride: Ride; index: number }) {
  const statusRideStyle: Record<string, string> = {
    PENDENTE: 'amber-500',
    CONFIRMADA: 'green-500',
    CONCLUIDA: 'green-500',
    CANCELADA: 'red-500',
  };
  return (
    <div className={`bg-container rounded-xl shadow-md shadow-black/50 flex flex-col gap-2  ${index > 0 ? 'opacity-30' : ''}`}>
      <div className="flex flex-col gap-8 p-4">
        <span className="flex justify-between items-center">
          <span className="flex flex-col gap-1.5">
            <p className="text-sm text-[#ccc]">horário</p>
            <h2 className="text-4xl font-bold ">{minutesToHoursFormated(ride.start_ride)}</h2>
          </span>
          <span className="flex flex-col gap-1.5">
            <p className="text-xs text-[#ccc]">status atual</p>
            <p className={`text-xs text-${statusRideStyle[ride.status]} border border-${statusRideStyle[ride.status]} rounded-xl p-2`}>{ride.status}</p>
          </span>
        </span>
        <div className="flex flex-col gap-4 bg-dark p-4 rounded-xl">
          <p className="text-xs text-[#ccc]">locais</p>

          <span className="flex items-center gap-2 relative after-line w-full">
            <MapPin size={14} color="#FFE3B4bb" />
            <span className="">
              <p className="text-xs text-[#ccc]">Saindo de</p>
              <p className="capitalize font-medium">{ride.origin}</p>
            </span>
          </span>
          <span className="flex gap-2 items-center relative after-line ">
            <Navigation size={14} color="#FFE3B4bb" />
            <span>
              <p className="text-xs text-[#ccc]">Indo para</p>
              <p className="capitalize text-[1.125rem] font-semibold">{ride.destination}</p>
            </span>
          </span>
          <span className="flex gap-2 items-center mt-4 ">
            <span>
              <p className="text-xs text-[#ccc]">Ponto de referência</p>
              <p className="capitalize ">{ride.address}</p>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
