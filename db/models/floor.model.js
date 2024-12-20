import { model, Schema } from 'mongoose';
import { roomStatus } from '../../src/utils/constant/enums.js';

const floorSchema = new Schema({
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
    apartments: [{
        type: Schema.Types.ObjectId,
        ref: 'Apartment'
    }],
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    totalApartments: {
        type: Number,
        default: 0,
        min: 0
    },
    totalRooms: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: Object.values(roomStatus),
        default: roomStatus.EMPTY
    }
}, { timestamps: true });

// Virtual for populating rooms
floorSchema.virtual('roomDetails', {
    ref: 'Room',
    localField: 'rooms',
    foreignField: '_id',
});


export const Floor = model('Floor', floorSchema);
