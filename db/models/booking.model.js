import { model, Schema } from 'mongoose';
import { bookingStatus } from '../../src/utils/constant/enums.js';

const bookingSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: Object.values(bookingStatus),
        default: bookingStatus.PENDING
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const Booking = model('Booking', bookingSchema); 