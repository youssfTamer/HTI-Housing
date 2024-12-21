import { model, Schema } from 'mongoose';
import { paymentStatus } from '../../src/utils/constant/enums.js';

const paymentSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    receiptImage: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    status: {
        type: String,
        enum: Object.values(paymentStatus),
        default: paymentStatus.PENDING
    },
    adminComment: {
        type: String
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: {
        type: Date
    }
}, { timestamps: true });

export const Payment = model('Payment', paymentSchema);
