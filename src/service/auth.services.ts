import { Credentials } from '../types/auth';
import { apiFetch } from '../utils/apiFetch';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';

const httpReqBuilder = new HttpRequestBuilder();

export const fetchJson = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  const json = await response.json();

  console.log(response,json)
  return {
    response,
    json,
  };
};

export async function loginService(data: Credentials) {
 try {
   const { url, options } = httpReqBuilder.buildPost('auth/login', data);
   const response = await apiFetch(url, options);
   const json = await response.json();
   return json;
 } catch (error) {
  throw error
 }
}
