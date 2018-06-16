import * as mongoose from 'mongoose';

export let TransportTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
