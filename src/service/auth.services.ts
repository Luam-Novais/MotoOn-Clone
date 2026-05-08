import { CreateUserDTO, Credentials } from '../types/auth';
import { apiFetch } from '../utils/apiFetch';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';

const httpReqBuilder = new HttpRequestBuilder();

export async function createAccountService(data: CreateUserDTO){
   try {
     const { url, options } = httpReqBuilder.buildPost('auth/create', data);
     const response = await apiFetch(url, options);
     const json = await response.json();
     return json;
   } catch (error) {
     throw error;
   }
}

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
