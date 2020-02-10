export class InterfaceHandler {
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
}

export default new InterfaceHandler();
