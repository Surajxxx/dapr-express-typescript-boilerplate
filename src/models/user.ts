import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interface/model/user';

export type IUserModel = {} & IUser & Document

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// schema middleware for password hash
userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

// adding method for comparing password
userSchema.methods.comparePassword = async function (pass: string) {
  return bcrypt.compare(pass, this.password);
};

const User = model<IUserModel>('User', userSchema);

export default User;
