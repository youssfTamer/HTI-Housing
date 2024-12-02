import { model, Schema } from 'mongoose';
import { gender, roomStatus, roomType } from '../../src/utils/constant/enums.js';

const apartmentSchema = new Schema({
    apartmentNumber: {
        type: String,
        required: true,
        trim: true
    },
    numberOfRooms: {
        type: Number,
        required: true,
        min: 1
    },
    floorNumber: {
        type: Number,
        required: true,
        min: 0
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    services: [{
        type: String,
        trim: true
    }],
    roomType:{
        type:String,
        enum:Object.values(roomType),
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: Object.values(roomStatus),
        default: roomStatus.EMPTY
    }
}, { timestamps: true });

export const Apartment = model('Apartment', apartmentSchema);
