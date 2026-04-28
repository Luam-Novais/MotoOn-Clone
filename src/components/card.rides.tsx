import { CalendarDays, MapPin, Navigation, Clock10, CheckCheck, Phone, User, Pencil, ClipboardList, ClipboardCheck, AlertCircle, Wallet, ArrowRight, Clock3, WalletIcon, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Ride, RideWithClient } from '../types/ride';
import { formatDate, formatToCurrency, minutesToHoursFormated, normalizeTextLabel } from '../utils/functionsFormat';
import { ContainerCard } from './cards';
import { Button } from './button';

function RideHeader({ ride, muted }: { ride: RideWithClient; muted?: boolean }) {
  return (
    <div className={`relative flex items-start justify-between border-b-2 border-[#222] pb-3 ${muted ? 'opacity-50' : ''}`}>
      <span className="flex flex-col">
        <p className="text-xs text-zinc-400">cliente</p>
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
function RideRoute({ ride, className }: { ride: RideWithClient; className?: string }) {
  return (
    <div className={`bg-dark rounded-xl p-4 flex gap-4 ${className}`}>
      <div className="relative flex flex-col items-center">
        <span className="w-3 h-3 rounded-full border-2 border-amber-400" />
        <span className="w-0.5 flex-1 bg-[#333] my-1" />
        <MapPin size={16} />
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="text-xs tracking-widest text-[#888] uppercase">Origem</p>
          <p className="text-lg font-semibold text-[#eee] capitalize">{normalizeTextLabel(ride.origin)}</p>
          <p>({ride.address})</p>
        </div>

        <div>
          <p className="text-xs tracking-widest text-[#888] uppercase">Destino</p>
          <p className="text-lg font-semibold text-[#eee] capitalize">{normalizeTextLabel(ride.destination)}</p>
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

  return (
    <ContainerCard>
      <div className="grid gap-0.5">
        <div className="flex justify-between">
          <p className={`lowercase text-xs text-${statusRideStyle[ride.status]}`}>{ride.status}</p>
          <span className="text-xs">
            <p className="text-zinc-400">{formatDate(ride.date_ride)}</p>
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
        <div className="flex justify-between items-start">
          <span className="flex flex-col gap-1.5">
            <span>
              <span className="text-sm text-zinc-400 flex items-center gap-1">
                <Clock3 size={14} />
                horário
              </span>
              <h2 className="text-2xl font-bold ">{minutesToHoursFormated(ride.start_ride)}</h2>
            </span>
            <div className="my-2 h-px bg-zinc-800" />

            <span>
              <span className="text-sm text-zinc-400 flex items-center gap-1">
                <Calendar size={14} />
                data
              </span>
              <h2 className="text-xl font-bold ">{formatDate(ride.date_ride)}</h2>
            </span>
          </span>
          <span className="flex flex-col gap-1.5">
            <p className="text-xs text-zinc-400">status atual</p>
            <p className={`text-xs text-${statusRideStyle[ride.status]} border border-${statusRideStyle[ride.status]} rounded-xl p-2`}>{ride.status}</p>
          </span>
        </div>
        <div className="flex flex-col gap-4 bg-dark p-4 rounded-xl">
          <p className="text-xs text-zinc-400">locais</p>

          <span className="flex items-center gap-2 relative w-full">
            <MapPin size={14} color="#FFE3B4bb" />
            <span className="">
              <p className="text-xs text-zinc-400">Saindo de</p>
              <p className="capitalize font-medium">{normalizeTextLabel(ride.origin)}</p>
            </span>
          </span>
          <div className="my-5 h-px bg-zinc-800" />
          <span className="flex gap-2 items-center relative">
            <Navigation size={14} color="#FFE3B4bb" />
            <span>
              <p className="text-xs text-zinc-400">Indo para</p>
              <p className="capitalize text-[1.125rem] font-semibold">{normalizeTextLabel(ride.destination)}</p>
            </span>
          </span>
          <span className="flex gap-2 items-center mt-4 ">
            <span>
              <p className="text-xs text-zinc-400">Ponto de referência</p>
              <p className="capitalize ">{ride.address}</p>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function CardViewPendingRidesEmpty() {
  return (
    <div className="bg-container grid gap-4 px-2 py-4 border-l-4 border-amber-500 shadow-xl shadow-black/50 rounded-xl">
      <span className="flex justify-between items-center bg-dark p-4 rounded-xl shadow-md shadow-black/30">
        <span>
          <h2 className="uppercase text-2xl font-bold italic ">Pendentes</h2>
          <p className="text-sm text-zinc-400">Gerencie suas corridas pedentes.</p>
        </span>
        <span className="bg-amber-500 p-2 flex items-center justify-center rounded-full">
          <ClipboardList size={35} color="#111" />
        </span>
      </span>
      <div className=" p-4 flex flex-col gap-4 items-center justify-center">
        <ClipboardCheck size={150} className="opacity-40" />
        <p className="text-zinc-400">Você está em dia! Novas solicitações de corridas aparecerão aqui em tempo real.</p>
      </div>
    </div>
  );
}

type PendingRidesCardProps = { totalPending?: number; estimatedValue?: number; onViewPending?: () => void };

export function PendingViewRidesCard({ totalPending, estimatedValue = 0, onViewPending }: PendingRidesCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-amber-500 bg-zinc-900 p-5 shadow-[0_0_30px_rgba(245,158,11,0.12)]">
      <div className="absolute inset-0" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
              <Clock3 size={22} />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
              <AlertCircle size={14} /> Atenção
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold uppercase italic tracking-tight text-white"> Corridas Pendentes </h2> <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-400"> Você possui corridas que ainda não foram concluídas. </p>
          </div>
        </div>
        <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.15)]">
          <span className="text-4xl font-bold text-amber-400"> {totalPending} </span> <span className="text-sm text-amber-200"> pendentes </span>
        </div>
      </div>
      <div className="my-5 h-px bg-zinc-800" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
            <Wallet size={20} />
          </div>
          <div>
            <p className="text-sm text-zinc-400"> Valor total estimado </p> <strong className="mt-1 block text-3xl font-bold text-amber-400"> {formatToCurrency(estimatedValue)} </strong>
          </div>
        </div>
        <Link href={'/ride/pending-rides'} className="p-4 shadow-xl rounded-xl justify-center items-center flex gap-4 text-[1.125rem] font-semibold bg-linear-to-b text-amber-950 from-amber-300 to-amber-600 ">
          Ver Pendencias <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
export function CompactPendingViewCard({ totalPending, estimatedValue = 0, onViewPending }: PendingRidesCardProps) {
  return (
    <div className="grid gap-4">
      <div className="flex gap-2 bg-container border-0 border-black p-4 rounded-xl shadow-md shadow-black/50">
        <div className="p-4 border border-amber-500/20 bg-amber-500/10 text-amber-500 h-fit w-fit rounded-xl">
          <Clock3 />
        </div>
        <div>
          <h1 className="text-zinc-200 text-sm">Total de corridas pendentes.</h1>
          <p className="text-amber-500 font-bold text-xl">{totalPending} Pendentes</p>
        </div>
      </div>
      <div className="flex gap-2 bg-container border-0 border-black p-4 rounded-xl shadow-md shadow-black/50">
        <div className="p-4 border border-amber-500/20 bg-amber-500/10 text-amber-500 w-fit h-fit rounded-xl">
          <WalletIcon />
        </div>
        <div>
          <h1 className="text-zinc-200">Total de ganhos estimado.</h1>
          <p className="text-amber-500 font-bold text-xl">{formatToCurrency(estimatedValue)}</p>
        </div>
      </div>
      <div className="border-t border-zinc-800" />
    </div>
  );
}

export function PendingRideCard({ ride, onClick }: { ride: RideWithClient; onClick: () => void }) {
  return (
    <div className="grid gap-4 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-md">
      {/* topo */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-zinc-200 text-base">
            <CalendarDays size={14} />
            <span>{formatDate(ride.date_ride)}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-200 text-xl">
            <Clock3 size={14} />
            <span>{minutesToHoursFormated(ride.start_ride)}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500 uppercase tracking-wide">Valor</p>
          <p className="text-2xl font-bold text-amber-400">{formatToCurrency(ride.value)}</p>
        </div>
      </div>

      <div className="grid gap-4 my-4 rounded-xl bg-zinc-800/40 p-3 space-y-3">
        <div className="flex gap-3">
          <MapPin size={16} className="mt-0.5 text-amber-400 shrink-0" />
          <div>
            <p className="text-[11px] uppercase text-zinc-500">Origem</p>
            <p className="text-base capitalize text-zinc-100">{normalizeTextLabel(ride.origin)}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <MapPin size={16} className="mt-0.5 text-zinc-400 shrink-0" />
          <div>
            <p className="text-[11px] uppercase text-zinc-500">Destino</p>
            <p className="text-base capitalize text-zinc-100">{normalizeTextLabel(ride.destination)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-zinc-800 pt-3">
        <div className="flex capitalize items-center gap-2 text-sm text-zinc-300">
          <User size={14} className="text-zinc-500" />
          {ride.client.name}
        </div>

        <div className="flex  items-center gap-2 text-sm text-zinc-300">
          <Phone size={14} className="text-zinc-500" />
          {ride.client.phone}
        </div>
      </div>

      {/* ação */}
      <div className="mt-4 flex justify-end">
        <button onClick={onClick} className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xl font-bold text-amber-950 transition hover:bg-amber-400 active:scale-[0.98]">
          <Pencil size={15} />
          Editar
        </button>
      </div>
    </div>
  );
}
