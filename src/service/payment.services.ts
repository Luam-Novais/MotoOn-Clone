import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { CreatePaymentDTO } from '../types/payment';
import { apiFetch } from '../utils/apiFetch';
const { adminRequests } = new HttpRequestBuilder();
export async function deletePayment(id: number, token: string) {
  try {
    const { url, options } = adminRequests.buildAdminDel(`payment/delete/${id}`, token);
    const response = await apiFetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}
export async function createPayment(data: CreatePaymentDTO, token: string) {
  try {
    const { url, options } = adminRequests.buildAdminPost('payment/create', token, data);
    const response = await apiFetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}
