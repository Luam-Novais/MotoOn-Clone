import { FinishRideParams } from "../types/ride";

export class HttpRequestBuilder {
  private baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  buildGet(pathname: string) {
    const url = this.baseUrl + pathname;
    const options = {
      method: 'GET',
    };
    return { url, options };
  }
  buildPost(pathname: string, data: any) {
    const url = this.baseUrl + pathname;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return { url, options };
  }
  clientRequests = {
    buildGetWithToken: (pathname: string, token: string) => {
      const url = this.baseUrl + pathname;
      const options = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return { url, options };
    },
  };
  adminRequests = {
    buildAdminGet: (pathname: string, token: String) => {
      const url = this.baseUrl + pathname;
      const options = {
        method: 'GET',
      };
      return { url, options };
    },
  };
  ridesRequest = {
    buildFinishRequest: ({id, token, data}: FinishRideParams) => {
      const url = `${this.baseUrl}ride/finish-ride/${id}`;
      const options = {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return {url, options}
    },
  };
}
