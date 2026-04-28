import { RideRequestParams } from '../types/ride';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';

const { ridesRequest } = new HttpRequestBuilder();

export async function finishRideService({ id, token, data }: RideRequestParams) {
  const { url, options } = ridesRequest.buildFinishRequest({ id, token, data });
  console.log(url, options);
}

export async function updateStatusService({ id, token, data }: RideRequestParams) {
  const { url, options } = ridesRequest.buildUpdateStatusRequest({ id, token, data });
  const response = await fetch(url, options);
  return await response.json();
}
