export interface CreatePaymentDTO {
  payment_method: string;
  value: number;
  client_id?: number;
  ride_id?: number;
  payment_date: Date;
}
interface Ride{
  id:number,
  destination:string
  origin:string
  number_ride:string
}
export interface Payment extends CreatePaymentDTO {
  id: number;
  created_at: Date;
  ride?: Ride
}
