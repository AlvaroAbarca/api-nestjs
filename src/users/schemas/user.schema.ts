import { Schema, model, Document } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { genSalt, hash, compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  birthdate: Date,
  email: {
    type: String,
    required: [true, 'cant be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'],
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, 'cant be blank'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    number: Number,
    street: String,
    city: String,
    region: String,
    contry: String,
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  deleted: { type: Date, default: Date.now },
  phones: [String],
  permissions:{
    user: Boolean,
    admin: Boolean,
    super: Boolean,
  },
});

UserSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async (password: string): Promise<boolean> => {
    return await bcrypt.compare(password, this.password);
};

/*
UserSchema.methods.encrypPassword = async (
  password: string,
): Promise<string> => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

UserSchema.methods.validatePassword = async (
  password: string,
): Promise<boolean> => {
  return await compare(password, this.password);
};

UserSchema.pre('save', function(next) {

    const user = this;

    // Make sure not to rehash the password if it is already hashed
    if (!user.isModified('password')) { return next(); }

    // Generate a salt and use it to hash the user's password
    genSalt(10, (err, salt) => {

        if (err) { return next(err); }

        hash(user.password, salt, (err, hashh) => {

            if (err) { return next(err); }
            user.password = hashh;
            next();

        });

    });

});

UserSchema.methods.checkPassword = function(attempt, callback){

    const user = this;

    compare(attempt, user.password, (err, isMatch) => {
        if(err) { return callback(err); }
        callback(null, isMatch);
    });

};
*/

export default UserSchema;
