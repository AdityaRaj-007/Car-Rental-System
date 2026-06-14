export class GlobalError extends Error {
  public statusCode;
  public message;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
