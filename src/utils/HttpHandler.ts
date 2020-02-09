import interfaceHandler from './InterfaceHandler';

enum HttpRequestMethod {
  Post = 'post',
  Get = 'get',
  Put = 'put',
  Delete = 'delete',
  Patch = 'patch'
}

export class HttpHandler {
  static async jsonGet(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>):Promise<any> {
    return HttpHandler.jsonRequest(endpoint, HttpRequestMethod.Get, additionalHeaders, params);
  }

  static async jsonPost(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>, bodyData?: any):Promise<any> {
    return HttpHandler.jsonRequest(endpoint, HttpRequestMethod.Post, additionalHeaders, params, bodyData);
  }

  static async jsonPut(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>, bodyData?: any):Promise<any> {
    return HttpHandler.jsonRequest(endpoint, HttpRequestMethod.Put, additionalHeaders, params, bodyData);
  }

  static async jsonDelete(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>):Promise<any> {
    return HttpHandler.jsonRequest(endpoint, HttpRequestMethod.Delete, additionalHeaders, params);
  }

  static async jsonPatch(endpoint: string, additionalHeaders?: Record<string, string>, params?: Record<string, any>, bodyData?: any):Promise<any> {
    return HttpHandler.jsonRequest(endpoint, HttpRequestMethod.Patch, additionalHeaders, params, bodyData);
  }

  private static async jsonRequest(endpoint: string, requestMethod: HttpRequestMethod, additionalHeaders?: Record<string, string>, params?: Record<string, any>, bodyData?: any):Promise<any> {
    const headers = {
      ...HttpHandler.defaultJsonHeaders,
      ...interfaceHandler.defaultHeaders,
      ...additionalHeaders,
    };
    const url = new URL(`${interfaceHandler.baseEndpoint}/${endpoint}`);
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