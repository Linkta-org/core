class CustomError extends Error {
  status: number;
  message: string;
  log: string;

  constructor(message: string, status: number, log?: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.log = log || 'Unknown CustomError Occurred';
  }
}

class ValidationError extends CustomError {
  constructor(
    message: string = 'Invalid input provided. Please ensure your request meets the required format and constraints.',
  ) {
    super(message, 400, 'ValidationError occurred');
  }
}

class UnauthorizedError extends CustomError {
  constructor(
    message: string = 'You need to log in to access this resource. Please ensure you are logged in and try again.',
  ) {
    super(message, 401, 'UnauthorizedError occurred');
  }
}

// Not currently in use
class ForbiddenError extends CustomError {
  constructor(
    message: string = "You don't have permission to perform this action.",
  ) {
    super(message, 403, 'ForbiddenError occurred');
  }
}

class NotFoundError extends CustomError {
  constructor(
    message: string = 'The requested resource could not be found. It may have been deleted or the ID might be incorrect.',
  ) {
    super(message, 404, 'NotFoundError occurred');
  }
}

class LinktaFlowNotFoundError extends CustomError {
  constructor(
    message: string = 'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.',
  ) {
    super(message, 404, 'LinktaFlowNotFoundError occurred');
  }
}

// Not currently in use; for bug handling
class PayloadTooLargeError extends CustomError {
  constructor(
    message: string = 'The bug report payload is too large. Please reduce the size of your report or remove the screenshot.',
  ) {
    super(message, 413, 'PayloadTooLargeError occurred');
  }
}

class TooManyRequestsError extends CustomError {
  constructor(
    message: string = 'You have made too many requests in a short period. Please wait a while before trying again.',
  ) {
    super(message, 429, 'TooManyRequestsError occurred');
  }
}

class InternalServerError extends CustomError {
  constructor(
    message: string = 'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
  ) {
    super(message, 500, 'InternalServerError occurred');
  }
}

class InternalServerErrorGenAI extends CustomError {
  constructor(message: string = 'Error generating response from AI.') {
    super(message, 500, 'InternalServerErrorGenAI occurred');
  }
}

// Not currently in use
class ServiceUnavailableError extends CustomError {
  constructor(
    message: string = 'The service is temporarily unavailable. Please try again later.',
  ) {
    super(message, 503, 'ServiceUnavailableError occurred');
  }
}

export {
  CustomError,
  NotFoundError,
  LinktaFlowNotFoundError,
  PayloadTooLargeError,
  UnauthorizedError,
  ForbiddenError,
  TooManyRequestsError,
  InternalServerError,
  InternalServerErrorGenAI,
  ValidationError,
  ServiceUnavailableError,
};
