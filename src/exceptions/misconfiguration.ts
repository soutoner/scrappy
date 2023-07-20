export class MisconfigurationException extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'MisconfigurationException';
  }
}
