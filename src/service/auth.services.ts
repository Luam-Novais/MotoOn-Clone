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
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.messageError || 'Erro no login');
  }
  return json;
}
