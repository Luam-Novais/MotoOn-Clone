import { HttpRequestBuilder } from "../utils/httpRequestBuilder"

const httpReqBuilder = new HttpRequestBuilder()

export const fetchJson = async (url:string, options:RequestInit)=>{

    const response = await fetch(url, options);
    const json = await response.json();

    return {
      response,
      json,
    };
}
export const getRoutes = async ()=>{
    const { url, options } = httpReqBuilder.clientRequests.buildGet('ride/get-possible-routes');
    const response = await fetch(url, options as RequestInit)
    const json = await response.json()

    return {
        response, json
    }
}
export const getRides = async (token:string)=>{
    const { url, options } = httpReqBuilder.clientRequests.buildGetWithToken(`ride/client-rides`, token);
    const {response, json}  = await fetchJson(url, options)

    return {
        response, json
    }

}
export const getSlots = async (date_ride:Date)=>{
    const { url, options } = httpReqBuilder.clientRequests.buildGet(`ride/get-slots?date_ride=${date_ride}`);
    const {response, json} = await fetchJson(url, options as RequestInit)
    return {response, json}
}
export const createRide = async(data :any) =>{
    const {url, options} = httpReqBuilder.clientRequests.buildPost('ride/create', data)
    const {response, json} = await fetchJson(url, options)
    return {response, json}
}