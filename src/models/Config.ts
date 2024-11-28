import mongoose, { Schema, Document } from 'mongoose';

export interface IConfig extends Document {
  requestPerBatch: number;
  requestsPerSecond: number;
  batchSleep: number;
  apiEndpoint: string;
  apiParams: object;
}

const ConfigSchema: Schema = new Schema({
  requestPerBatch: { type: Number, default: 300 },
  requestsPerSecond: { type: Number, default3: 5 },
  batchSleep: { type: Number, default: 30 },
  apiEndpoint: { type: String, default: 'https://randomuser.me/api/' },
  apiParams: { type: Object, default: { results: 1000 } },
});

export default mongoose.model<IConfig>('Config', ConfigSchema);