/**
 * The Error object to be used in the error handling middleware.
 */
export interface MiddlewareError extends Error {
  log: string;
  status: number;
  message: {
    err: string;
  };
}
