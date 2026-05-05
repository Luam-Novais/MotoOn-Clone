import { RideRequestParams } from '../types/ride';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { RideWithClient } from '../types/ride';
import { apiFetch } from '../utils/apiFetch';

const { ridesRequest, clientRequests } = new HttpRequestBuilder();

export async function finishRideService({ id, token, data }: RideRequestParams) {
  try {
    const { url, options } = ridesRequest.buildFinishRequest({ id, token, data });
    const res = await apiFetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
}

export async function updateStatusService({ id, token, data }: RideRequestParams) {
  try {
    const { url, options } = ridesRequest.buildUpdateStatusRequest({ id, token, data });
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getClientRidesService(token: string): Promise<RideWithClient[] | undefined> {
  try {
    if (!token) throw new Error('Token não informado, impossível buscar corridas.');
    const { url, options } = clientRequests.buildGetWithToken(`ride/client-rides`, token);
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}
