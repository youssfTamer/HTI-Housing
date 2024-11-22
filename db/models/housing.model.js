import { Schema, model } from 'mongoose';
import { gender } from '../../src/utils/constant/enums.js';

const housingSchema = new Schema({
  buildingName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  numberOfBuildings: {
    type: Number,
    required: true,
    min: 1
  },
  genderType: {
    type: String,
    required: true,
    enum: Object.values(gender),
  },
  entertainmentServices: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    description: String,
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


export const Housing = model('Housing', housingSchema);


