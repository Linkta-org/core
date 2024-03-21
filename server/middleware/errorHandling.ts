import type { MiddlewareError } from "../types/middleware";
import { Request, Response } from "express";

/**
 * Create an error object to be used in the error handling middleware.
 *
 * @param method The method where the error occurred
 * @param controller The controller where the error occurred
 * @param message The error message
 * @param error The error object
 * @param status The status code to return
 *
 * @return the error object
 */
export function createError(
  method: string,
  controller: string,
  message: string,
  error: unknown,
  status: number = 500
): MiddlewareError {
  let errorString = "An unknown error occurred";
  switch (typeof error) {
    case "string":
      errorString = error;
      break;
    case "object":
      errorString = JSON.stringify(error);
      break;
    default:
      console.error("Error type not handled in createError.");
      console.error("Error type:", typeof error);
  }

  return {
    log: `Error in ${method} in ${controller}: ${message}`,
    status: status,
    message: {
      err: `Error occured in ${controller}.${method}: ${errorString}`,
    },
  };
}

export function globalErrorHandler(
  err: Error,
  _: Request,
  res: Response
): Response {
  const defaultError: MiddlewareError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };

  const errObj = Object.assign(defaultError, err);
  console.error(errObj.log);

  return res.status(errObj.status).json(errObj.message);
}
