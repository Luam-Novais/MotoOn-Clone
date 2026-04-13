import { Credentials } from '../types/auth';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';

const httpReqBuilder = new HttpRequestBuilder();

export const fetchJson = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  const json = await response.json();

  return {
    response,
    json,
  };
};
export async function loginService(data: Credentials) {
  const { url, options } = httpReqBuilder.buildPost('auth/login', data);
  const { response, json } = await fetchJson(url, options as RequestInit);

  return { response, json };
}
// export async function getTodayRevenueService() {
//   const { url, options } = httpReqBuilder.adminRequests.buildAdminGet('payment/get-today-revenue');
//   const { response, json } = await fetchJson(url, options);

//   return {
//     response,
//     json,
//   };
// }
