  /**
 * Base structure derived from:
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/_actions/index.js
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export interface Action {
  type: string;
}

export default class {
  componentTag: string;

  constructor(componentTag: string) {
    this.componentTag = componentTag;
  }

  createRequestTypes(base: string):Record<string, string> {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc: Record<string, string>, type: string) => {
      acc[type] = `${this.componentTag}_${base}_${type}`;
      return acc;
    }, {});
  }

  createRequestRaw(base: string):string {
    return `${this.componentTag}_${base}`;
  }

  static action(type: string, payload = {}):Action {
    return { type, ...payload };
  }
}
