import * as mongoose from 'mongoose';
import * as isEmail from 'validator/lib/isEmail';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';

const SECRETMESSAGE = 'Sport-Member';

export let memberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  type: {
    type: String,
    default: 'user',
    enum: ['admin', 'user']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: v => isEmail(v),
      message: '{VALUE} is not a valid email'
    }
  },
  photo: {
    type: String
  }
}).pre('save', function(next) {
  const member = this;
  if (!member.isModified('password')) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(member.password, salt, null, (e, hash) => {
      member.password = hash;
      next();
    });
  });
});
