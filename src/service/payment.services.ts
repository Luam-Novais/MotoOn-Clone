import { HttpRequestBuilder } from "../utils/httpRequestBuilder";
import { CreatePaymentDTO } from "../types/payment";

const {adminRequests} = new HttpRequestBuilder()
export async function deletePayment(id: number, token: string) {
  const { url, options } = adminRequests.buildAdminDel(`payment/delete/${id}`, token);
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}
export async function createPayment(data: CreatePaymentDTO, token: string) {
  const { url, options } = adminRequests.buildAdminPost('payment/create', token, data);
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}