import { RideWithClient } from '../types/ride';
import { formatToCurrency, minutesToHoursFormated } from '../utils/functionsFormat';
import { SheduleDTO } from '../types/ride';
import { UseFormRegisterReturn } from 'react-hook-form';

export function ContainerCard({ children, style }: { children: React.ReactNode; style?: string }) {
  return <div className={`bg-container p-2 rounded-md shadow-md shadow-black/0 border-l-2 border-amber-500 ${style}`}>{children}</div>;
}

export function CardRidesToday({ rides }: { rides: RideWithClient[] }) {
  return (
    <ContainerCard style="p-4 flex flex-col gap-5">
      <h3 className="text-2xl">Corridas confirmadas para hoje.</h3>
      <ul className="flex flex-col gap-5">
        {rides.map((ride) => {
          return (
            <li key={ride.id} className="flex flex-col gap-8 bg-input p-4 rounded-md shadow-md shadow-black/50">
              <span className="flex justify-between">
                <p className="text-xl">{ride.client.name}</p>
                <p className="text-xl">{ride.client.phone}</p>
              </span>
              <span>
                <p className="text-base">
                  {ride.origin} X {ride.destination}
                </p>
                <p className="text-sm text-gray-300">{ride.address}</p>
              </span>
              <span className="flex justify-between text-xl">
                <p className=" text-amber-500">{formatToCurrency(ride.value)}</p>
                <p>{minutesToHoursFormated(ride.start_ride)}</p>
              </span>
            </li>
          );
        })}
      </ul>
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
