export type MiddlewareError = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};
