import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { apiFetch } from '../utils/apiFetch';

const httpReqBuilder = new HttpRequestBuilder();

export const getSlots = async (date_ride: Date) => {
  try {
    const { url, options } = httpReqBuilder.buildGet(`ride/get-slots?date_ride=${date_ride}`);
    const response = await apiFetch(url, options);
    const json = await response.json();
    return { json, response };
  } catch (error) {
    throw error;
  }
};
export const createRide = async (data: any) => {
  try {
    const { url, options } = httpReqBuilder.buildPost('ride/create', data);
    const response = await apiFetch(url, options);
    const json = await response.json();
    if (!response.ok) throw new Error(json.messageError);
    return json;
  } catch (error) {
    throw error;
  }
};
