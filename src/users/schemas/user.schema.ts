import { Schema, model, Document, HookNextFunction } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { genSalt, hash, compare } from 'bcrypt';

import * as bcrypt from 'bcrypt';
import * as validator from 'validator';

export const UserSchema = new Schema({
  firstname:  {
    type: String,
    required: [true, 'cant be blank'], match: [/^[a-zA-Z]+$/, 'is invalid'],
  },
  lastname:  {
    type: String,
    required: [true, 'cant be blank'], match: [/^[a-zA-Z]+$/, 'is invalid'],
  },
  birthdate: Date,
  email: {
    type: String,
    lowercase: true,
    validate: validator.isEmail,
    maxlength: 255,
    minlength: 6,
    required: [true, 'cant be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'cant be blank'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: [true, 'PASSWORD_IS_BLANK'],
  },
  address: {
    number: String,
    street: String,
    city: String,
    region: String,
    contry: String,
  },
  phones: [String],
  roles: {
    type: [String],
    default: ['user'],
  },
}, {
  versionKey: false,
  timestamps: true,
});

UserSchema.pre('save', async function(next: HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    // tslint:disable-next-line:no-string-literal
    const hashed = await bcrypt.hash(this['password'], 10);
    // tslint:disable-next-line:no-string-literal
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
