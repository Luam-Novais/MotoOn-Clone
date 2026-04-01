import { RideWithClient } from '../types/ride';
import { minutesToHoursFormated } from '../utils/functionsFormat';
import { MapPin, Navigation, Clock10 } from 'lucide-react';
import { SheduleDTO } from '../types/ride';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Button } from './button';

export function ContainerCard({ children, style }: { children: React.ReactNode; style?: string }) {
  return <div className={`bg-container p-2 rounded-md shadow-md shadow-black/50 border-l-2 border-amber-500 ${style}`}>{children}</div>;
}

export function CardRidesToday({ ride }: { ride: RideWithClient }) {
  const currentMinutes = new Date().getHours() * 60;
  return (
    <li key={ride.id} className="flex flex-col gap-10 bg-dark p-4 rounded-md shadow-md shadow-black/50 border-l-2 border-amber-500">
      <div className="flex items-start justify-between gap-4">
        <span className="flex flex-col gap-2">
          <span className="flex flex-col gap-2">
            <p className="text-xl flex font-semibold capitalize">{ride.client.name.split(' ')[0]}</p>
            <p className="text-[#ccc]">{ride.client.phone}</p>
          </span>
        </span>
        <span className="flex gap-1 text-amber-500">
          <p className="font-medium">R$</p>
          <p className="text-3xl font-semibold italic">{ride.value.toFixed(2).replace('.', ',')}</p>
        </span>
      </div>
      <div className="flex flex-col gap-2 bg-container p-4 rounded-xl shadow-md shadow-black">
        <span className="flex gap-2 items-start">
          <MapPin size={14} color="#FFE3B4bb" />
          <span>
            <p className="flex items-start gap-2 text-[#FFE3B4bb] text-[0.75rem] uppercase">Origem</p>
            <p className="capitalize">{ride.origin}</p>
          </span>
        </span>
        <p className="px-10 text-amber-500">X</p>
        <span className="flex gap-2 items-start">
          <Navigation size={14} color="#FFE3B4bb" />
          <span>
            <p className="flex items-start gap-2 text-[#FFE3B4bb] text-[0.75rem] uppercase">Destino</p>
            <p className="capitalize">{ride.destination}</p>
          </span>
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="flex gap-2 items-start">
          <Clock10 size={14} color="#FFE3B4bb" />
          <span>
            <p className="flex items-start gap-2 text-[#FFE3B4bb] text-[0.75rem] uppercase">Horário</p>
            <p className="text-xl">{minutesToHoursFormated(ride.start_ride)}</p>
          </span>
        </span>
        <button
          disabled={currentMinutes >= ride.start_ride ? false : true}
          className={`py-2 px-4 font-medium bg-linear-to-b text-amber-950 
        from-amber-300 to-amber-600 shadow-xl rounded-xl justify-center items-center flex gap-2 disabled-btn`}
        >
          Finalizar Corrida
        </button>
      </div>
    </li>
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
