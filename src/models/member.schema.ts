import * as mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt-nodejs';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
      validator: v => validateEmail(v),
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
    this.hash(member.password, salt, (error, hash) => {
      member.password = hash;
      next();
    });
  });
});
