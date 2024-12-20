import { model, Schema } from 'mongoose';
import { roomStatus, roomType } from '../../src/utils/constant/enums.js';

const roomSchema = new Schema({
    roomNumber: {
        type: String,
        required: true,
        trim: true
    },
    apartment: {
        type: Schema.Types.ObjectId,
        ref: 'Apartment',
    },
    floor: {
        type: Schema.Types.ObjectId,
        ref: 'Floor',
        required: true,
        min: 0
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: false //todo
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
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status: {
        type: String,
        enum: Object.values(roomStatus),
        default: roomStatus.EMPTY
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

export const Room = model('Room', roomSchema);
