import { isNonEmptyString, isString, isUnsignedInteger } from 'jet-validators';

import { transformIsDate } from '@src/common/utils/validators';

import { Entity } from './common/types';

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/types';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  }
}, {
  timestamps: true
});

// Encrypt password using bcrypt
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     next();
//   }
  
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// Compare password method
UserSchema.methods.comparePassword = async function(userPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);