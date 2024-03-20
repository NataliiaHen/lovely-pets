/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://pets-home-e9b90f16b6b9.herokuapp.com/';

// returns a promise resolved after a given delay

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };
  const fullUrl = BASE_URL + url;

  if (method === 'POST' && data) {
    if (data instanceof FormData) {
      // If data is FormData, use it directly
      options.body = data;
    } else {
      // If data is not FormData, assume it's JSON
      options.body = JSON.stringify(data);
      options.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
      };
    }
  } else if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(fullUrl, options).then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    // Check if the response has content
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json();
    }

    return null;
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
