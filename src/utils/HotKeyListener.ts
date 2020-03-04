export interface HotKeyCallbackOptions {
  callback: () => void;
  triggerHotKeys: Set<number>;
  preventTrigger?: boolean;
}

export const keyCodeMap = {
  ESC: 27,
  D: 68,
  E: 69,
  F: 70,
  S: 83,
  SHIFT: 16,
  COMMAND: 91,
}

class HotKeyListener {
  private heldKeys: Set<number>;
  private registeredCallbacks: Record<number, HotKeyCallbackOptions>;
  private currentCallbackNumber: number;
  
  constructor() {
    this.heldKeys = new Set();
    this.currentCallbackNumber = 0;
    this.registeredCallbacks = {};
    const registerHeldKey = this.registerHeldKey.bind(this);
    const handleKeyRelease = this.handleKeyRelease.bind(this);
    // @NOTE: yes. These event listeners are permanent.  Intentionally.
    document.addEventListener('keydown', registerHeldKey);
    document.addEventListener('keyup', handleKeyRelease);
  }

  registerCallback(triggerHotKeys: Set<number>, callback: () => void):number {
    this.currentCallbackNumber += 1;
    this.registeredCallbacks[this.currentCallbackNumber] = {
      callback,
      triggerHotKeys,
    };
    return this.currentCallbackNumber;
  }

  preventCallbackTrigger(callbackNumber: number, preventTrigger: boolean) {
    this.registeredCallbacks[callbackNumber].preventTrigger = preventTrigger;
  }

  unregisterCallback(callbackNumber: number):boolean {
    if (!(callbackNumber in this.registeredCallbacks)) {
      return false;
    }
    delete this.registeredCallbacks[callbackNumber];
    return true;
  }

  private registerHeldKey(event: KeyboardEvent):void {
    // console.log(event.keyCode);
    this.heldKeys.add(event.keyCode);
  }

  private handleKeyRelease():void {
    for (const callbackNumber in this.registeredCallbacks) {
      if (!this.isSubset(this.heldKeys, this.registeredCallbacks[callbackNumber].triggerHotKeys)) {
        continue;
      }
      if (this.registeredCallbacks[callbackNumber].preventTrigger) {
        continue;
      }
      this.registeredCallbacks[callbackNumber].callback();
    }
    this.releaseKeys();
  }

  private releaseKeys():void {
    this.heldKeys = new Set();
  }

  private isSubset(fullSet: Set<number>, subset: Set<number>):boolean {
    for (const value of Array.from(subset.values())) {
      if (!fullSet.has(value)) {
        return false;
      }
    }
    return true;
  }
}

export default new HotKeyListener();