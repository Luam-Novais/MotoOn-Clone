import { HttpRequestBuilder } from "../utils/httpRequestBuilder";

const httpReqBuilder =  new HttpRequestBuilder()

export async function sendPushSubcription(subscription: PushSubscription) {
    const {url, options} = httpReqBuilder.buildPost('api/register-sub', subscription)
    await fetch(url ,options)
}