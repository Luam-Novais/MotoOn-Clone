import { RideRequestParams } from '../types/ride';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { RideWithClient } from '../types/ride';

const { ridesRequest, clientRequests } = new HttpRequestBuilder();

export async function finishRideService({ id, token, data }: RideRequestParams) {
  const { url, options } = ridesRequest.buildFinishRequest({ id, token, data });
  console.log(url, options);
}

export async function updateStatusService({ id, token, data }: RideRequestParams) {
  const { url, options } = ridesRequest.buildUpdateStatusRequest({ id, token, data });
  const response = await fetch(url, options);
  return await response.json();
}

export async function getClientRidesService(token: string): Promise<RideWithClient[] | undefined> {
  if (!token) throw new Error('Token não informado, impossível buscar corridas.');
  const { url, options } = clientRequests.buildGetWithToken(`ride/client-rides`, token);
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) throw new Error(json.messageError);
  return json;
}
