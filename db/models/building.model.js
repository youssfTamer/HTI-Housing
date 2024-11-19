import { model, Schema } from 'mongoose';
import { amenities, gender, roomType } from '../../src/utils/constant/enums.js';

const buildingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
    },
    floors: {
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
        required: true,
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
    genderRestriction: {
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
    maintenanceContact: {
        name: String,
        phone: String,
    }
}, { timestamps: true })

//model
export const Building = model('Building', buildingSchema)
  