import type { Document } from 'mongoose';

interface IdempotencyRecord extends Document {
  key: string;
  response: unknown;
  createdAt: Date;
}

export default IdempotencyRecord;
