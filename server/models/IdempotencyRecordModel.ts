import type { Model } from 'mongoose';
import { Schema, model } from 'mongoose';
import type IdempotencyRecord from '@/types/idempotencyRecord';

const idempotencyRecordSchema = new Schema<IdempotencyRecord>({
  key: { type: String, required: true, unique: true },
  response: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }, // sets a 1h TTL index
});

const IdempotencyRecordModel: Model<IdempotencyRecord> =
  model<IdempotencyRecord>('IdempotencyRecord', idempotencyRecordSchema);

export default IdempotencyRecordModel;
