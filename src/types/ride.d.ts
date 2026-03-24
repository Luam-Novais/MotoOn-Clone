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
}
export interface RideWithClient extends Ride{
    client: Client
}
