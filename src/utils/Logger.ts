export enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Error = 'error',
}

export class Logger {
  logLevel: LogLevel;

  constructor(logLevel?: LogLevel) {
    if (logLevel) {
      this.logLevel = logLevel;
    } else {
      this.logLevel = LogLevel.Error;
    }
  }


  logDebug(message: any) {
    if (this.logLevel === LogLevel.Debug) {
      console.log(Logger.freezeMessage(message));
    }
  }

  logInfo(message: any) {
    if (this.logLevel === LogLevel.Debug || this.logLevel === LogLevel.Info) {
      console.log(Logger.freezeMessage(message));
    }
  }

  logError(err: Error) {
    console.error(Logger.freezeMessage(err.message));
  }

  private static freezeMessage(message: any):string {
    return JSON.parse(JSON.stringify(message));
  }
}

export default new Logger();