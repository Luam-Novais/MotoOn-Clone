import { Client } from "./client";
export type AllowedRideStatuses = 'PENDENTE' | 'CONFIRMADA' | 'CONCLUIDA' | 'CANCELADA';

export interface Ride {
  id: number;
  client_id: number;
  origin: string;
  destination: string;
  date_ride: Date; 
  start_ride: number; 
  end_ride: number;
  status: RideStatus;
  value: number;
  address: string;
  points_used: number | null;
  created_at: Date; 
  number_ride: string
}
export interface RideWithClient extends Ride{
    client: Client
}
export interface CreateRideDTO {
  origin: string;
  destination: string;
  date_ride: Date;
  address: string;
  client_name: string;
  client_phone: string;
  start_ride: string;
}
// export interface RideRoutes{

// }
export interface RideSheduleSelectorProps {
  allShedules: SheduleDTO[];
  register: UseFormRegisterReturn;
}
export interface SheduleDTO {
  slot: number;
  isAvailable: boolean;
  formatedShedule: string;
}