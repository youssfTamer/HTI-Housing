import { model, Schema } from 'mongoose';
import { amenities, gender, roomType } from '../../src/utils/constant/enums.js';

const buildingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
            type: String,
            required: true,
            trim: true
    },
    floors:[{
        type: Schema.Types.ObjectId,
        ref: 'Floor',
        required: false
    }],
    NOfloors: {
        type: Number,
        required: true,
        min: 1
    },
    totalRooms: {
        type: Number,
        required: true,
        min: 1
    },
    totalApartment: {
        type: Number,
        required: false,
        min: 1
    },
    roomType: {
        type: String,
        enum: Object.values(roomType),
        required: true
    },
    amenities: [{
        type: String,
        enum: Object.values(amenities),
    }],
    genderType: {
        type: String,
        enum: Object.values(gender),
        required: true
    },
    currentOccupancy: {
        type: Number,
        min: 0,
        default: 0
    },
    maxOccupancy: {
        type: Number,
        required: true,
        min: 1
    },
    residentAdvisor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
      createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

// Virtual for populating floors
buildingSchema.virtual('floorDetails', {
    ref: 'Floor',
    localField: 'floors',
    foreignField: '_id',
});

//model
export const Building = model('Building', buildingSchema)
  