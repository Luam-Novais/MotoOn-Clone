export interface CreatePaymentDTO {
  payment_method: string;
  value: number;
  client_id: number;
  ride_id?: number;
  payment_date: Date;
}
export interface Payment extends CreatePaymentDTO {
  id: number;
  created_at: Date;
  number_ride: string
}
