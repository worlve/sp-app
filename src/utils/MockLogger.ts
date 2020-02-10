import logger from './Logger';
import { HttpRequestMethod } from './HttpHandler';

export class MockInterface {
  static logRequest(caller: Function, requestData: any) {
    logger.logDebug(`${caller.name}: REQUEST`);
    if (requestData) {
      logger.logDebug(requestData);
    }
  }

  static logResponse(caller: Function, responseData: any) {
    logger.logDebug(`${caller.name}: RESPONSE`);
    if (responseData) {
      logger.logDebug(responseData);
    }
  }

  static async wait(httpRequestMethod: HttpRequestMethod):Promise<number> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, this.getWaitTime(httpRequestMethod));
    });
  }

  private static getWaitTime(httpRequestMethod: HttpRequestMethod):number {
    switch(httpRequestMethod) {
      case HttpRequestMethod.Get:
        return 200;
      case HttpRequestMethod.Post:
        return 500;
      case HttpRequestMethod.Patch:
        return 1000;
      case HttpRequestMethod.Put:
        return 1000;
      case HttpRequestMethod.Delete:
        return 200;
      default:
        throw new Error(`unexpected httpRequestMethod: ${httpRequestMethod}`);
    }
  }
}
