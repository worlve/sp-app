export enum HttpRequestMethod {
  Post = 'post',
  Get = 'get',
  Put = 'put',
  Delete = 'delete',
  Patch = 'patch'
}

export class HttpHandler {
  baseEndpoint: string;
  private _defaultHeaders: Record<string, string>;

  constructor() {
    this.baseEndpoint = '';
    this._defaultHeaders = {};
  }

  setDefaultHeader(headerName: string, headerValue: string) {
    this._defaultHeaders[headerName] = headerValue;
  }

  get defaultHeaders():Record<string, string> {
    return { ...this._defaultHeaders };
  }

  async jsonGet(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>):Promise<any> {
    return this.jsonRequest(endpoint, HttpRequestMethod.Get, additionalHeaders, params);
  }

  async jsonPost(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>, bodyData?: any):Promise<any> {
    return this.jsonRequest(endpoint, HttpRequestMethod.Post, additionalHeaders, params, bodyData);
  }

  async jsonPut(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>, bodyData?: any):Promise<any> {
    return this.jsonRequest(endpoint, HttpRequestMethod.Put, additionalHeaders, params, bodyData);
  }

  async jsonDelete(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>):Promise<any> {
    return this.jsonRequest(endpoint, HttpRequestMethod.Delete, additionalHeaders, params);
  }

  async jsonPatch(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>, bodyData?: any):Promise<any> {
    return this.jsonRequest(endpoint, HttpRequestMethod.Patch, additionalHeaders, params, bodyData);
  }

  private async jsonRequest(endpoint: string, requestMethod: HttpRequestMethod, additionalHeaders?: Record<string, string>, params?: Record<string, any>, bodyData?: any):Promise<any> {
    const headers = {
      ...HttpHandler.defaultJsonHeaders,
      ...this.defaultHeaders,
      ...additionalHeaders,
    };
    const url = new URL(`${this.baseEndpoint}/${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
    return new Promise((resolve, reject) => {
      fetch(url.toJSON(), {
        method: requestMethod,
        headers: headers,
        body: JSON.stringify(bodyData)
      })
      .then(res => resolve(res.json()))
      .catch(err => reject(err))
    });
  }

  private static get defaultJsonHeaders():Record<string, string> {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }
}

export default new HttpHandler();