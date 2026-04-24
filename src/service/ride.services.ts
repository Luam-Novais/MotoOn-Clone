import { FinishRideParams } from '../types/ride';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';

const httpReqBuilder = new HttpRequestBuilder();

export async function finishRideService({id, token, data}: FinishRideParams){
    const {url, options} = httpReqBuilder.ridesRequest.buildFinishRequest({id, token, data})
    console.log(url, options)
} 
