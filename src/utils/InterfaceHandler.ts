export enum InterfaceState {
  Http = 'http',
  Mock = 'mock',
}

export enum RunState {
  Prod = 'prod',
  Local = 'local'
}

export class InterfaceHandler {
  interfaceState: InterfaceState;
  runState: RunState;
  private _localBaseEndpoint: string;
  private _prodBaseEndpoint: string;
  private _defaultHeaders: Record<string, string>;

  constructor(interfaceState?: InterfaceState, runState?: RunState) {
    if (!interfaceState) {
      this.interfaceState = InterfaceState.Http;
    } else {
      this.interfaceState = interfaceState;
    }
    if (!runState) {
      this.runState = RunState.Prod;
    } else {
      this.runState = runState;
    }
    this._localBaseEndpoint = '';
    this._prodBaseEndpoint = '';
    this._defaultHeaders = {};
  }

  setDefaultHeader(headerName: string, headerValue: string) {
    this._defaultHeaders[headerName] = headerValue;
  }

  get defaultHeaders():Record<string, string> {
    return { ...this._defaultHeaders };
  }

  set localBaseEndpoint(localBaseEndpoint: string) {
    this._localBaseEndpoint = localBaseEndpoint;
  }

  set prodBaseEndpoint(prodBaseEndpoint: string) {
    this._prodBaseEndpoint = prodBaseEndpoint;
  }

  get baseEndpoint():string {
    switch (this.runState) {
      case RunState.Local:
        return this._localBaseEndpoint;
      case RunState.Prod:
        return this._prodBaseEndpoint;
      default:
        throw new Error(`unexpected run state: ${this.runState}`);
    }
  }
}

export default new InterfaceHandler();
