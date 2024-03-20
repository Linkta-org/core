export interface MiddlewareError {
  log: string;
  status: number;
  message: {
    err: string;
  };
}
