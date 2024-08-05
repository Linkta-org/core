import type { ZodError } from 'zod';
import type { ClientSession } from 'mongoose';

// Formats Zod error messages into a single string.
export const formatZodErrorMessages = (error: ZodError): string => {
  return error.errors.map((e) => e.message).join('; ');
};

// Aborts the transaction and ends the session.
export const rollbackTransaction = async (session: ClientSession) => {
  await session.abortTransaction();
  await session.endSession();
};
