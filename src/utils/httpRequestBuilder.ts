import { RideRequestParams } from '../types/ride';


export class HttpRequestBuilder {
  private baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  buildGet(pathname: string) {
    const url = this.baseUrl + pathname;
    const options = {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    };
    return { url, options };
  }
  buildPost(pathname: string, data: any) {
    const url = this.baseUrl + pathname;
    const options = {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true',
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
          'ngrok-skip-browser-warning': 'true',
          authorization: `Bearer ${token}`,
        },
      };
      return { url, options };
    },
  };
  adminRequests = {
    buildAdminGet: (pathname: string, token: string) => {
      const url = this.baseUrl + pathname;
      const options = {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          authorization: `Bearer ${token}`,
        },
      };
      return { url, options };
    },
    buildAdminPost: (pathname: string, token: string, data: any) => {
      const url = this.baseUrl + pathname;
      const options = {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(data),
      };
      return { url, options };
    },
    buildAdminPut: (pathname: string, token: string, data: any) => {
      const url = this.baseUrl + pathname;
      const options = {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return { url, options };
    },
    buildAdminDel: (pathname: string, token: string) => {
      const url = this.baseUrl + pathname;
      const options = {
        method: 'DELETE',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          authorization: `Bearer ${token}`,
        },
      };
      return { url, options };
    },
  };

  ridesRequest = {
    buildFinishRequest: ({ id, token, data }: RideRequestParams) => {
      const url = `${this.baseUrl}ride/finish-ride/${id}`;
      const options = {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return { url, options };
    },
    buildUpdateStatusRequest: ({ id, token, data }: RideRequestParams) => {
      const url = `${this.baseUrl}ride/update/${id}`;
      const options = {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return { url, options };
    },
  };
}
