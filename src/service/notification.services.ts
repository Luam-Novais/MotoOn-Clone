import { HttpRequestBuilder } from "../utils/httpRequestBuilder";

const httpReqBuilder =  new HttpRequestBuilder()

export async function sendPushSubcription(subscription: PushSubscription) {
    const {url, options} = httpReqBuilder.buildPost('api/register-sub', subscription)
    const response = await fetch(url ,options)
    return response
}