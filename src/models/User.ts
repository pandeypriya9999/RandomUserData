import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  age: number;
  gender: string;
  country: string;
}

const userSchema = new Schema<IUser>({
  name: {
    title: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  email: { type: String, required: true },
  age: { type: Number, required: false },
  gender: { type: String, required: true },
  country: { type: String, required: true, default: 'Unknown' },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
